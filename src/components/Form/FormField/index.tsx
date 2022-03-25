import Col from "components/Col";
import InputBox from "components/InputBox";
import Label from "components/Label";
import Row from "components/Row";
import React from "react";
import { FormGroup } from "react-bootstrap";

export interface FormFieldProps {
  /**
   * Field 타입
   */
  type: "string" | "number" | "date" | "select";
  /**
   * 위젯 타입
   */
  widgetType?:
    | "mask"
    | "textarea"
    | "date"
    | "year"
    | "yearMonth"
    | "datetime"
    | "select"
    | "radio"
    | "check";
  /**
   * select, radio
   */
  choices?: Array<any>;
  /**
   * 라벨
   */
  label?: string;
  /**
   * 필드명
   */
  name: string;
  /**
   * 필드 값
   */
  value: string | number | Date | boolean;
  /**
   * 필수값 여부
   */
  required?: boolean;
  /**
   * ReadOnly 여부
   */
  readOnly?: boolean;
  /**
   * Disable 여부
   */
  disabled?: boolean;
  /**
   * Hidden 여부
   */
  hidden?: boolean;
  /**
   * Label Hidden 여부
   */
  labelHidden?: boolean;
  /**
   * InputBox에 사용되는 password 사용여부
   */
  isPassword?: boolean;
  /**
   * InputBox에 사용되는 placeholder
   */
  placeholder?: string;
  /**
   * Field 앞쪽에 위치할 String
   */
  prefix?: string;
  /**
   * Field 뒤쪽에 위치할 String
   */
  postfix?: string;
  /**
   * 필드 유효성검사 Rule
   */
  rules?: any;
  /**
   * 필드 정렬
   */
  textAlign?: "left" | "right" | "center";
  /**
   * 유효성 여부
   */
  isValid?: boolean;
  /**
   * Filed별 Style
   */
  style?: any;
  /**
   * 필드 Change Event
   */
  handleChangeField: (event: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  widgetType,
  label,
  name,
  value,
  required = false,
  readOnly = false,
  disabled = false,
  hidden = false,
  labelHidden = false,
  isPassword = false,
  placeholder,
  prefix,
  postfix,
  textAlign = type === "string"
    ? "left"
    : type === "number"
    ? "right"
    : type === "date"
    ? "center"
    : "left",
  isValid,
  style,
  handleChangeField,
}: FormFieldProps) => {
  return (
    <>
      {!hidden && (
        <FormGroup as={Row}>
          {!labelHidden && (
            <Label sm={"5"} required={required}>
              {label}
            </Label>
          )}
          <Col sm={"7"}>
            {/* 문자 타입 */}
            {type === "string" && typeof value === "string" ? (
              // Masking 문자
              // TODO: mask 속성을 가진 컴포넌트 추가
              widgetType === "mask" ? (
                <div>string-mask</div>
              ) : // TextArea 문자
              widgetType === "textarea" ? (
                <div>string-textarea</div>
              ) : (
                // 일반 문자
                <InputBox
                  type={type}
                  name={name}
                  value={value}
                  isPassword={isPassword}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  disabled={disabled}
                  isValid={isValid}
                  prefix={prefix}
                  postfix={postfix}
                  textAlign={textAlign}
                  style={style}
                  handleChangeField={handleChangeField}
                />
              )
            ) : // 숫자 타입
            (type === "number" && typeof value === "number") ||
              typeof value === "string" ? (
              // Masking 숫자
              // TODO: mask 속성을 가진 컴포넌트 추가
              widgetType === "mask" ? (
                <div>number-mask</div>
              ) : (
                // 일반 숫자
                <InputBox
                  type={type}
                  name={name}
                  value={value}
                  isPassword={isPassword}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  disabled={disabled}
                  isValid={isValid}
                  prefix={prefix}
                  postfix={postfix}
                  textAlign={textAlign}
                  style={style}
                  handleChangeField={handleChangeField}
                />
              ) // Boolean 타입
            ) : // 날짜 타입
            type === "date" && typeof value === "string" ? (
              // 년도 타입
              widgetType === "year" ? (
                <div>date-year</div>
              ) : // 년월 타입
              widgetType === "yearMonth" ? (
                <div>date-yearMonth</div>
              ) : // 일시 타입
              widgetType === "datetime" ? (
                <div>date-datetime</div>
              ) : (
                // 일반 날짜 타입
                <div>date</div>
              )
            ) : // 선택 타입
            type === "select" && typeof value === "string" ? (
              // Radio 선택 타입
              widgetType === "radio" ? (
                <div>select-radio</div>
              ) : // Check 선택 타입
              widgetType === "check" ? (
                <div>select-check</div>
              ) : (
                // 일반 선택 타입
                <div>select</div>
              )
            ) : (
              <div>type is undefined</div>
            )}
          </Col>
        </FormGroup>
      )}
    </>
  );
};

export default React.memo(FormField);
