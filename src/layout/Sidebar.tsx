import { useCallback, useState } from 'react';
import {
  FaBars,
  FaGem,
  FaGithub,
  FaHeart,
  FaList,
  FaRegLaughWink,
  FaTachometerAlt,
} from 'react-icons/fa';

import sidebarBg from './assets/bg2.jpg';
import { ProSidebar } from './ProSidebar';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from './ProSidebar/Layout';
import { Menu, MenuItem, SubMenu } from './ProSidebar/Menu';

export type Props = {
  image?: boolean;
  collapsed: boolean;
  rtl: boolean;
  toggled: boolean;
  onToggle: (checked: boolean) => void;
  onCollapseChange: (checked: boolean) => void;
};

const MENU = [
  {
    menu_cd: '0000',
    menu_nm: '시스템',
    upper_menu_cd: undefined,
    open: true,
  },
  { menu_cd: '0001', menu_nm: '공통', upper_menu_cd: '0000', open: true },
  {
    menu_cd: '0004',
    menu_nm: '공통코드관리',
    upper_menu_cd: '0001',
    url: 'pages/CmnMng',
    open: false,
  },
  { menu_cd: '0002', menu_nm: '권한', upper_menu_cd: '0000', open: false },
  {
    menu_cd: '0005',
    menu_nm: '권한관리',
    upper_menu_cd: '0002',
    url: 'pages/CmnMng',
  },
  { menu_cd: '1000', menu_nm: '테스트', upper_menu_cd: undefined, open: true },
  { menu_cd: '1001', menu_nm: '권한관리11', upper_menu_cd: '1000' },
];

const Sidebar: React.FC<Props> = ({
  image = false,
  collapsed,
  rtl,
  toggled,
  onToggle,
  onCollapseChange,
}: Props) => {
  const [menuList, setMenuList] = useState(MENU);

  const handleListItemClick = (item: any) => {
    const menu = JSON.parse(JSON.stringify(menuList));

    menu
      .filter(({ menu_cd }: any) => menu_cd === item.menu_cd)
      .forEach((menu: any) => (menu.open = !menu.open));

    setMenuList(menu);
  };

  const recursiveChildMenu = useCallback(
    (item: any): any => {
      const filteredList = menuList.filter(
        (menuItem) => menuItem.upper_menu_cd == item.menu_cd
      );

      return (
        filteredList.length > 0 &&
        filteredList.map((menuItem) => {
          return (
            <>
              {menuItem?.url != undefined ? (
                <MenuItem icon={<FaRegLaughWink />}>
                  {menuItem.menu_nm}
                </MenuItem>
              ) : (
                <SubMenu title={menuItem.menu_nm} icon={<FaRegLaughWink />}>
                  {recursiveChildMenu(menuItem)}
                </SubMenu>
              )}
            </>
          );
        })
      );
    },
    [menuList]
  );

  return (
    <ProSidebar
      image={image ? sidebarBg : ''}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={onToggle}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          TEST
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          {menuList
            .filter((menuItem) => !menuItem.upper_menu_cd)
            .map((item) => (
              <SubMenu
                key={item.menu_cd}
                title={item.menu_nm}
                icon={<FaHeart />}
              >
                {recursiveChildMenu(item)}
              </SubMenu>
            ))}
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/wonseok-han/doul-front"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              한원석
            </span>
          </a>
        </div>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <div
            style={{
              cursor: 'pointer',
              width: '35px',
              height: '35px',
              background: '#353535',
              color: '#fff',
              textAlign: 'center',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
            }}
            onClick={() => onCollapseChange(!collapsed)}
          >
            <FaBars />
          </div>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
