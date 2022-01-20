import React from 'react';
import { FaBars, FaHeart } from 'react-icons/fa';
import Switch from 'react-switch';

import reactLogo from './assets/logo.svg';

export type Props = {
  collapsed: boolean;
  rtl: boolean;
  image: boolean;
  handleToggleSidebar: (checked: boolean) => void;
  handleCollapsedChange: (checked: boolean) => void;
  handleRtlChange: (checked: boolean) => void;
  handleImageChange: (checked: boolean) => void;
};

const Content: React.FC<Props> = ({
  collapsed = false,
  rtl = false,
  image = false,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}: Props) => {
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
      <div className="block ">
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleCollapsedChange}
          checked={collapsed}
          onColor="#219de9"
          offColor="#bbbbbb"
        />
        <span>Collapse</span>
      </div>
      <div className="block">
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleRtlChange}
          checked={rtl}
          onColor="#219de9"
          offColor="#bbbbbb"
        />
        <span>rtl</span>
      </div>
      <div className="block">
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleImageChange}
          checked={image}
          onColor="#219de9"
          offColor="#bbbbbb"
        />
        <span>image</span>
      </div>

      <footer>
        <small>
          © {new Date().getFullYear()} made with by -{' '}
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
