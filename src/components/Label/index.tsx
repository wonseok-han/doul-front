import "./index.scss";

import classnames from "classnames";
import RenderIndicator from "components/RenderIndicator";
import React from "react";
import { FormLabel } from "react-bootstrap";

type ColSizeProps =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

export interface LabelProps {
  xs?: ColSizeProps;
  sm?: ColSizeProps;
  md?: ColSizeProps;
  lg?: ColSizeProps;
  xl?: ColSizeProps;
  style?: any;
  required?: boolean;
  column?: boolean;
  children?: any;
}

const Label: React.FC<LabelProps> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  style,
  required,
  column,
  children,
}: LabelProps) => {
  return (
    <>
      <RenderIndicator />
      <FormLabel
        column={column}
        xs={xs}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
        style={{ ...style }}
        className={classnames("title")}
      >
        {required && <span className={classnames("required")}>*</span>}
        {children}
      </FormLabel>
    </>
  );
};

export default React.memo(Label);
