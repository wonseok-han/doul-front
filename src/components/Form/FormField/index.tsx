import Check from "components/Check";
import Col from "components/Col";
import DateTimePicker from "components/DateTimePicker";
import InputBox from "components/InputBox";
import Label from "components/Label";
import Radio from "components/Radio";
import Row from "components/Row";
import Select from "components/Select";
import Textarea from "components/Textarea";
import React from "react";
import { FormGroup } from "react-bootstrap";

export interface FormMetaProps {
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
   * 라벨
   */
  label?: string;
  /**
   * 필드명
   */
  name: string;
  /**
   * 필드 초기값
   */
  defaultValue?: string | number | Date | boolean;
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
   * date 타입일 경우 date format
   */
  format?: string;
  /**
   * type이 select일 때 항목 리스트
   */
  choices?: Array<{
    code: string;
    name: string;
  }>;
  /**
   * type이 select일 때 '선택'/'전체' 옵션
   */
  selectOption?: "choose" | "all";
  /**
   * type이 select일 때 다중선택 여부
   */
  multiple?: boolean;
  /**
   * type이 select일 때 dropdown display 개수
   */
  displaySize?: number;
  /**
   * type이 select, widgetType이 radio일 때 항목의 수평(true), 수직(false) 배치
   */
  inline?: boolean;
  /**
   * 체크될 때의 값
   */
  trueValue?: string | boolean;
  /**
   *  체크되지 않을 때의 값
   */
  falseValue?: string | boolean;
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
}
export interface FormFieldProps extends FormMetaProps {
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
  defaultValue,
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
  format,
  choices = [],
  selectOption,
  multiple,
  displaySize,
  inline,
  trueValue,
  falseValue,
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
  // NOTE: type 속성값에 따른 Field 컴포넌트
  const FieldComponent = () => {
    // 문자타입
    if (type === "string" && typeof value === "string") {
      // Masking 문자
      // TODO: mask 속성을 가진 컴포넌트 추가
      if (widgetType === "mask") {
        return <div>string-mask</div>;
      }
      // TextArea 문자
      else if (widgetType === "textarea") {
        return (
          <Textarea
            name={name}
            value={value}
            readOnly={readOnly}
            disabled={disabled}
            placeholder={placeholder}
            isValid={isValid}
            style={style}
            handleChangeField={handleChangeField}
          />
        );
      }
      // Default 문자
      else {
        return (
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
        );
      }
    }
    // 숫자타입
    else if (type === "number" && typeof value === "number") {
      // Masking 숫자
      // TODO: mask 속성을 가진 컴포넌트 추가
      if (widgetType === "mask") {
        return <div>number-mask</div>;
      }
      // Default 숫자
      else {
        return (
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
        );
      }
    }
    // 날짜타입
    else if (type === "date" && typeof value === "string") {
      const dateType =
        widgetType === "year" ||
        widgetType === "yearMonth" ||
        widgetType === "datetime"
          ? widgetType
          : type;

      return (
        <DateTimePicker
          name={name}
          type={dateType}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          format={format}
          isValid={isValid}
          textAlign={textAlign}
          style={style}
          handleChangeField={handleChangeField}
        />
      );
    }
    // 선택타입
    else if (
      type === "select" &&
      typeof value === "string" &&
      choices?.length > 0
    ) {
      // Radio 선택타입
      if (widgetType === "radio") {
        return (
          <Radio
            name={name}
            value={value}
            choices={choices}
            inline={inline}
            disabled={disabled}
            isValid={isValid}
            style={{ marginLeft: 10, ...style }}
            handleChangeField={handleChangeField}
          />
        );
      }
      // Check 선택타입
      else if (widgetType === "check") {
        return (
          <Check
            name={name}
            value={value}
            choices={choices}
            trueValue={trueValue}
            falseValue={falseValue}
            disabled={disabled}
            isValid={isValid}
            style={{ marginLeft: 10, ...style }}
            handleChangeField={handleChangeField}
          />
        );
      }
      // Default 선택타입
      else {
        return (
          <Select
            name={name}
            value={value}
            choices={choices}
            defaultValue={
              typeof defaultValue === "string" ? defaultValue : undefined
            }
            selectOption={selectOption}
            multiple={multiple}
            displaySize={displaySize}
            readOnly={readOnly}
            disabled={disabled}
            textAlign={textAlign}
            handleChangeField={handleChangeField}
          />
        );
      }
    }
    // undefined
    else {
      <div>type is undefined</div>;
    }
  };

  return (
    <>
      {!hidden && (
        <FormGroup as={Row}>
          {!labelHidden && (
            <Label sm={"5"} required={required}>
              {label}
            </Label>
          )}
          <Col sm={"7"}>{FieldComponent()}</Col>
        </FormGroup>
      )}
    </>
  );
};

export default React.memo(FormField);
