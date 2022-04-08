import Check from "components/Check";
import Col from "components/Col";
import DateTimePicker from "components/DateTimePicker";
import InputBox from "components/InputBox";
import Label from "components/Label";
import Radio from "components/Radio";
import Row from "components/Row";
import Select from "components/Select";
import Textarea from "components/Textarea";
import React, { useEffect, useState } from "react";
import { FormGroup } from "react-bootstrap";
import { checkValidate } from "utils/functions/validator";
import { FieldMetaProps, ValidateProps } from "utils/types/pages";

export interface FormFieldProps extends FieldMetaProps {
  /**
   * Field Meta 정보
   */
  meta: FieldMetaProps;
  /**
   * 유효성 여부
   */
  isValid?: boolean;
  /**
   * 필드 값
   */
  value: string | number | boolean;
  /**
   * 필드 Change Event
   */
  handleChangeField: (event: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  meta,
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
  labelStyle,
  style,
  handleKeyDown,
  handleKeyUp,
  handleChangeField,
}: FormFieldProps) => {
  const [validate, setValidate] = useState<ValidateProps>({
    invalid: "",
    message: "",
  });

  useEffect(() => {
    const invalid = checkValidate(meta, value);
    setValidate({
      ...invalid,
    });
  }, [value]);

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
            validate={validate}
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
            validate={validate}
            style={style}
            handleKeyDown={handleKeyDown}
            handleKeyUp={handleKeyUp}
            handleChangeField={handleChangeField}
          />
        );
      }
    }
    // 숫자타입
    else if (
      type === "number" &&
      (typeof value === "number" || typeof value === "string") &&
      !Number.isNaN(value)
    ) {
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
            validate={validate}
            style={style}
            handleChangeField={handleChangeField}
          />
        );
      }
    }
    // 날짜타입
    else if (
      type === "date" &&
      (typeof value === "string" || value == undefined)
    ) {
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
          validate={validate}
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
            validate={validate}
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
            validate={validate}
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
            validate={validate}
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
            <Label sm={"5"} required={required} style={labelStyle}>
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
