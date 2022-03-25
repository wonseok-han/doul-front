import "./styles.scss";

import classNames from "classnames";
import OverlayTrigger from "components/OverlayTrigger";
import RenderIndicator from "components/RenderIndicator";
import React from "react";
import { FormControl, InputGroup, InputGroupProps } from "react-bootstrap";
import { useThemeContext } from "utils/context/Reducer";
import { renderTooltip } from "utils/tooltip/Tooltip";

export interface InputBoxProps extends InputGroupProps {
  type?: string;
  name: string;
  isPassword?: boolean;
  value?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string | undefined;
  prefix?: string | undefined;
  postfix?: string | undefined;
  hidden?: boolean;
  textAlign?: "left" | "right" | "center";
  isValid?: boolean | undefined;
  handleChangeField?: (event: any) => void;
}

const STYLE = {
  textOverflow: "ellipsis",
};

const InputBox: React.FC<InputBoxProps> = ({
  type = "string",
  name,
  isPassword = false,
  value,
  readOnly = false,
  disabled = false,
  placeholder,
  prefix,
  postfix,
  hidden = false,
  textAlign,
  isValid,
  style,
  handleChangeField,
}: InputBoxProps) => {
  const { store: themeStore } = useThemeContext();

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

  return (
    <>
      <RenderIndicator />
      {!hidden && (
        <OverlayTrigger render={renderTooltip} renderChildren={value}>
          <InputGroup style={style} hasValidation={true}>
            {prefix && <InputGroup.Text>{prefix}</InputGroup.Text>}
            <FormControl
              className={classNames("custom-input", {
                darkMode: themeStore?.darkMode,
              })}
              name={name}
              type={isPassword ? "password" : type}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder}
              value={value}
              isValid={isValid}
              isInvalid={isValid !== undefined ? !isValid : false}
              onChange={handleChange}
              style={{ ...STYLE, textAlign: textAlign }}
            />
            {postfix && <InputGroup.Text>{postfix}</InputGroup.Text>}
          </InputGroup>
        </OverlayTrigger>
      )}
    </>
  );
};

export default React.memo(InputBox);
