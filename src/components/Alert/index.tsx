import "./styles.scss";

import classNames from "classnames";
import Button from "components/Button";
import React, { forwardRef, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { actions, useAppContext, useThemeContext } from "utils/context";

export interface AlertProps {
  show?: boolean;
  header?: string;
  body?: string;
  callBack?: any;
}

const Alert: React.FC<AlertProps> = ({
  show,
  header,
  body,
  callBack,
}: AlertProps) => {
  const { dispatch } = useAppContext();
  const { store: themeStore } = useThemeContext();
  const { showAlert } = actions;
  const buttonRef = useRef<HTMLButtonElement>(null);

  // NOTE: Alert Close 이벤트
  const handleClose = () => {
    dispatch(showAlert({ show: false }));
    callBack?.();
  };

  // NOTE: Ref 버튼 컴포넌트
  const RefButton = forwardRef<HTMLButtonElement>((props, ref) => {
    return (
      <Button ref={ref} onClick={handleClose}>
        닫기
      </Button>
    );
  });
  RefButton.displayName = "RefButton";

  useEffect(() => {
    if (show && buttonRef?.current) {
      buttonRef?.current.focus();
    }
  }, [show]);

  return (
    <>
      <Modal
        className={classNames("modal")}
        show={show}
        onHide={handleClose}
        backdrop={"static"}
        keyboard={false}
      >
        {header && <Modal.Header>{header}</Modal.Header>}
        <Modal.Body
          className={classNames("modal-body", {
            darkMode: themeStore?.darkMode,
          })}
        >
          {body}
        </Modal.Body>
        <Modal.Footer
          className={classNames("modal-footer", {
            darkMode: themeStore?.darkMode,
          })}
        >
          <RefButton ref={buttonRef} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(Alert);
