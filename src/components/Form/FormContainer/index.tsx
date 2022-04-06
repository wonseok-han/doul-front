import FormRowContainer from "components/Form/FormRowContainer";
import React from "react";

export interface FormContainerProps {
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

const FormContainer: React.FC<FormContainerProps> = ({
  meta,
  data,
  column = 4,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  handleChangeField,
}: FormContainerProps) => {
  const rowMeta = new Array(Math.ceil(meta.length / column))
    .fill(0)
    .map((item, index) => {
      const metaData = [...meta];
      return metaData.splice(column * index, column);
    });

  return (
    <>
      {rowMeta.length > 0 &&
        rowMeta.map((item, index) => (
          <FormRowContainer
            key={`form-row-container-${index}`}
            meta={item}
            data={data}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={column || xl}
            xxl={column || xxl}
            handleChangeField={handleChangeField}
          />
        ))}
    </>
  );
};

export default React.memo(FormContainer);
