import "./styles.scss";

import classNames from "classnames";
import React, { useCallback } from "react";
import {
  CloseButton,
  Nav,
  TabContainer,
  TabContent,
  TabPane,
  TabsProps,
} from "react-bootstrap";
import { useThemeContext } from "utils/context";
import DynamicLoader from "utils/dynamicLoader/DynamicLoader";

export interface Props extends TabsProps {
  openedList: Array<any>;
  activeKey: string;
  handleMenuClosed?: (item: any, openedList: Array<any>) => void;
  handleActivateTab?: (item: any) => void;
}

const TabPageContainer: React.FC<Props> = ({
  openedList,
  activeKey,
  handleMenuClosed,
  handleActivateTab,
}: Props) => {
  // NOTE: 탭의 Extra 버튼 클릭 이벤트(화면 닫기)
  const handleExtraOnClick = useCallback(
    (item) => {
      handleMenuClosed?.(item, openedList);
    },
    [openedList]
  );
  const { store: themeStore } = useThemeContext();

  return (
    <TabContainer
      activeKey={activeKey}
      onSelect={(key) => {
        const foundItem = openedList.find((item) => item.menuCode === key);
        if (handleActivateTab) handleActivateTab(foundItem);
      }}
    >
      <Nav className={"custom-nav"} variant="tabs" navbar={true}>
        {openedList.map((item) => (
          <Nav.Item key={`Nav${item.menuCode}`} style={{ cursor: "pointer" }}>
            <Nav.Link
              className={classNames("custom-nav-link", {
                darkMode: themeStore?.darkMode,
              })}
              eventKey={item.menuCode}
            >
              {item.menuName}
              <CloseButton
                className={classNames("close-icon")}
                variant={themeStore?.darkMode ? "white" : undefined}
                onClick={(event) => {
                  event.stopPropagation();
                  handleExtraOnClick(item);
                }}
              />
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div style={{ overflow: "auto", height: "100%" }}>
        <TabContent>
          {openedList.map((item) => (
            <TabPane
              key={`Tab${item.menuCode}`}
              eventKey={item.menuCode}
              title={item.menuName}
            >
              <DynamicLoader
                key={`Menu${item.menuCode}`}
                path={item.url}
                info={item}
              />
            </TabPane>
          ))}
        </TabContent>
      </div>
    </TabContainer>
  );
};

export default React.memo(TabPageContainer);
