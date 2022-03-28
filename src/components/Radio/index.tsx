import classNames from "classnames";
import OverlayTrigger from "components/OverlayTrigger";
import RenderIndicator from "components/RenderIndicator";
import React, { useEffect, useState } from "react";
import { FormCheck, FormCheckProps } from "react-bootstrap";
import { useThemeContext } from "utils/context/Reducer";
import { makeGuid } from "utils/functions/common";
import { renderTooltip } from "utils/tooltip/Tooltip";

export interface RadioProps extends FormCheckProps {
  /**
   * 컴포넌트명
   */
  name: string;
  /**
   *  값 리스트
   */
  choices: Array<{
    code: string;
    name: string;
  }>;
  /**
   * 없음값 추가
   */
  none?: boolean;
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
        renderChildren={itemList.find((item) => item.code === value)?.name}
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
