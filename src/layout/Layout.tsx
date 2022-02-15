import React, { useCallback, useState } from 'react';

import Content from './Content';
import Sidebar from './Sidebar';

const MENU = [
  {
    menuCode: '0000',
    menuName: '시스템',
    parentMenu: undefined,
    open: false,
  },
  { menuCode: '0001', menuName: '공통', parentMenu: '0000', open: false },
  {
    menuCode: '0004',
    menuName: '공통코드관리',
    parentMenu: '0001',
    url: 'common/CmnCdMng',
    open: false,
  },
  { menuCode: '0002', menuName: '권한', parentMenu: '0000', open: false },
  {
    menuCode: '0005',
    menuName: '권한관리',
    parentMenu: '0002',
    url: 'common/Second',
  },
  {
    menuCode: '1000',
    menuName: '테스트',
    parentMenu: undefined,
    open: false,
  },
  { menuCode: '1001', menuName: '권한관리11', parentMenu: '1000' },
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
  handleModeChange && console.log(handleModeChange);

  // Sidebar 메뉴 클릭시 메뉴를 Open하는 이벤트
  const handleMenuOpened = useCallback(
    (menuList: Array<any>, menuItem: any, menuOpened: boolean) => {
      menuItem
        ? setMenu((previous: any) => ({
            ...previous,
            ...menuItem,
            moveItem: undefined,
          }))
        : setMenu(undefined);
      !menuOpened && setMenus([...menuList]);
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
            return item.menuCode === closedItem.menuCode && item.open
              ? {
                  ...item,
                  open: !item.open,
                }
              : item;
          }),
        ];
      });

      const foundItem = openedList.filter(
        (item) => item.menuCode === closedItem.menuCode
      );
      if (openedList.length >= openedList.length - foundItem.length) {
        const foundIndex = openedList.findIndex(
          (item) => item.menuCode === closedItem.menuCode
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
