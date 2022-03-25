import FormRowContainer from "components/Form/FormRowContainer";
import React from "react";
import { Form } from "react-bootstrap";

export interface FormContainerProps {
  /**
   * Form을 구성할 메타데이터
   */
  // TODO: meta 타입 구체화하기
  meta: Array<any>;
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
  //    handleChangeField: (event: any) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  meta,
  column = 4,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}: FormContainerProps) => {
  const rowMeta = new Array(Math.round(meta.length / column))
    .fill(0)
    .map((item, index) => {
      const metaData = [...meta];
      return metaData.splice(column * index, column);
    });

  return (
    <Form>
      {rowMeta.length > 0 &&
        rowMeta.map((item, index) => (
          <FormRowContainer
            key={`form-row-container-${index}`}
            meta={item}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            xxl={xxl}
          />
        ))}
    </Form>
  );
};

export default React.memo(FormContainer);
