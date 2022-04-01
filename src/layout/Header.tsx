import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useThemeContext } from "utils/context";

import reactLogo from "./assets/logo.svg";

export interface Props {
  title: string;
  menus?: Array<any>;
  menu: any;
}

const Header: React.FC<Props> = ({ title, menus = [], menu }: Props) => {
  const [breadCrumbList, setBreadCrumbList] = useState<Array<any>>();
  const { store: themeStore } = useThemeContext();

  useEffect(() => {
    const menuList = [...menus];
    const breadReducer = menuList
      .reverse()
      .reduce((previous, current) => {
        const foundItem = previous.find(
          (item: any) => item.parentMenu === current.menuCode
        );

        if (
          current.menuCode === (menu?.moveItem?.menuCode || menu.menuCode) ||
          foundItem
        ) {
          return [
            ...previous,
            {
              menuCode: current.menuCode,
              menuName: current.menuName,
              parentMenu: current.parentMenu,
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
          <h2 className={`${themeStore?.darkMode ? "darkMode" : ""}`}>
            <img width={80} src={reactLogo} alt="react logo" /> {title}
          </h2>
          <Breadcrumb>
            {breadCrumbList?.map((item) => (
              <Breadcrumb.Item
                className={classNames("breadcrumb", {
                  darkMode: themeStore?.darkMode,
                })}
                key={item.menuName}
                active
              >
                {item.menuName}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      )}
    </>
  );
};

export default React.memo(Header);
