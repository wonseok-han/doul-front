import React, { ReactElement } from "react";
import { OverlayTrigger as BootStrapOverlayTrigger } from "react-bootstrap";
import { OverlayChildren } from "react-bootstrap/esm/Overlay";
import { isNull } from "utils/functions/data";

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
  render: (props: any, children: any, validate?: string) => OverlayChildren;
  renderChildren: any;
  invalid?: string;
  children: ReactElement | any;
}

const OverlayTrigger: React.FC<OverlayTriggerProps> = ({
  children,
  render,
  renderChildren,
  invalid,
  placement = !isNull(invalid) ? "bottom-end" : "top-end",
}: OverlayTriggerProps) => {
  return (
    <BootStrapOverlayTrigger
      placement={placement}
      show={!isNull(invalid) && !isNull(renderChildren) ? true : undefined}
      overlay={(props) => render(props, renderChildren, invalid)}
    >
      {({ ref, ...props }) => {
        return React.createElement("div", { ref: ref, ...props }, children);
      }}
    </BootStrapOverlayTrigger>
  );
};

export default React.memo(OverlayTrigger);
