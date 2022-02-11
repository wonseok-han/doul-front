import TabPageContainer from 'components/TabPageContainer';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import DynamicLoader from 'utils/dynamicLoader/DynamicLoader';

import reactLogo from './assets/logo.svg';

export type Props = {
  mode: string;
  menu?: any;
  handleToggleSidebar: (checked: boolean) => void;
  handleMenuClosed?: (item: any, openedList: Array<any>) => void;
  handleActivateTab?: (item: any) => void;
};

const Content: React.FC<Props> = ({
  mode = 'SDI',
  menu,
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
    <main style={{ height: 'auto', minHeight: '100%' }}>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <header>
        <h1>
          <img width={80} src={reactLogo} alt="react logo" /> Title
        </h1>
        <p>Description</p>
        <div className="social-bagdes">
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="GitHub stars"
              src="https://img.shields.io/github/stars/azouaoui-med/react-pro-sidebar?style=social"
            />
          </a>
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="GitHub forks"
              src="https://img.shields.io/github/forks/azouaoui-med/react-pro-sidebar?style=social"
            />
          </a>
        </div>
      </header>

      {mode === 'SDI'
        ? openedMenuList.length > 0 && (
            <div style={{ overflow: 'scroll' }}>
              <DynamicLoader key={`Menu${menu.menu_cd}`} path={menu.url} />
            </div>
          )
        : openedMenuList.length > 0 && (
            <TabPageContainer
              openedList={openedMenuList}
              activeKey={menu.moveItem?.menu_cd || menu.menu_cd}
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
    </main>
  );
};

export default React.memo(Content);
