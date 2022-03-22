import OverlayTrigger from "components/OverlayTrigger";
import RenderIndicator from "components/RenderIndicator";
import React, { useState } from "react";
import { FormCheck, FormCheckProps } from "react-bootstrap";
import { renderTooltip } from "utils/tooltip/Tooltip";

export interface RadioProps extends FormCheckProps {
  /** 컴포넌트명 */
  name: string;
  /** 값 리스트 */
  choices: Array<{
    code: string;
    name: string;
  }>;
  /** Form Data 값 변경 */
  handleChangeField?: (value: any) => void;
}

const Radio: React.FC<RadioProps> = ({
  name,
  choices = [],
  value,
  inline = true,
  disabled = false,
  isValid,
  style,
  handleChangeField,
}: RadioProps) => {
  const [selected, setSelected] = useState(value);

  // NOTE: 선택 값 변경 이벤트
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;

    setSelected(value);

    const fieldValue = {
      target: {
        name: name,
        value: value,
      },
    };
    handleChangeField?.(fieldValue);
  };

  return (
    <div
      style={{
        ...style,
        display: "inline-block",
        height: "100%",
        verticalAlign: "sub",
      }}
    >
      <RenderIndicator />
      <OverlayTrigger
        render={renderTooltip}
        renderChildren={choices.find((item) => item.code === value)?.name}
      >
        <div>
          {choices.map((item) => (
            <FormCheck
              inline={inline}
              key={`radio-${item.code}`}
              id={`radio-${item.code}`}
              type={"radio"}
            >
              <FormCheck.Input
                type={"radio"}
                checked={selected === item.code}
                value={item.code}
                disabled={disabled}
                isValid={isValid}
                isInvalid={isValid !== undefined ? !isValid : false}
                onChange={handleChange}
              />
              <FormCheck.Label>{item.name}</FormCheck.Label>
            </FormCheck>
          ))}
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default React.memo(Radio);
