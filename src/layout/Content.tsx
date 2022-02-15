import TabPageContainer from 'components/TabPageContainer';
import Header from 'layout/Header';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import DynamicLoader from 'utils/dynamicLoader/DynamicLoader';

export type Props = {
  mode: string;
  menu: any;
  menus?: Array<any>;
  handleToggleSidebar: (checked: boolean) => void;
  handleMenuClosed?: (item: any, openedList: Array<any>) => void;
  handleActivateTab?: (item: any) => void;
};

const Content: React.FC<Props> = ({
  mode = 'SDI',
  menu,
  menus,
  handleToggleSidebar,
  handleMenuClosed,
  handleActivateTab,
}: Props) => {
  const [openedMenuList, setOpenedMenuList] = useState<Array<any>>([]);

  useEffect(() => {
    if (!menu) return;

    const openItem = openedMenuList.find(
      (item) => item.menu_cd === menu.menu_cd
    );
    if (openItem && menu.open) return;

    menu.open
      ? setOpenedMenuList((previous) => {
          return [...previous, menu];
        })
      : setOpenedMenuList((previous) => {
          const filteredPrevList = previous.filter(
            (item) => item.menu_cd != menu.menu_cd
          );

          return filteredPrevList;
        });
  }, [menu]);

  return (
    <main
      style={{
        height: 'auto',
        minHeight: '100%',
      }}
    >
      {openedMenuList.length > 0 ? (
        <>
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>

          <header>
            <Header
              title={menu?.moveItem?.menu_nm || menu.menu_nm}
              menus={menus}
              menu={menu}
            />
          </header>

          {mode === 'SDI' ? (
            <div style={{ overflow: 'scroll' }}>
              <DynamicLoader key={`Menu${menu.menu_cd}`} path={menu.url} />
            </div>
          ) : (
            <TabPageContainer
              openedList={openedMenuList}
              activeKey={menu?.moveItem?.menu_cd || menu.menu_cd}
              handleMenuClosed={handleMenuClosed}
              handleActivateTab={handleActivateTab}
            />
          )}

          <footer>
            <small>
              © {new Date().getFullYear()} made by -{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/wonseok-han/doul-front"
              >
                wonseok-han
              </a>
            </small>
          </footer>
        </>
      ) : (
        <>
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
          <div style={{ overflow: 'scroll' }}>
            <DynamicLoader key={'Home'} path={'Home'} />
          </div>
        </>
      )}
    </main>
  );
};

export default React.memo(Content);
