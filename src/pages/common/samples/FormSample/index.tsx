import FormContainer from "components/Form/FormContainer";
import FormRowContainer from "components/Form/FormRowContainer";
import React from "react";
import useFieldValues from "utils/hooks/useFieldValues";
import { PageProps } from "utils/types";

import { META } from "./meta";

const DATA = {
  string: "",
  number: 2,
  date: "2022-03-25",
  textarea: "4",
  select: "",
  radio: "",
  check: "",
};

const FormSample: React.FC<PageProps> = ({ info }: PageProps) => {
  const [fieldValues, handleChangeField] = useFieldValues(DATA);

  !info && console.log(info);

  return (
    <>
      {JSON.stringify(fieldValues)}
      <h4>FormContainer</h4>
      <FormContainer
        meta={META}
        data={fieldValues}
        column={3}
        handleChangeField={handleChangeField}
      />
      <br />
      <h4>FormRowContainer</h4>
      <FormRowContainer
        meta={META}
        data={fieldValues}
        handleChangeField={handleChangeField}
      />
    </>
  );
};

export default React.memo(FormSample);
