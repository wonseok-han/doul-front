import classNames from "classnames";
import TabPageContainer from "components/TabPageContainer";
import Header from "layout/Header";
import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import useAppContext, { useThemeContext } from "utils/context/Reducer";
import DynamicLoader from "utils/dynamicLoader/DynamicLoader";

export interface Props {
  mode: string;
  menu: any;
  menus?: Array<any>;
  handleToggleSidebar: (checked: boolean) => void;
  handleMenuClosed?: (item: any, openedList: Array<any>) => void;
  handleActivateTab?: (item: any) => void;
}

const Content: React.FC<Props> = ({
  mode = "SDI",
  menu,
  menus,
  handleToggleSidebar,
  handleMenuClosed,
  handleActivateTab,
}: Props) => {
  const [openedMenuList, setOpenedMenuList] = useState<Array<any>>([]);
  const { store, dispatch } = useAppContext();
  const { store: themeStore } = useThemeContext();

  // NOTE: 일반 메뉴 오픈시 hook
  useEffect(() => {
    if (!menu) {
      setOpenedMenuList([]);
      return;
    }

    dispatch({ type: "SET_ACTIVE_MENU", payload: menu?.moveItem || menu });

    const openItem = openedMenuList.find(
      (item) => item.menuCode === menu.menuCode
    );
    if (openItem && menu.open) return;

    menu.open
      ? setOpenedMenuList((previous) => {
          return [...previous, menu];
        })
      : setOpenedMenuList((previous) => {
          const filteredPrevList = previous.filter(
            (item) => item.menuCode != menu.menuCode
          );

          return [...filteredPrevList];
        });
  }, [menu]);

  // NOTE: 인터페이스모드가 SDI로 설정될 경우 열린 열린 페이지 삭제
  useEffect(() => {
    if (store?.toggledInterface === "SDI") {
      setOpenedMenuList([menu]);
    }
  }, [store?.toggledInterface]);

  return (
    <main className={classNames("main", { darkMode: themeStore?.darkMode })}>
      {openedMenuList.length > 0 && menu ? (
        <>
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaExchangeAlt />
          </div>

          <header>
            <Header
              title={menu?.moveItem?.menuName || menu.menuName}
              menus={menus}
              menu={menu}
            />
          </header>

          {mode === "SDI" ? (
            <div style={{ overflow: "auto", height: "100%" }}>
              <DynamicLoader
                key={`Menu${menu.menuCode}`}
                path={menu.url}
                info={menu}
              />
            </div>
          ) : (
            <TabPageContainer
              openedList={openedMenuList}
              activeKey={menu?.moveItem?.menuCode || menu.menuCode}
              handleMenuClosed={handleMenuClosed}
              handleActivateTab={handleActivateTab}
            />
          )}

          <footer>
            <small>
              © {new Date().getFullYear()} made by -{" "}
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
            <FaExchangeAlt />
          </div>
          <div style={{ overflow: "auto" }}>
            <DynamicLoader key={"Home"} path={"Home"} />
          </div>
        </>
      )}
    </main>
  );
};

export default React.memo(Content);
