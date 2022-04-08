import classNames from "classnames";
import OverlayTrigger from "components/OverlayTrigger";
import RenderIndicator from "components/RenderIndicator";
import React, { useEffect, useState } from "react";
import { FormCheck, FormCheckProps } from "react-bootstrap";
import { useThemeContext } from "utils/context";
import { makeGuid } from "utils/functions/common";
import { renderTooltip } from "utils/tooltip/Tooltip";
import { ChoiceProps, ValidateProps } from "utils/types/pages";

export interface RadioProps extends FormCheckProps {
  /**
   * 컴포넌트명
   */
  name: string;
  /**
   *  값 리스트
   */
  choices: Array<ChoiceProps>;
  /**
   * 없음값 추가
   */
  none?: boolean;
  /**
   * 유효성 검사 결과값
   */
  validate?: ValidateProps;
  /**
   * Form Data 값 변경
   */
  handleChangeField?: (value: any) => void;
}

const Radio: React.FC<RadioProps> = ({
  name,
  choices = [],
  value,
  inline = true, // 항목의 수평(true), 수직(false) 배치
  disabled = false,
  none = true,
  isValid,
  style,
  validate,
  handleChangeField,
}: RadioProps) => {
  const [selected, setSelected] = useState(value);
  const itemList = none ? [{ code: "", name: "없음" }, ...choices] : choices;
  const { store: themeStore } = useThemeContext();

  useEffect(() => {
    setSelected(value);
  }, [value]);

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
        renderChildren={
          validate?.message ||
          itemList.find((item) => item.code === value)?.name
        }
        invalid={validate?.invalid}
      >
        <div>
          {itemList.map((item) => (
            <FormCheck
              inline={inline}
              key={`radio-${item.code}`}
              name={name}
              id={`${makeGuid()}`}
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
              <FormCheck.Label
                className={classNames("check-label", {
                  darkMode: themeStore?.darkMode,
                })}
              >
                {item.name}
              </FormCheck.Label>
            </FormCheck>
          ))}
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default React.memo(Radio);
