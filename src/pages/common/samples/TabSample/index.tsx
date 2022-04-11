import Tab, { NavInfoProps } from "components/Tab";
import { useEffect, useState } from "react";
import { PageProps } from "utils/types";

const TabSample: React.FC<PageProps> = () => {
  const [activeKey, setActiveKey] = useState("");

  const NAV_INFO: Array<NavInfoProps> = [
    {
      key: "01",
      name: "Tab01",
      element: <div>TabPage 01</div>,
    },
    {
      key: "02",
      name: "Tab02",
      element: <div>TabPage 02</div>,
    },
    {
      key: "03",
      name: "Tab03",
      element: <div>TabPage 03</div>,
    },
  ];

  useEffect(() => {
    setActiveKey("01");
  }, []);

  const handleBeforeActivateTab = (item: any) => {
    console.log("before::", item);
    return true;
  };

  const handleActivateTab = (item: any) => {
    console.log("active::", item);
  };

  return (
    <>
      <Tab
        navInfo={NAV_INFO}
        activeKey={activeKey}
        handleActivateTab={handleActivateTab}
        handleBeforeActivateTab={handleBeforeActivateTab}
      />
    </>
  );
};

export default TabSample;
