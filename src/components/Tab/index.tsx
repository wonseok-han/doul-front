import "./styles.scss";

import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  Nav,
  TabContainer,
  TabContent,
  TabPane,
  TabsProps,
} from "react-bootstrap";
import { useThemeContext } from "utils/context";

export interface NavInfoProps {
  /**
   * Tab Page 고유 키
   */
  key: string;
  /**
   * Tab Page 명
   */
  name: string;
  /**
   * Tab Page Children Element
   */
  element: React.ReactElement;
}

export interface Props extends TabsProps {
  /**
   * Navigation 정보
   */
  navInfo: Array<NavInfoProps>;
  /**
   * 활성화할 탭
   */
  activeKey?: string;
  /**
   * Tab Page 활성화 전 이벤트
   */
  handleBeforeActivateTab?: (item: any) => boolean;
  /**
   * Tab Page 활성화 이벤트
   */
  handleActivateTab?: (item: any) => void;
}

const Tab: React.FC<Props> = ({
  navInfo,
  activeKey,
  handleBeforeActivateTab,
  handleActivateTab,
}: Props) => {
  const { store: themeStore } = useThemeContext();
  const [activateKey, setActivateKey] = useState(
    activeKey || navInfo[0].key || undefined
  );

  useEffect(() => {
    setActivateKey(activeKey);
  }, [activeKey]);

  return (
    <TabContainer
      activeKey={activateKey}
      onSelect={(key) => {
        const foundItem = navInfo.find((item) => item.key === key);

        if (handleBeforeActivateTab) {
          if (
            !handleBeforeActivateTab?.(
              navInfo.find((item) => item.key === activateKey)
            )
          ) {
            setActivateKey(activateKey);
          } else {
            handleActivateTab?.(foundItem);
            setActivateKey(key || undefined);
          }
        } else {
          handleActivateTab?.(foundItem);
          setActivateKey(key || undefined);
        }
      }}
    >
      <Nav className={"custom-nav"} variant="tabs" navbar={true}>
        {navInfo.map((item) => (
          <Nav.Item key={`Nav${item.key}`} style={{ cursor: "pointer" }}>
            <Nav.Link
              className={classNames("custom-nav-link", {
                darkMode: themeStore?.darkMode,
              })}
              eventKey={item.key}
            >
              {item.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div style={{ overflow: "auto", height: "100%", marginTop: "10px" }}>
        <TabContent>
          {navInfo.map((item) => (
            <TabPane
              key={`Tab${item.key}`}
              eventKey={item.key}
              title={item.name}
            >
              {item.element}
            </TabPane>
          ))}
        </TabContent>
      </div>
    </TabContainer>
  );
};

export default React.memo(Tab);
