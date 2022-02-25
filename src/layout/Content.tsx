import TabPageContainer from "components/TabPageContainer";
import Header from "layout/Header";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import useAppContext from "utils/context/Reducer";
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
  const { dispatch } = useAppContext();

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

  return (
    <main
      style={{
        height: "auto",
        minHeight: "100%",
      }}
    >
      {openedMenuList.length > 0 && menu ? (
        <>
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>

          <header>
            <Header
              title={menu?.moveItem?.menuName || menu.menuName}
              menus={menus}
              menu={menu}
            />
          </header>

          {mode === "SDI" ? (
            <div style={{ overflow: "scroll", height: "100%" }}>
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
            <FaBars />
          </div>
          <div style={{ overflow: "scroll" }}>
            <DynamicLoader key={"Home"} path={"Home"} />
          </div>
        </>
      )}
    </main>
  );
};

export default React.memo(Content);
