// import "react-datepicker/dist/react-datepicker.css";

import "./index.scss";

import Select from "components/Select";
import { ko } from "date-fns/esm/locale";
import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
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
  /** 스타일 */
  style?: any;
  /** Form Data 값 변경 */
  handleChangeField?: (value: any) => void;
}

// NOTE: 시작년도, 종료년도, 증가값을 받아 시작년도~종료년도까지의 모든 년도를 Array로 리턴
const getYeaRange = (start: number, end: number, value: number) => {
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

const YEARS = getYeaRange(1990, new Date().getFullYear() + 1, 1);
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
  style,
  handleChangeField,
}: DatePickerProps) => {
  const [parseValue, setParseValue] = useState<Date>();
  const [dateValue, setDateValue] = useState(value);

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
      handleChangeField?.(fieldValue);
    } else {
      setDateValue(undefined);
    }
  };

  useEffect(() => {
    if (value) {
      if (typeof value == "string") {
        setParseValue(new Date(value));
      } else {
        setParseValue(value);
      }
      setDateValue(value);
    } else if (defaultValue) {
      if (typeof defaultValue == "string") {
        setParseValue(new Date(defaultValue));
      } else {
        setParseValue(defaultValue);
      }
      setDateValue(String(defaultValue));
    }
  }, [defaultValue, value]);

  useEffect(() => {
    if (dateValue) {
      setParseValue(new Date(dateValue));
    } else {
      setParseValue(undefined);
    }
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
        maxDate={new Date("9999-12-31")}
        selected={parseValue}
        onChange={handleChange}
        isClearable={true}
        customInput={
          // TODO: Input 뒤에 Calendar 아이콘 추가
          <FormControl
            isValid={isValid}
            isInvalid={isValid !== undefined ? !isValid : false}
            style={style}
          />
        }
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
              {type != "year" && (
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
              {type != "year" && (
                <Select
                  name={"datepicker_month"}
                  value={MONTHS.filter(
                    (item: any) => item.code == date.getMonth()
                  ).map((item: any) => item.code)}
                  items={MONTHS}
                  onChange={({ target: { value } }) =>
                    changeMonth(Number(value))
                  }
                  style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 2,
                    paddingRight: 2,
                  }}
                />
              )}

              {type != "year" && (
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
