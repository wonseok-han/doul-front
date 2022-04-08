import "./styles.scss";

import classNames from "classnames";
import OverlayTrigger from "components/OverlayTrigger";
import RenderIndicator from "components/RenderIndicator";
import React from "react";
import { FormControl, InputGroup, InputGroupProps } from "react-bootstrap";
import { useThemeContext } from "utils/context";
import { renderTooltip } from "utils/tooltip/Tooltip";
import { ValidateProps } from "utils/types/pages";

export interface TextareaProps extends InputGroupProps {
  /**
   * 필드명
   */
  name: string;
  /**
   * 필드 값
   */
  value?: string | undefined;
  /**
   * ReadOnly 여부
   */
  readOnly?: boolean;
  /**
   * Disabled 여부
   */
  disabled?: boolean;
  /**
   * placeholder 문자
   */
  placeholder?: string | undefined;
  /**
   * 유효성 여부
   */
  isValid?: boolean | undefined;
  /**
   * 유효성 검사 결과값
   */
  validate?: ValidateProps;
  /**
   * 필드 Change Event
   */
  handleChangeField?: (event: any) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  value,
  readOnly = false,
  disabled = false,
  placeholder,
  isValid,
  validate,
  style,
  handleChangeField,
}: TextareaProps) => {
  // NOTE: 값 변경 이벤트
  const handleChange = (event: any) => {
    const {
      target: { name, value },
    } = event;

    const fieldValue = {
      target: {
        name,
        value,
      },
    };
    handleChangeField?.(fieldValue);
  };
  const { store: themeStore } = useThemeContext();

  return (
    <>
      <RenderIndicator />
      <OverlayTrigger
        render={renderTooltip}
        renderChildren={validate?.message || value}
        invalid={validate?.invalid}
      >
        <InputGroup style={style} hasValidation={true}>
          <FormControl
            className={classNames("custom-textarea", {
              darkMode: themeStore?.darkMode,
            })}
            as={"textarea"}
            name={name}
            value={value}
            readOnly={readOnly}
            disabled={disabled}
            placeholder={placeholder}
            isValid={isValid}
            isInvalid={isValid !== undefined ? !isValid : false}
            onChange={handleChange}
          />
        </InputGroup>
      </OverlayTrigger>
    </>
  );
};

export default React.memo(Textarea);
