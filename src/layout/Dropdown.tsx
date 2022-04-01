import React from "react";
import { Dropdown as BootStrapDropdown } from "react-bootstrap";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAppContext, { useThemeContext } from "utils/context/Reducer";
import { removeSessionStorage } from "utils/functions/store";

const Dropdown: React.FC = () => {
  const { dispatch } = useAppContext();
  const { store: themeStore } = useThemeContext();
  const navigate = useNavigate();

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
      <BootStrapDropdown.Item
        onClick={() => {
          dispatch({ type: "SET_USER_INFO", payload: undefined });
          removeSessionStorage("USER_ID");
          removeSessionStorage("USER_NAME");

          alert("로그아웃되었습니다.");

          navigate("/");
        }}
      >
        <FaSignOutAlt style={{ marginRight: 5 }} />
        로그아웃
      </BootStrapDropdown.Item>
    </BootStrapDropdown.Menu>
  );
};

export default React.memo(Dropdown);
