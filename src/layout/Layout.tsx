import React, { useCallback, useState } from 'react';

import Content from './Content';
import Sidebar from './Sidebar';

const MENU = [
  {
    menu_cd: '0000',
    menu_nm: '시스템',
    upper_menu_cd: undefined,
    open: false,
  },
  { menu_cd: '0001', menu_nm: '공통', upper_menu_cd: '0000', open: false },
  {
    menu_cd: '0004',
    menu_nm: '공통코드관리',
    upper_menu_cd: '0001',
    url: 'common/CmnCdMng',
    open: false,
  },
  { menu_cd: '0002', menu_nm: '권한', upper_menu_cd: '0000', open: false },
  {
    menu_cd: '0005',
    menu_nm: '권한관리',
    upper_menu_cd: '0002',
    url: 'common/Second',
  },
  { menu_cd: '1000', menu_nm: '테스트', upper_menu_cd: undefined, open: false },
  { menu_cd: '1001', menu_nm: '권한관리11', upper_menu_cd: '1000' },
];

const Layout: React.FC = () => {
  const rtl = false;
  const image = false;
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [mode, setMode] = useState('MDI');
  const [menus, setMenus] = useState(MENU);
  const [menu, setMenu] = useState();

  const handleCollapsedChange = useCallback((checked: boolean) => {
    setCollapsed(checked);
  }, []);

  const handleToggleSidebar = useCallback((checked: boolean) => {
    setToggled(checked);
  }, []);

  const handleModeChange = useCallback((selectedMode: string) => {
    setMode(selectedMode);
  }, []);

  const handleMenuOpened = useCallback(
    (menuList: Array<any>, menuItem: any, menuOpened: boolean) => {
      setMenu((previous: any) => ({ ...previous, ...menuItem }));
      !menuOpened && setMenus(menuList);
    },
    []
  );

  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <Sidebar
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        list={menus}
        onToggle={handleToggleSidebar}
        onCollapseChange={handleCollapsedChange}
        onMenuOpen={handleMenuOpened}
      />
      <Content
        handleToggleSidebar={handleToggleSidebar}
        mode={mode}
        menu={menu}
      ></Content>
    </div>
  );
};

export default Layout;
