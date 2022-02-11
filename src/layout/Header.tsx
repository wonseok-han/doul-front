import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';

import reactLogo from './assets/logo.svg';

export type Props = {
  title: string;
  menus?: Array<any>;
  menu: any;
};

const Header: React.FC<Props> = ({ title, menus = [], menu }: Props) => {
  const [breadCrumbList, setBreadCrumbList] = useState<Array<any>>();

  useEffect(() => {
    const menuList = [...menus];
    const breadReducer = menuList
      .reverse()
      .reduce((previous, current) => {
        const foundItem = previous.find(
          (item: any) => item.upper_menu_cd === current.menu_cd
        );

        if (current.menu_cd === menu.menu_cd || foundItem) {
          return [
            ...previous,
            {
              menu_cd: current.menu_cd,
              menu_nm: current.menu_nm,
              upper_menu_cd: current.upper_menu_cd,
            },
          ];
        } else {
          return [...previous];
        }
      }, [])
      .reverse();
    setBreadCrumbList(() => [...breadReducer]);
  }, [menus, menu]);

  return (
    <>
      {title && (
        <div>
          <h2>
            <img width={80} src={reactLogo} alt="react logo" /> {title}
          </h2>
          <Breadcrumb>
            {breadCrumbList?.map((item) => (
              <Breadcrumb.Item key={item.menu_nm} style={{ cursor: 'default' }}>
                {item.menu_nm}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      )}
    </>
  );
};

export default React.memo(Header);
