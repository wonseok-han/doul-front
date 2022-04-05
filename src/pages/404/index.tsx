import "./styles.scss";

import classNames from "classnames";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "utils/context";

const NotFoundPage: React.FC = () => {
  const { store: themeStore } = useThemeContext();
  const navigate = useNavigate();

  return (
    <main
      className={classNames("not-found-main", {
        darkMode: themeStore?.darkMode,
      })}
    >
      <h1
        className={classNames("not-found-h1", {
          darkMode: themeStore?.darkMode,
        })}
      >
        404
      </h1>
      <p
        className={classNames("not-found-p", {
          darkMode: themeStore?.darkMode,
        })}
      >
        Page Not Found
      </p>
      <Button style={{ marginTop: 40 }} onClick={() => navigate("/")}>
        Go Home
      </Button>
    </main>
  );
};
export default NotFoundPage;
