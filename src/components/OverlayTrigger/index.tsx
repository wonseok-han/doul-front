import React, { ReactElement } from "react";
import { OverlayTrigger as BootStrapOverlayTrigger } from "react-bootstrap";
import { OverlayChildren } from "react-bootstrap/esm/Overlay";

export interface OverlayTriggerProps {
  placement?:
    | "auto-start"
    | "auto"
    | "auto-end"
    | "top-start"
    | "top"
    | "top-end"
    | "right-start"
    | "right"
    | "right-end"
    | "bottom-end"
    | "bottom"
    | "bottom-start"
    | "left-end"
    | "left"
    | "left-start";
  render: (props: any, children: any) => OverlayChildren;
  renderChildren: any;
  children: ReactElement;
}

const OverlayTrigger: React.FC<OverlayTriggerProps> = ({
  placement = "top-end",
  children,
  render,
  renderChildren,
}: OverlayTriggerProps) => {
  return (
    <BootStrapOverlayTrigger
      placement={placement}
      overlay={(props) => render(props, renderChildren)}
    >
      {children}
    </BootStrapOverlayTrigger>
  );
};

export default React.memo(OverlayTrigger);
