import React from "react";
import { Dropdown as BootStrapDropdown } from "react-bootstrap";
import { FaCog, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { actions, useAppContext, useThemeContext } from "utils/context";
import { removeSessionStorage } from "utils/functions/store";

const Dropdown: React.FC = () => {
  const { store, dispatch } = useAppContext();
  const { store: themeStore } = useThemeContext();
  const navigate = useNavigate();
  const { setOpenMenu, setUserInfo, showAlert } = actions;
  const hasUserInfo = store?.userInfo ? true : false;

  // NOTE: 로그인
  const handleSignIn = () => {
    navigate("/login");
  };

  // NOTE: 로그아웃
  const handleSignOut = () => {
    dispatch(setUserInfo(undefined));
    removeSessionStorage("USER_ID");
    removeSessionStorage("USER_NAME");

    dispatch(
      showAlert({
        body: "로그아웃 되었습니다.",
        callBack: () => navigate("/"),
      })
    );
  };

  return (
    <BootStrapDropdown.Menu
      variant={themeStore?.darkMode || false ? "dark" : "light"}
    >
      <BootStrapDropdown.Item
        onClick={() =>
          dispatch(
            setOpenMenu({
              menuCode: "SETTINGS",
              menuName: "설정",
              url: "common/Settings",
              open: true,
            })
          )
        }
      >
        <FaCog style={{ marginRight: 5 }} />
        Settings
      </BootStrapDropdown.Item>
      <BootStrapDropdown.Item
        onClick={hasUserInfo ? handleSignOut : handleSignIn}
      >
        {hasUserInfo ? (
          <>
            <FaSignOutAlt style={{ marginRight: 5 }} />
            {"Sign Out"}
          </>
        ) : (
          <>
            <FaSignInAlt style={{ marginRight: 5 }} />
            {"Sign In"}
          </>
        )}
      </BootStrapDropdown.Item>
    </BootStrapDropdown.Menu>
  );
};

export default React.memo(Dropdown);
