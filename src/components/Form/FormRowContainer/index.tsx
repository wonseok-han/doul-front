import FormField from "components/Form/FormField";
import FormRow from "components/Form/FormRow";
import React from "react";
import { FieldMetaProps } from "utils/types/pages";

export interface FormRowContainerProps {
  /**
   * Field Meta 정보
   */
  meta: Array<FieldMetaProps>;
  /**
   * meta data를 통해 만들어진 Form의 데이터
   */
  data?: any;
  /**
   * Form을 구성하는 1개 Row에 들어갈 Column 개수
   */
  column?: 1 | 2 | 3 | 4;
  /**
   * < 576px
   */
  xs?: "1" | "2" | "3" | "4" | 1 | 2 | 3 | 4;
  /**
   * >= 576px
   */
  sm?: "1" | "2" | "3" | "4" | 1 | 2 | 3 | 4;
  /**
   * >= 768px
   */
  md?: "1" | "2" | "3" | "4" | 1 | 2 | 3 | 4;
  /**
   * >= 992px
   */
  lg?: "1" | "2" | "3" | "4" | 1 | 2 | 3 | 4;
  /**
   * >= 1200px
   */
  xl?: "1" | "2" | "3" | "4" | 1 | 2 | 3 | 4;
  /**
   * >= 1400px
   */
  xxl?: "1" | "2" | "3" | "4" | 1 | 2 | 3 | 4;
  /**
   * 필드 Change Event
   */
  handleChangeField: (event: any) => void;
}

const FormRowContainer: React.FC<FormRowContainerProps> = ({
  meta,
  data,
  column,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  handleChangeField,
}: FormRowContainerProps) => {
  return (
    <FormRow
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={column || xl}
      xxl={column || xxl}
    >
      {meta.map((item: any, index: number) => (
        <FormField
          key={`form-field-${index}`}
          meta={item}
          type={item.type}
          widgetType={item.widgetType}
          label={item.label}
          name={item.name}
          value={data[item.name]}
          required={item.required}
          readOnly={item.readOnly}
          disabled={item.disabled}
          labelHidden={item.labelHidden}
          isPassword={item.isPassword}
          placeholder={item.placeholder}
          textAlign={item.textAlign}
          format={item.format}
          choices={item.choices}
          selectOption={item.selectOption}
          multiple={item.multiple}
          displaySize={item.displaySize}
          inline={item.inline}
          trueValue={item.trueValue}
          falseValue={item.falseValue}
          rules={item.rules}
          labelStyle={item.labelStyle}
          style={item.style}
          handleKeyDown={item.handleKeyDown}
          handleKeyUp={item.handleKeyUp}
          handleChangeField={handleChangeField}
        />
      ))}
    </FormRow>
  );
};

export default React.memo(FormRowContainer);
