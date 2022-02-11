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

  // Sidebar 접음/펼침 이벤트
  const handleCollapsedChange = useCallback((checked: boolean) => {
    setCollapsed(checked);
  }, []);

  // Sidebar 접혔을 때 Collapse 버튼 Show/Hide 토클 이벤트
  const handleToggleSidebar = useCallback((checked: boolean) => {
    setToggled(checked);
  }, []);

  // SDI/MDI 모드 전환 이벤트
  const handleModeChange = useCallback((selectedMode: string) => {
    setMode(selectedMode);
  }, []);

  // Sidebar 메뉴 클릭시 메뉴를 Open하는 이벤트
  const handleMenuOpened = useCallback(
    (menuList: Array<any>, menuItem: any, menuOpened: boolean) => {
      setMenu((previous: any) => ({
        ...previous,
        ...menuItem,
        moveItem: undefined,
      }));
      !menuOpened && setMenus(menuList);
    },
    [menu]
  );

  // Open된 탭메뉴 화면의 탭 전환시 발생하는 이벤트
  const handleActivateTab = useCallback(
    (item: any) => {
      setMenu((previous: any) => ({ ...previous, ...item }));
    },
    [menu]
  );

  // Open된 탭메뉴 화면의 Close 이벤트
  const handleMenuClosed = useCallback(
    (closedItem: any, openedList: Array<any>) => {
      setMenus((previous) => {
        return [
          ...previous.map((item) => {
            return item.menu_cd === closedItem.menu_cd && item.open
              ? {
                  ...item,
                  open: !item.open,
                }
              : item;
          }),
        ];
      });

      const foundItem = openedList.filter(
        (item) => item.menu_cd === closedItem.menu_cd
      );
      if (openedList.length >= openedList.length - foundItem.length) {
        const foundIndex = openedList.findIndex(
          (item) => item.menu_cd === closedItem.menu_cd
        );

        let moveItem;
        // 마지막 탭 Close
        if (foundIndex === openedList.length - 1)
          moveItem = foundIndex > -1 && openedList[foundIndex - 1];
        // 첫번째 탭, 중간 탭 Close
        else if (foundIndex === 0)
          moveItem = foundIndex > -1 && openedList[foundIndex + 1];

        setMenu({ ...closedItem, open: false, moveItem: moveItem });
      } else {
        setMenu({ ...closedItem, open: false });
      }
    },
    [menus, menu]
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
        menus={menus}
        handleMenuClosed={handleMenuClosed}
        handleActivateTab={handleActivateTab}
      ></Content>
    </div>
  );
};

export default React.memo(Layout);
