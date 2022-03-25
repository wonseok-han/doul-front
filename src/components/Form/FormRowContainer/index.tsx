import FormField from "components/Form/FormField";
import FormRow from "components/Form/FormRow";
import React from "react";

export interface FormRowContainerProps {
  /**
   * Form을 구성할 메타데이터
   */
  // TODO: meta 타입 구체화하기
  meta: Array<any>;
  /**
   * meta data를 통해 만들어진 Form의 데이터
   */
  data?: any;
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
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  handleChangeField,
}: FormRowContainerProps) => {
  return (
    <FormRow xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl}>
      {meta.map((item: any, index: number) => (
        <FormField
          key={`form-field-${index}`}
          type={item.type}
          widgetType={item.widgetType}
          label={item.label}
          name={item.name}
          value={data[item.name]}
          required={item.required}
          readOnly={item.readOnly}
          disabled={item.disabled}
          placeholder={item.placeholder}
          textAlign={item.textAlign}
          format={item.format}
          choices={item.choices}
          selectOption={item.selectOption}
          multiple={item.multiple}
          displaySize={item.displaySize}
          rules={item.rules}
          style={item.style}
          handleChangeField={handleChangeField}
        />
      ))}
    </FormRow>
  );
};

export default React.memo(FormRowContainer);
