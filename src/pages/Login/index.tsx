import "./styles.scss";

import classNames from "classnames";
import Alert from "components/Alert";
import Button from "components/Button";
import FormContainer from "components/Form/FormContainer";
import FormRow from "components/Form/FormRow";
import React from "react";
import { useNavigate } from "react-router-dom";
import { actions, useAppContext, useThemeContext } from "utils/context";
import { setSessionStorage } from "utils/functions/store";
import useFieldValues from "utils/hooks/useFieldValues";

import { DATA, META } from "./meta";

const Login: React.FC = () => {
  const [fieldValues, handleChangeField] = useFieldValues(DATA);
  const { store: themeStore } = useThemeContext();
  const { store, dispatch } = useAppContext();
  const { setUserInfo, showAlert } = actions;
  const navigate = useNavigate();

  // NOTE: 로그인 버튼 클릭 handler
  const handleClick = () => {
    onLogin();
  };

  // NOTE: 로그인
  const onLogin = async () => {
    const { id, password } = fieldValues;

    if (id === "admin" && password === "admin") {
      await dispatch(
        setUserInfo({
          id,
          name: id === "admin" ? "관리자" : "Unknown",
        })
      );

      setSessionStorage("USER_ID", id);
      setSessionStorage("USER_NAME", id === "admin" ? "관리자" : "Unknown");

      navigate("/");
    } else {
      dispatch(showAlert({ body: "로그인에 실패했습니다." }));
    }
  };

  const handleKeyDown = (event: any) => {
    const { keyCode } = event;

    if (keyCode === 13) {
      onLogin();

      // Alert으로의 이벤트 전달을 방지하기 위한 코드
      event.preventDefault();
    }
  };

  return (
    <main
      className={classNames("login-main", {
        darkMode: themeStore?.darkMode,
      })}
    >
      <div className="login-form" onKeyDown={handleKeyDown}>
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
      </div>
      <FormRow
        className="login-form"
        xs={1}
        sm={1}
        md={1}
        lg={1}
        xl={1}
        xxl={1}
      >
        <Button onClick={handleClick}>로그인</Button>
      </FormRow>
      <Alert
        show={store?.showAlert?.show || false}
        confirm={store?.showAlert?.confirm || false}
        header={store?.showAlert?.header}
        body={store?.showAlert?.body}
        callBack={store?.showAlert?.callBack}
      />
    </main>
  );
};

export default React.memo(Login);
