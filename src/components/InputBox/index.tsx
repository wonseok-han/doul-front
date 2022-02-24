import OverlayTrigger from "components/OverlayTrigger";
import RenderIndicator from "components/RenderIndicator";
import React from "react";
import { FormControl, InputGroup, InputGroupProps } from "react-bootstrap";
import { renderTooltip } from "utils/tooltip/Tooltip";

export interface InputBoxProps extends InputGroupProps {
  name: string;
  isPassword?: boolean;
  value?: string | undefined;
  readOnly?: boolean;
  placeholder?: string | undefined;
  prefix?: string | undefined;
  postfix?: string | undefined;
  hidden?: boolean;
  isValid?: boolean | undefined;
  handleChangeField?: (event: any) => void;
}

const STYLE = {
  textOverflow: "ellipsis",
};

const InputBox: React.FC<InputBoxProps> = ({
  name,
  isPassword = false,
  value,
  readOnly = false,
  placeholder,
  prefix,
  postfix,
  hidden = false,
  isValid,
  style,
  handleChangeField,
}: InputBoxProps) => {
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
              name={name}
              type={(isPassword && "password") || ""}
              readOnly={readOnly}
              placeholder={placeholder}
              value={value}
              isValid={isValid}
              isInvalid={isValid !== undefined ? !isValid : false}
              onChange={handleChange}
              style={STYLE}
            />
            {postfix && <InputGroup.Text>{postfix}</InputGroup.Text>}
          </InputGroup>
        </OverlayTrigger>
      )}
    </>
  );
};

export default React.memo(InputBox);
