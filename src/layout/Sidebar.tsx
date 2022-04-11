import "./styles.scss";

import classNames from "classnames";
import OverlayTrigger from "components/OverlayTrigger";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import {
  Dropdown as BootStrapDropdown,
  OverlayTrigger as BootstrapOverlayTrigger,
} from "react-bootstrap";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaFolder,
  FaFolderOpen,
  FaPager,
  FaUserAlt,
} from "react-icons/fa";
import { useAppContext } from "utils/context";
import { renderTooltip } from "utils/tooltip/Tooltip";

import Dropdown from "./Dropdown";
import { ProSidebar } from "./ProSidebar";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ProSidebar/Layout";
import { Menu, MenuItem, SubMenu } from "./ProSidebar/Menu";

export interface Props {
  image?: boolean;
  collapsed: boolean;
  rtl: boolean;
  toggled: boolean;
  darkMode?: boolean;
  list: Array<any>;
  onToggle: (checked: boolean) => void;
  onCollapseChange: (checked: boolean) => void;
  onMenuOpen: (
    menuList: Array<any>,
    menuItem: any,
    menuOpened: boolean
  ) => void;
}

const Sidebar: React.FC<Props> = ({
  image = false,
  collapsed,
  rtl,
  toggled,
  darkMode = false,
  list,
  onToggle,
  onCollapseChange,
  onMenuOpen,
}: Props) => {
  const menuList = list;
  const [darkModeCount, setDarkModeCount] = useState(0);
  const { store } = useAppContext();
  const hasUserInfo = store?.userInfo ? true : false;

  // FIXME: DarkMode 상태가 변경됬을 때 강제 렌더링을 위한 hook
  useEffect(() => {
    onCollapseChange(!collapsed);
    setDarkModeCount((previous) => previous + 1);
  }, [darkMode]);
  useEffect(() => {
    onCollapseChange(!collapsed);
  }, [darkModeCount]);

  // NOTE: 커스텀 Overlay Dropdown
  const CustomOverlayDropdown = ({ ...props }: any) => {
    return (
      <div
        style={{
          ...props.style,
          position: "absolute",
          zIndex: 9998,
        }}
      >
        <Dropdown />
      </div>
    );
  };

  // NOTE: 커스텀 Dropdown 토글
  // eslint-disable-next-line react/display-name
  const CustomDropdownToggle = forwardRef(({ ...props }: any, ref: any) => {
    return (
      <div
        ref={ref}
        className={classNames("sidebar-icon-wrapper", { darkMode })}
        style={{ ...props.style, cursor: "pointer" }}
        onClick={(event) => {
          props.onClick(event);
        }}
      >
        <FaUserAlt className="sidebar-user-icon" />

        {!collapsed && (
          <span
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              marginLeft: "10px",
            }}
          >
            {hasUserInfo ? store?.userInfo?.name : "Sign In"}
          </span>
        )}
      </div>
    );
  });

  // NOTE: 메뉴 클릭시 메뉴를 Open하는 이벤트
  const handleMenuOnClick = useCallback(
    (menuItem) => {
      onMenuOpen(
        menuList.map((item) => {
          return item.menuCode === menuItem.menuCode && !item.open
            ? {
                ...item,
                open: !item.open,
              }
            : item;
        }),
        { ...menuItem, open: true },
        menuItem.open
      );
    },
    [menuList]
  );

  // NOTE: Sidebar 메뉴를 구성하는 재귀함수
  const recursiveChildMenu = useCallback(
    (item: any): any => {
      const filteredList = menuList.filter(
        (menuItem) => menuItem.parentMenu == item.menuCode
      );

      return filteredList.map((menuItem) => {
        return menuItem?.url != undefined ? (
          <OverlayTrigger
            key={menuItem.menuCode}
            render={renderTooltip}
            renderChildren={menuItem.menuName}
            style={{
              zIndex: "1051",
            }}
          >
            <MenuItem
              icon={<FaPager />}
              onClick={() => handleMenuOnClick(menuItem)}
            >
              {menuItem.menuName}
            </MenuItem>
          </OverlayTrigger>
        ) : (
          <SubMenu
            key={menuItem.menuCode}
            title={menuItem.menuName}
            icon={true}
            openedIcon={<FaFolderOpen />}
            closedIcon={<FaFolder />}
          >
            {recursiveChildMenu(menuItem)}
          </SubMenu>
        );
      });
    },
    [menuList]
  );

  return (
    <ProSidebar
      image={image ? "" : ""}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={onToggle}
      darkMode={darkMode}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              onMenuOpen(
                menuList.map((item) => ({
                  ...item,
                  open: false,
                })),
                undefined,
                false
              );
            }}
          >
            {!collapsed && <h2>react-front</h2>}
          </span>
        </div>
      </SidebarHeader>
      <SidebarHeader>
        <BootStrapDropdown align={"start"} drop={"end"}>
          <div
            className={classNames("sidebar-btn-wrapper", {
              darkMode,
            })}
            style={{
              padding: "8px 35px 8px 30px",
              justifyContent: "left",
            }}
          >
            <BootstrapOverlayTrigger
              placement={"right-end"}
              overlay={(props) => CustomOverlayDropdown(props)}
              show
            >
              <BootStrapDropdown.Toggle as={CustomDropdownToggle} />
            </BootstrapOverlayTrigger>
          </div>
        </BootStrapDropdown>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          {menuList
            .filter((menuItem) => !menuItem.parentMenu)
            .map((item) => (
              <SubMenu
                key={item.menuCode}
                title={item.menuName}
                icon={true}
                openedIcon={<FaFolderOpen />}
                closedIcon={<FaFolder />}
              >
                {recursiveChildMenu(item)}
              </SubMenu>
            ))}
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className={classNames("sidebar-btn-wrapper", {
            darkMode,
          })}
          style={{
            padding: "20px 24px",
          }}
        >
          <div
            className={classNames("sidebar-btn-icon", {
              darkMode,
            })}
            onClick={() => onCollapseChange(!collapsed)}
          >
            {collapsed ? (
              <FaAngleDoubleRight className="sidebar-collapse-icon" />
            ) : (
              <FaAngleDoubleLeft className="sidebar-collapse-icon" />
            )}
          </div>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default React.memo(Sidebar);
