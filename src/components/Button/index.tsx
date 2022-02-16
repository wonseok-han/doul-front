import React, { useState } from "react";
import {
  Button as BootStrapButton,
  ButtonProps as BootStrapButtonProps,
} from "react-bootstrap";

export type ButtonProps = BootStrapButtonProps;

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  size = "sm",
  type = "button",
  variant = "primary",
  style,
  onClick,
}: ButtonProps) => {
  const [doubleClick, setDoubleClick] = useState(false);

  // NOTE: 버튼 클릭 이벤트
  const handleClick = (event: any) => {
    if (doubleClick) {
      return;
    } else {
      setDoubleClick(true);

      onClick?.(event);

      setTimeout(() => {
        setDoubleClick(false);
      }, 1000);
    }
  };

  return (
    <BootStrapButton
      disabled={disabled}
      size={size}
      type={type}
      variant={variant}
      style={style}
      onClick={handleClick}
    >
      {children}
    </BootStrapButton>
  );
};

export default React.memo(Button);
