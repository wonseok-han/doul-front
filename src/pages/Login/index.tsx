import "./styles.scss";

import classNames from "classnames";
import Button from "components/Button";
import FormContainer from "components/Form/FormContainer";
import FormRow from "components/Form/FormRow";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAppContext, { useThemeContext } from "utils/context/Reducer";
import { setSessionStorage } from "utils/functions/store";
import useFieldValues from "utils/hooks/useFieldValues";

import { DATA, META } from "./meta";

const Login: React.FC = () => {
  const [fieldValues, handleChangeField] = useFieldValues(DATA);
  const { store: themeStore } = useThemeContext();
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  // NOTE: 로그인 버튼 클릭 handler
  const handleClick = () => {
    onLogin();
  };

  // NOTE: 로그인
  const onLogin = async () => {
    const { id, password } = fieldValues;

    if (id === "admin" && password === "admin") {
      await dispatch({
        type: "SET_USER_INFO",
        payload: {
          id,
          name: id === "admin" ? "관리자" : "Unknown",
        },
      });

      setSessionStorage("USER_ID", id);
      setSessionStorage("USER_NAME", id === "admin" ? "관리자" : "Unknown");

      navigate("/main");
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <main
      className={classNames("login-main", {
        darkMode: themeStore?.darkMode,
      })}
    >
      <div className="login-form">
        <FormContainer
          meta={META}
          data={fieldValues}
          column={1}
          xs={1}
          sm={1}
          md={1}
          lg={1}
          handleChangeField={handleChangeField}
        />
        <br />
        <FormRow xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
          <Button onClick={handleClick}>로그인</Button>
        </FormRow>
      </div>
    </main>
  );
};

export default React.memo(Login);
