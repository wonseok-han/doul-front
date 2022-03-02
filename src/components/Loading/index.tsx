import RenderIndicator from "components/RenderIndicator";
import React from "react";
import { Spinner } from "react-bootstrap";

const Loading: React.FC = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <RenderIndicator />
      <Spinner
        as={"span"}
        animation={"border"}
        role={"status"}
        aria-hidden="true"
      />
      <span style={{ marginLeft: "10px" }}>Loading...</span>
    </div>
  );
};

export default React.memo(Loading);
