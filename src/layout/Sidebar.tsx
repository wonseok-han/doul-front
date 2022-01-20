import { useState } from 'react';
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

const Sidebar: React.FC<Props> = ({
  image = false,
  collapsed,
  rtl,
  toggled,
  onToggle,
  onCollapseChange,
}: Props) => {
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
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">aa</span>}
          >
            bb
          </MenuItem>
          <MenuItem icon={<FaGem />}> cc</MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title={'dd'}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>{'ee'} 1</MenuItem>
            <MenuItem>{'ff'} 2</MenuItem>
            <MenuItem>{'gg'} 3</MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title={'hh'}
            icon={<FaHeart />}
          >
            <MenuItem>{'ii'} 1</MenuItem>
            <MenuItem>{'jj'} 2</MenuItem>
            <MenuItem>{'kk'} 3</MenuItem>
          </SubMenu>
          <SubMenu title={'ll'} icon={<FaList />}>
            <MenuItem>{'mm'} 1 </MenuItem>
            <MenuItem>{'nn'} 2 </MenuItem>
            <SubMenu title={'oo'}>
              <MenuItem>{'pp'} 3.1 </MenuItem>
              <MenuItem>{'qq'} 3.2 </MenuItem>
              <SubMenu title={'rr'}>
                <MenuItem>{'ss'} 3.3.1 </MenuItem>
                <MenuItem>{'tt'} 3.3.2 </MenuItem>
                <MenuItem>{'uu'} 3.3.3 </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
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
