import "./styles.scss";

import RenderIndicator from "components/RenderIndicator";
import React from "react";
import { Modal, Spinner } from "react-bootstrap";

export interface LoadingProps {
  loading?: boolean;
  onClick?: (event: any) => void;
}

const Loading: React.FC<LoadingProps> = ({
  loading = false,
  onClick,
}: LoadingProps) => {
  return (
    <Modal
      show={loading}
      centered
      contentClassName={"ModalLoading"}
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen={"sm-down"}
      onClick={onClick}
      style={{
        zIndex: 9999,
      }}
    >
      <Modal.Body
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RenderIndicator />
          <Spinner
            as={"span"}
            animation={"border"}
            role={"status"}
            aria-hidden={"true"}
            variant={"primary"}
          />
          {/* <span style={{ marginLeft: "10px" }}>Loading...</span> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(Loading);
