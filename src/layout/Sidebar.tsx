import "./styles.scss";

import React, { forwardRef, useCallback } from "react";
import { Dropdown as BootStrapDropdown, OverlayTrigger } from "react-bootstrap";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaFolder,
  FaFolderOpen,
  FaPager,
  FaUserAlt,
} from "react-icons/fa";

import sidebarBg from "./assets/bg2.jpg";
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
  list,
  onToggle,
  onCollapseChange,
  onMenuOpen,
}: Props) => {
  const menuList = list;

  // NOTE: 커스텀 Overlay Dropdown
  const CustomOverlayDropdown = ({ ...props }: any) => {
    return (
      <div
        style={{
          ...props.style,
          position: "absolute",
          zIndex: 9999,
        }}
      >
        <Dropdown />
      </div>
    );
  };

  // NOTE: 커스텀 Dropdown 토글
  // eslint-disable-next-line react/display-name
  const CustomDropdownToggle = forwardRef(({ ...props }: any, ref: any) => (
    <div
      ref={ref}
      style={{ ...props.style, cursor: "pointer" }}
      onClick={(event) => {
        props.onClick(event);
      }}
    >
      {/* <span className="pro-icon-wrapper"> */}
      <span className="pro-icon">
        <FaUserAlt />
      </span>
      {/* </span> */}

      {!collapsed && (
        <span
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            marginLeft: "10px",
          }}
        >
          한원석
        </span>
      )}
    </div>
  ));

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
          <MenuItem
            key={menuItem.menuCode}
            icon={<FaPager />}
            onClick={() => handleMenuOnClick(menuItem)}
          >
            {menuItem.menuName}
          </MenuItem>
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
      image={image ? sidebarBg : ""}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={onToggle}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
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
            {!collapsed && <h2>테스트 시스템</h2>}
          </span>
        </div>
      </SidebarHeader>
      <SidebarHeader>
        <BootStrapDropdown align={"start"} autoClose={"outside"}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "8px 35px 8px 30px",
              justifyContent: "left",
            }}
          >
            <OverlayTrigger
              placement={"right-end"}
              overlay={(props) => CustomOverlayDropdown(props)}
              show
            >
              <BootStrapDropdown.Toggle as={CustomDropdownToggle} />
            </OverlayTrigger>
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
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              width: "35px",
              height: "35px",
              background: "#353535",
              color: "#fff",
              textAlign: "center",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
            }}
            onClick={() => onCollapseChange(!collapsed)}
          >
            {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </div>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default React.memo(Sidebar);
