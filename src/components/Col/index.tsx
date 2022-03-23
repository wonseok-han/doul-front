import "./index.scss";

import classNames from "classnames";
import React from "react";
import {
  Col as BootStrapCol,
  ColProps as BootStrapColProps,
} from "react-bootstrap";
import { useThemeContext } from "utils/context/Reducer";

export type ColProps = BootStrapColProps;

const Col: React.FC<ColProps> = ({
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  style,
  className,
}: ColProps) => {
  const { store: themeStore } = useThemeContext();

  return (
    <BootStrapCol
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      className={classNames(`${className} form-col`, {
        darkMode: themeStore?.darkMode,
      })}
      style={style}
    >
      {children}
    </BootStrapCol>
  );
};

export default React.memo(Col);
