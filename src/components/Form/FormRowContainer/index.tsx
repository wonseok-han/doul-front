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
   * < 576px
   */
  xs?: "1" | "2" | "3" | "4";
  /**
   * >= 576px
   */
  sm?: "1" | "2" | "3" | "4";
  /**
   * >= 768px
   */
  md?: "1" | "2" | "3" | "4";
  /**
   * >= 992px
   */
  lg?: "1" | "2" | "3" | "4";
  /**
   * >= 1200px
   */
  xl?: "1" | "2" | "3" | "4";
  /**
   * >= 1400px
   */
  xxl?: "1" | "2" | "3" | "4";
}

const FormRowContainer: React.FC<FormRowContainerProps> = ({
  meta,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}: FormRowContainerProps) => {
  return (
    <FormRow xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl}>
      {meta.map((item: any, index: number) => (
        <FormField
          key={`form-${index}`}
          type={item.type}
          widgetType={item.widgetType}
          choices={item.choices}
          label={item.label}
          name={item.name}
          value={""}
          readonly={item.readOnly}
          disabled={item.disabled}
          textAlign={item.textAlign}
          rules={item.rules}
          handleChangeField={(event) => console.log(event)}
        />
      ))}
    </FormRow>
  );
};

export default React.memo(FormRowContainer);
