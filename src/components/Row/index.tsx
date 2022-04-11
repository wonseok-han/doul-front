import classNames from "classnames";
import React from "react";
import {
  Row as BootStrapRow,
  RowProps as BootStrapRowProps,
} from "react-bootstrap";

export type RowProps = BootStrapRowProps;

const Row: React.FC<RowProps> = ({
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
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
      className={classNames(`${className} gx-0`)}
      style={{ marginBottom: "3px", ...style }}
    >
      {children}
    </BootStrapRow>
  );
};

export default React.memo(Row);
