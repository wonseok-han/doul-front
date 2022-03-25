import Col from "components/Col";
import Label from "components/Label";
import React from "react";
import { FormGroup, Row } from "react-bootstrap";

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
  name?: string;
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
  readonly?: boolean;
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
   * 필드 유효성검사 Rule
   */
  rules?: any;
  /**
   * 필드 정렬
   */
  textAlign?: "left" | "right" | "center";
  /**
   * 필드 Change Event
   */
  handleChangeField: (event: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  widgetType,
  label,
  required = false,
  hidden = false,
  labelHidden = false,
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
            {type === "string" ? (
              // Masking 문자
              widgetType === "mask" ? (
                <div>string-mask</div>
              ) : // TextArea 문자
              widgetType === "textarea" ? (
                <div>string-textarea</div>
              ) : (
                // 일반 문자
                <div>string</div>
              )
            ) : // 숫자 타입
            type === "number" ? (
              // Masking 숫자
              widgetType === "mask" ? (
                <div>number-mask</div>
              ) : (
                // 일반 숫자
                <div>number</div>
              ) // Boolean 타입
            ) : // 날짜 타입
            type === "date" ? (
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
              ) // 선택 타입
            ) : // Radio 선택 타입
            widgetType === "radio" ? (
              <div>select-radio</div>
            ) : // Check 선택 타입
            widgetType === "check" ? (
              <div>select-check</div>
            ) : (
              // 일반 선택 타입
              <div>select</div>
            )}
          </Col>
        </FormGroup>
      )}
    </>
  );
};

export default React.memo(FormField);
