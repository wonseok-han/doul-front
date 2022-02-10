import React from 'react';
import { Tab, Tabs, TabsProps } from 'react-bootstrap';

export interface Props extends TabsProps {
  children?: Array<{ id: string; title: string; node: React.ReactNode }>;
}

const TabContainer: React.FC<Props> = ({ children }: Props) => {
  return (
    <Tabs>
      {children?.map((item) => (
        <Tab key={item.id} title={item.title}>
          {item.node}
        </Tab>
      ))}
    </Tabs>
  );
};

export default TabContainer;
