import classnames from "classnames";
import React from "react";
import {
  Row as BootStrapRow,
  RowProps as BootStrapRowProps,
} from "react-bootstrap";

export type RowProps = BootStrapRowProps;

const FormRow: React.FC<RowProps> = ({
  children,
  xs = "1",
  sm = "2",
  md = "2",
  lg = "2",
  xl = "4",
  xxl = "4",
  style,
  className,
}: RowProps) => {
  return (
    <BootStrapRow
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      className={classnames(className, "gx-0")}
      style={style}
    >
      {children}
    </BootStrapRow>
  );
};

export default React.memo(FormRow);
