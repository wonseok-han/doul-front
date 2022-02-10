import TabContainer from 'components/TabContainer';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import DynamicLoader from 'utils/dynamicLoader/DynamicLoader';

import reactLogo from './assets/logo.svg';

export type Props = {
  handleToggleSidebar: (checked: boolean) => void;
  menu?: any;
};

const Content: React.FC<Props> = ({ handleToggleSidebar, menu }: Props) => {
  const [openedMenuList, setOpenedMenuList] = useState([]);

  useEffect(() => {
    if (!menu) return;

    const filteredList = openedMenuList.filter(
      (item: any) => item?.menu_cd === menu.menu_cd
    );

    filteredList.length === 0 &&
      setOpenedMenuList((previous) => {
        const prevList = previous;
        prevList.push(filteredList[0]);
        return [...prevList];
      });
  }, [menu]);

  return (
    <main>
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

      <TabContainer />

      {menu?.open && (
        <DynamicLoader key={`menu${menu.menu_cd}`} path={menu.url} />
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

export default Content;
