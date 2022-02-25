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
  | "12"
  | "auto";

export interface LabelProps {
  xs?: ColSizeProps;
  sm?: ColSizeProps;
  md?: ColSizeProps;
  lg?: ColSizeProps;
  xl?: ColSizeProps;
  xxl?: ColSizeProps;
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
  xxl,
  style,
  required,
  column = true,
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
        xxl={xxl}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
        className={classnames("title")}
      >
        <label>
          {required && <span className={classnames("required")}>*</span>}
          {children}
        </label>
      </FormLabel>
    </>
  );
};

export default React.memo(Label);
