// import "react-datepicker/dist/react-datepicker.css";

import "./styles.scss";

import classNames from "classnames";
import OverlayTrigger from "components/OverlayTrigger";
import RenderIndicator from "components/RenderIndicator";
import Select from "components/Select";
import { getMonth, getYear } from "date-fns";
import { ko } from "date-fns/esm/locale";
import _ from "lodash";
import React, { forwardRef, useState } from "react";
import { FormControl } from "react-bootstrap";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { useThemeContext } from "utils/context";
import { isWeekDay, parseDateToString } from "utils/functions/date";
import { renderTooltip } from "utils/tooltip/Tooltip";
import { ValidateProps } from "utils/types/pages";

export interface DatePickerProps {
  /**
   * 컴포넌트명
   */
  name: string;
  /**
   *  타입
   * 'date' | 'year' | 'yearMonth' | 'datetime'
   */
  type?: "date" | "year" | "yearMonth" | "datetime";
  /**
   *  값
   */
  value?: string;
  /**
   *  비활성화여부
   */
  disabled?: boolean;
  /**
   *  ReadOnly 여부
   */
  readOnly?: boolean;
  /**
   * Date 포맷
   */
  format?: string;
  /**
   * 텍스트 정렬
   */
  textAlign?: "left" | "right" | "center";
  /**
   * 유효성여부
   */
  isValid?: boolean;
  /**
   * 유효성 검사 결과값
   */
  validate?: ValidateProps;
  /**
   *  스타일
   */
  style?: any;
  /**
   * Form Data 값 변경
   */
  handleChangeField?: (value: any) => void;
}

const YEARS = _.map(_.range(1990, new Date().getFullYear() + 2, 1), (item) => ({
  code: `${item}`,
  name: `${item}`,
}));
const MONTHS = _.map(_.range(0, 12, 1), (item) => ({
  code: `${item}`,
  name: `${item + 1}월`,
}));

const DateTimePicker: React.FC<DatePickerProps> = ({
  name,
  type = "date",
  value,
  disabled,
  readOnly,
  format = type === "datetime"
    ? "yyyy-MM-dd HH:mm"
    : type === "yearMonth"
    ? "yyyy-MM"
    : type === "year"
    ? "yyyy"
    : "yyyy-MM-dd",
  textAlign,
  isValid,
  validate,
  style,
  handleChangeField,
}: DatePickerProps) => {
  const { store: themeStore } = useThemeContext();
  const [open, setOpen] = useState(false);

  // TODO: Input 뒤에 Calendar 아이콘 추가
  const CustomInput = forwardRef(({ ...props }: any, ref: any): JSX.Element => {
    return (
      <FormControl
        {...props}
        ref={ref}
        autoFocus={open}
        isValid={isValid}
        isInvalid={isValid !== undefined ? !isValid : false}
        style={{ ...style, textOverflow: "ellipsis", textAlign: textAlign }}
      />
    );
  });
  CustomInput.displayName = "CustomInput";

  // NOTE: Date Value 변경 이벤트
  const handleChange = (changedValue: any) => {
    const fieldValue = {
      target: {
        name,
        value: parseDateToString(changedValue, type),
      },
    };

    handleChangeField?.(fieldValue);
  };

  // NOTE: DatePicker Input Click 이벤트
  const handleInputClick = () => {
    setOpen((previous) => !previous);
  };

  // NOTE: DatePicker Input 바깥 Click 이벤트
  const handleInputOutClick = () => {
    setOpen(false);
  };

  return (
    <>
      <RenderIndicator />

      <OverlayTrigger
        render={renderTooltip}
        renderChildren={validate?.message || value}
        invalid={validate?.invalid}
      >
        <DatePicker
          className={classNames("custom-datepicker-input", {
            darkMode: themeStore?.darkMode,
          })}
          name={name}
          locale={ko}
          showDisabledMonthNavigation
          disabledKeyboardNavigation
          showPopperArrow={false}
          dropdownMode="select"
          dateFormat={format}
          disabled={disabled}
          readOnly={readOnly}
          showTimeInput={type === "datetime"}
          showMonthYearPicker={type === "yearMonth"}
          showYearPicker={type === "year"}
          maxDate={new Date("9999-12-31")}
          selected={
            value && typeof value === "string" ? new Date(value) : undefined
          }
          onChange={handleChange}
          onInputClick={handleInputClick}
          onClickOutside={handleInputOutClick}
          isClearable={true}
          open={open}
          customInput={<CustomInput />}
          dayClassName={(date) => (!isWeekDay(date) ? "custom-week-day" : null)}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
            decreaseYear,
            increaseYear,
            prevYearButtonDisabled,
            nextYearButtonDisabled,
          }: ReactDatePickerCustomHeaderProps) => {
            return (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={decreaseYear}
                  disabled={prevYearButtonDisabled}
                  style={{ border: "0px", backgroundColor: "#353535" }}
                >
                  <FaAngleDoubleLeft size={15} color={"white"} />
                </button>
                {type !== "year" && (
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    style={{ border: "0px", backgroundColor: "#353535" }}
                  >
                    <FaAngleLeft size={15} color={"white"} />
                  </button>
                )}

                <Select
                  name={"datepicker_year"}
                  value={`${getYear(date)}`}
                  choices={YEARS}
                  handleChangeField={({ target: { value } }) => {
                    changeYear(Number(value));
                  }}
                  style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    width: "90px",
                  }}
                />
                {type != "year" && (
                  <Select
                    name={"datepicker_month"}
                    value={
                      MONTHS.find((item: any) => item.code == getMonth(date))
                        ?.code
                    }
                    choices={MONTHS}
                    handleChangeField={({ target: { value } }) => {
                      changeMonth(Number(value));
                    }}
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      paddingLeft: 2,
                      paddingRight: 2,
                      width: "80px",
                    }}
                  />
                )}

                {type !== "year" && (
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    style={{ border: "0px", backgroundColor: "#353535" }}
                  >
                    <FaAngleRight size={15} color={"white"} />
                  </button>
                )}
                <button
                  onClick={increaseYear}
                  disabled={nextYearButtonDisabled}
                  style={{ border: "0px", backgroundColor: "#353535" }}
                >
                  <FaAngleDoubleRight size={15} color={"white"} />
                </button>
              </div>
            );
          }}
        />
      </OverlayTrigger>
    </>
  );
};

export default React.memo(DateTimePicker);
