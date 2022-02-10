import React, { useEffect, useState } from 'react';
import {
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
  openedItem: any;
}

const TabPageContainer: React.FC<Props> = ({
  children,
  openedList,
  openedItem,
}: Props) => {
  const defaultActiveKey = openedItem.menu_cd;

  useEffect(() => {
    console.log('openedList::', openedList);
  }, [openedList]);

  useEffect(() => {
    console.log('openedItem::', openedItem);
  }, [openedItem]);

  return (
    <TabContainer defaultActiveKey={defaultActiveKey}>
      <Nav variant="tabs">
        {openedList.map((item) => (
          <Nav.Item key={`Nav${item.menu_cd}`} style={{ cursor: 'pointer' }}>
            <Nav.Link eventKey={item.menu_cd}>{item.menu_nm}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div style={{ overflow: 'scroll' }}>
        {openedList.map((item) => (
          <TabContent key={`Tab${item.menu_cd}`}>
            <TabPane eventKey={item.menu_cd} title={item.menu_nm}>
              <DynamicLoader key={`Menu${item.menu_cd}`} path={item.url} />
            </TabPane>
          </TabContent>
        ))}
      </div>
    </TabContainer>
  );
};

export default TabPageContainer;
