import RenderIndicator from "components/RenderIndicator";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // 페이지 이동시 setTimeOut의 비동기 실행으로 인한 memory leak 이슈 픽스를 위한 cleanup
    return () => setDoubleClick(false);
  }, []);

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
