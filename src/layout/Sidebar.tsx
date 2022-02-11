import { useCallback, useEffect, useState } from 'react';
import {
  FaBars,
  FaFolder,
  FaFolderOpen,
  FaGithub,
  FaPager,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
  list: Array<any>;
  onToggle: (checked: boolean) => void;
  onCollapseChange: (checked: boolean) => void;
  onMenuOpen: (
    menuList: Array<any>,
    menuItem: any,
    menuOpened: boolean
  ) => void;
};

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

  const handleMenuOnClick = useCallback(
    (menuItem) => {
      onMenuOpen(
        menuList.map((item) => {
          return item.menu_cd === menuItem.menu_cd && !item.open
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

  const recursiveChildMenu = useCallback(
    (item: any): any => {
      const filteredList = menuList.filter(
        (menuItem) => menuItem.upper_menu_cd == item.menu_cd
      );

      return (
        filteredList.length > 0 &&
        filteredList.map((menuItem) => {
          return menuItem?.url != undefined ? (
            <MenuItem
              key={menuItem.menu_cd}
              icon={<FaPager />}
              onClick={() => handleMenuOnClick(menuItem)}
            >
              {menuItem.menu_nm}
            </MenuItem>
          ) : (
            <SubMenu
              key={menuItem.menu_cd}
              title={menuItem.menu_nm}
              icon={true}
              openedIcon={<FaFolderOpen />}
              closedIcon={<FaFolder />}
            >
              {recursiveChildMenu(menuItem)}
            </SubMenu>
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
          <Link to="/" style={{ cursor: 'pointer' }}>
            TEST
          </Link>
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
                icon={true}
                openedIcon={<FaFolderOpen />}
                closedIcon={<FaFolder />}
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
