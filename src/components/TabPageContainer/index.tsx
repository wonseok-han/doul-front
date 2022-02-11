import React, { useCallback, useEffect } from 'react';
import {
  CloseButton,
  Nav,
  TabContainer,
  TabContent,
  TabPane,
  TabsProps,
} from 'react-bootstrap';
import DynamicLoader from 'utils/dynamicLoader/DynamicLoader';

export interface Props extends TabsProps {
  children?: Array<{ id: string; title: string; node: React.ReactNode }>;
  openedList: Array<any>;
  // openedItem: any;
  activeKey: string;
  handleMenuClosed?: (item: any) => void;
  handleActivateTab?: (item: any) => void;
}

const TabPageContainer: React.FC<Props> = ({
  children,
  openedList,
  // openedItem,
  activeKey,
  handleMenuClosed,
  handleActivateTab,
}: Props) => {
  useEffect(() => {
    console.log('openedList::', openedList);
  }, [openedList]);

  const handleExtraOnClick = useCallback((item) => {
    handleMenuClosed?.(item);
  }, []);

  return (
    <TabContainer
      activeKey={activeKey}
      onSelect={(key) => {
        const foundItem = openedList.find((item) => item.menu_cd === key);
        if (handleActivateTab) handleActivateTab(foundItem);
      }}
    >
      <Nav variant="tabs">
        {openedList.map((item) => (
          <Nav.Item key={`Nav${item.menu_cd}`} style={{ cursor: 'pointer' }}>
            <Nav.Link eventKey={item.menu_cd}>
              {item.menu_nm}
              <CloseButton
                style={{
                  marginLeft: '5px',
                  width: '5px',
                  height: '5px',
                  verticalAlign: 'middle',
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleExtraOnClick(item);
                }}
              />
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <div style={{ overflow: 'scroll' }}>
        <TabContent>
          {openedList.map((item) => (
            <TabPane
              key={`Tab${item.menu_cd}`}
              eventKey={item.menu_cd}
              title={item.menu_nm}
            >
              <DynamicLoader key={`Menu${item.menu_cd}`} path={item.url} />
            </TabPane>
          ))}
        </TabContent>
      </div>
    </TabContainer>
  );
};

export default React.memo(TabPageContainer);
