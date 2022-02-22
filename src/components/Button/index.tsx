import RenderIndicator from "components/RenderIndicator";
import React, { useState } from "react";
import {
  Button as BootStrapButton,
  ButtonProps as BootStrapButtonProps,
} from "react-bootstrap";

export interface ButtonProps extends BootStrapButtonProps {
  hidden?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  size = "sm",
  type = "button",
  variant = "primary",
  hidden = false,
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
    <>
      <RenderIndicator />
      {!hidden && (
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
      )}
    </>
  );
};

export default React.memo(Button);
