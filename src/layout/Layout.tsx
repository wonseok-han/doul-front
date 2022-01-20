import { useState } from 'react';

import Content from './Content';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Layout: React.FC = () => {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked: boolean) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked: boolean) => {
    setRtl(checked);
    // setLocale(checked ? 'ar' : 'en');
  };
  const handleImageChange = (checked: boolean) => {
    setImage(checked);
  };

  const handleToggleSidebar = (checked: boolean) => {
    console.log(checked);
    setToggled(checked);
  };

  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <Sidebar
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        onCollapseChange={handleCollapsedChange}
      />
      <Content
        image={image ? true : false}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
      />
    </div>
  );
};

export default Layout;
