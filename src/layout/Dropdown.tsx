import React from "react";
import { Dropdown as BootStrapDropdown } from "react-bootstrap";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import useAppContext, { useThemeContext } from "utils/context/Reducer";
// FaBahai
// FaCog

const Dropdown: React.FC = () => {
  const { dispatch } = useAppContext();
  const { store: themeStore } = useThemeContext();

  return (
    <BootStrapDropdown.Menu
      variant={themeStore?.darkMode || false ? "dark" : "light"}
    >
      <BootStrapDropdown.Item
        onClick={() =>
          dispatch({
            type: "SET_OPEN_MENU",
            payload: {
              menuCode: "SETTINGS",
              menuName: "설정",
              url: "common/Settings",
              open: true,
            },
          })
        }
      >
        <FaCog style={{ marginRight: 5 }} />
        Settings
      </BootStrapDropdown.Item>
      <BootStrapDropdown.Item onClick={() => window.location.reload()}>
        <FaSignOutAlt style={{ marginRight: 5 }} />
        로그아웃
      </BootStrapDropdown.Item>
    </BootStrapDropdown.Menu>
  );
};

export default React.memo(Dropdown);
