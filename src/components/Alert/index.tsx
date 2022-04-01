import Button from "components/Button";
import React from "react";
import { Modal } from "react-bootstrap";
import { actions, useAppContext } from "utils/context";

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
  const { showAlert } = actions;

  // NOTE: Alert Close 이벤트
  const handleClose = () => {
    dispatch(showAlert({ show: false }));
    callBack?.();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop={"static"}
        keyboard={false}
      >
        {header && <Modal.Header>{header}</Modal.Header>}
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(Alert);
