import React from "react";
import { FormControl, InputGroup, InputGroupProps } from "react-bootstrap";

export interface InputBoxProps extends InputGroupProps {
  isPassword?: boolean;
  value?: string | undefined;
  readOnly?: boolean;
  placeholder?: string | undefined;
  prefix?: string | undefined;
  postfix?: string | undefined;
  hidden?: boolean;
  isValid?: boolean | undefined;
}

const InputBox: React.FC<InputBoxProps> = ({
  isPassword = false,
  value,
  readOnly = false,
  placeholder,
  prefix,
  postfix,
  hidden = false,
  isValid,

  style,
}: InputBoxProps) => {
  return (
    <>
      {!hidden && (
        <InputGroup style={style} hasValidation={true}>
          {prefix && <InputGroup.Text>{prefix}</InputGroup.Text>}
          <FormControl
            type={(isPassword && "password") || ""}
            readOnly={readOnly}
            placeholder={placeholder}
            value={value}
            isValid={isValid}
            isInvalid={isValid !== undefined ? !isValid : false}
          />
          {postfix && <InputGroup.Text>{postfix}</InputGroup.Text>}
        </InputGroup>
      )}
    </>
  );
};

export default React.memo(InputBox);
