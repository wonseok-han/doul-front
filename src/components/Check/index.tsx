import React, { useEffect, useState } from "react";
import FormCheckInput, {
  FormCheckInputProps,
} from "react-bootstrap/esm/FormCheckInput";

export interface CheckProps extends FormCheckInputProps {
  /** 컴포넌트명 */
  name: string;
  /** 값 리스트 */
  choices: Array<{
    code: string;
    name: string;
  }>;
  defaultChecked?: boolean;
  /** 체크될 때의 값 */
  trueValue?: string | boolean;
  /** 체크되지 않을 때의 값 */
  falseValue?: string | boolean;
  /** Form Data 값 변경 */
  handleChangeField?: (value: any) => void;
}
const Check: React.FC<CheckProps> = ({
  name,
  defaultChecked = false,
  choices = [],
  value,
  trueValue = choices?.length > 0 ? choices[0].code : true,
  falseValue = choices?.length > 1 ? choices[1].code : false,
  isValid,
  handleChangeField,
}: CheckProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  // NOTE: 체크 값 변경 이벤트
  const handleChange = (event: any) => {
    const {
      target: { checked },
    } = event;
    setIsChecked(checked);

    const fieldValue = {
      target: {
        name,
        value: checked ? trueValue : falseValue,
      },
    };
    handleChangeField?.(fieldValue);
  };

  useEffect(() => {
    setIsChecked(value === trueValue ? true : false);
  }, [value]);

  return (
    <>
      <FormCheckInput
        name={name}
        checked={isChecked}
        value={value}
        isValid={isValid}
        isInvalid={isValid !== undefined ? !isValid : false}
        onChange={handleChange}
      />
      {choices.find((item) => item.code === value)?.name}
    </>
  );
};

export default React.memo(Check);
