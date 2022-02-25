import RenderIndicator from "components/RenderIndicator";
import React from "react";
import { FormControl, InputGroup, InputGroupProps } from "react-bootstrap";

export interface TextareaProps extends InputGroupProps {
  name: string;
  value?: string | undefined;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string | undefined;
  isValid?: boolean | undefined;
  handleChangeField?: (event: any) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  value,
  readOnly = false,
  disabled = false,
  placeholder,
  isValid,
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

  return (
    <>
      <RenderIndicator />
      <InputGroup style={style} hasValidation={true}>
        <FormControl
          as={"textarea"}
          name={name}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          placeholder={placeholder}
          isValid={isValid}
          isInvalid={isValid !== undefined ? !isValid : false}
          onChange={handleChange}
        ></FormControl>
      </InputGroup>
    </>
  );
};

export default React.memo(Textarea);
