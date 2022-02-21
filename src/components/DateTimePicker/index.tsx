import "react-datepicker/dist/react-datepicker.css";

import Select from "components/Select";
import { ko } from "date-fns/esm/locale";
import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

export interface DatePickerProps {
  /** 컴포넌트명 */
  name: string;
  /** 타입
   * 'date' | 'year' | 'yearMonth' | 'datetime'
   */
  type?: "date" | "year" | "yearMonth" | "datetime";
  /** Default값 */
  defaultValue?: string | Date;
  /** 값 */
  value?: string;
  /** 비활성화여부 */
  disabled?: boolean;
  /** ReadOnly 여부 */
  readOnly?: boolean;
  /** Date 포맷 */
  format?: string;
  /** 유효성여부 */
  isValid?: boolean;
  /** Form Data 값 변경 */
  handleChangeFiledValues?: (value: any) => void;
}

const range = (start: number, end: number, value: number) => {
  return new Array(end - start)
    .fill(0)
    .reduce(
      (previous, current, index) => [
        ...previous,
        {
          code: previous[index].code + value,
          name: previous[index].name + value,
        },
      ],
      [{ code: start, name: start }]
    )
    .map((item: any) => ({ code: String(item.code), name: String(item.name) }));
};

const YEARS = range(1990, new Date().getFullYear() + 1, 1);
const MONTHS = new Array(12).fill(0).map((item, index) => {
  return { code: String(index), name: index + 1 + "월" };
});

const DateTimePicker: React.FC<DatePickerProps> = ({
  name,
  type = "date",
  defaultValue,
  value,
  disabled,
  readOnly,
  format = type === "datetime"
    ? "yyyy-MM-dd hh:mm"
    : type === "yearMonth"
    ? "yyyy-MM"
    : type === "year"
    ? "yyyy"
    : "yyyy-MM-dd",
  isValid,
  handleChangeFiledValues,
}: DatePickerProps) => {
  const [parseValue, setParseValue] = useState<Date>();
  const [dateValue, setDateValue] = useState(value);
  // const [show, setShow] = useState(false);

  // const handleOverlayShow = () => {
  //   setShow((previous) => !previous);
  // };
  useEffect(() => {
    if (value) {
      if (typeof value == "string") {
        setParseValue(new Date(value));
      } else {
        setParseValue(value);
      }
    } else if (defaultValue) {
      if (typeof defaultValue == "string") {
        setParseValue(new Date(defaultValue));
      } else {
        setParseValue(defaultValue);
      }
    }
  }, [defaultValue, value]);

  // NOTE: Date -> String 변환 함수
  const parseDateToString = (dateValue: Date) => {
    if (dateValue) {
      const year = dateValue.getFullYear();
      const month = dateValue.getMonth() + 1;
      const date = dateValue.getDate();
      const hour = dateValue.getHours();
      const minute = dateValue.getMinutes();

      const stringValue =
        type === "datetime"
          ? `${year}-${month >= 10 ? month : "0" + month}-${
              date >= 10 ? date : "0" + date
            } ${hour >= 10 ? hour : "0" + hour}:${
              minute >= 10 ? minute : "0" + minute
            }`
          : type === "yearMonth"
          ? `${year}-${month >= 10 ? month : "0" + month}`
          : type === "year"
          ? `${year}`
          : `${year}-${month >= 10 ? month : "0" + month}-${
              date >= 10 ? date : "0" + date
            }`;

      return stringValue;
    }
  };

  // NOTE: Date Value 변경 이벤트
  const handleChange = (changedValue: any) => {
    if (changedValue) {
      const parsedDateValue = parseDateToString(changedValue);
      setDateValue(parsedDateValue);

      const fieldValue = {
        target: {
          name,
          value: parsedDateValue,
        },
      };
      handleChangeFiledValues?.(fieldValue);
    } else {
      setDateValue((previous) => previous);
    }
  };

  useEffect(() => {
    if (dateValue) setParseValue(new Date(dateValue));
    else setParseValue((previous) => previous);
  }, [dateValue]);

  return (
    <>
      <DatePicker
        name={name}
        locale={ko}
        showYearDropdown
        showMonthDropdown
        showPopperArrow={false}
        dropdownMode="select"
        dateFormat={format}
        disabled={disabled}
        readOnly={readOnly}
        showTimeInput={type === "datetime"}
        showMonthYearPicker={type === "yearMonth"}
        showYearPicker={type === "year"}
        value={dateValue}
        selected={parseValue}
        onChange={handleChange}
        customInput={
          <FormControl
            isValid={isValid}
            isInvalid={isValid !== undefined ? !isValid : false}
          />
        }
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          customHeaderCount,
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
                style={{ border: "0px" }}
              >
                <FaAngleDoubleLeft size={15} />
              </button>
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                style={{ border: "0px" }}
              >
                <FaAngleLeft size={15} />
              </button>
              <Select
                value={YEARS.filter(
                  (item: any) => item.code == date.getFullYear()
                ).map((item: any) => item.code)}
                items={YEARS}
                onChange={({ target: { value } }) => {
                  changeYear(Number(value));
                }}
                style={{
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              />
              <Select
                value={MONTHS.filter(
                  (item: any) => item.code == date.getMonth()
                ).map((item: any) => item.code)}
                items={MONTHS}
                onChange={({ target: { value } }) => changeMonth(Number(value))}
                style={{
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              />

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                style={{ border: "0px" }}
              >
                <FaAngleRight size={15} />
              </button>
              <button
                onClick={increaseYear}
                disabled={nextYearButtonDisabled}
                style={{ border: "0px" }}
              >
                <FaAngleDoubleRight size={15} />
              </button>
            </div>
          );
        }}
      />
      {/* <OverlayTrigger
        show={show}
        placement={"auto-start"}
        overlay={
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ placement, arrowProps, show: _show, popper, ...props }) => {
            return (
              <div
                {...props}
                style={{
                  position: "absolute",
                  ...props.style,
                }}
              >
                
                <FormControl
                  type={type === "datetime" ? "datetime-local" : type}
                  defaultValue={defaultValue}
                  value={value}
                  disabled={disabled}
                  readOnly={readOnly}
                  isValid={isValid}
                  isInvalid={isValid !== undefined ? !isValid : false}
                  onBlur={handleOverlayShow}
                />
              </div>
            );
          }
        }
      >
        <FormControl
          value={value}
          onClick={handleOverlayShow}
          style={{ border: "1px solid black" }}
        />
      </OverlayTrigger> */}
    </>
  );
};

export default React.memo(DateTimePicker);
