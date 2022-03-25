import FormContainer from "components/Form/FormContainer";
import FormRowContainer from "components/Form/FormRowContainer";
import React from "react";
import useFieldValues from "utils/hooks/useFieldValues";
import { PageProps } from "utils/types";

// 메타속성
const META = [
  {
    name: "test",
    type: "string",
    widgetType: "string",
    label: "TEST",
    // choices: [{}],
    readOnly: false,
    disabled: false,
    textAlign: "center",
    required: true,
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
      regex: "",
    },
  },
  {
    name: "test2",
    type: "string",
    widgetType: "string",
    label: "TEST2",
    // choices: [{}],
    readOnly: false,
    disabled: false,
    textAlign: "center",
    required: true,
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
      regex: "",
    },
  },
  {
    name: "test3",
    type: "string",
    widgetType: "string",
    label: "TEST3",
    // choices: [{}],
    readOnly: false,
    disabled: false,
    textAlign: "left",
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
      regex: "",
    },
  },
  {
    name: "test4",
    type: "string",
    widgetType: "string",
    label: "TEST4",
    // choices: [{}],
    readOnly: false,
    disabled: false,
    textAlign: "right",
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
      regex: "",
    },
  },
  {
    name: "test5",
    type: "string",
    widgetType: "string",
    label: "TEST5",
    // choices: [{}],
    readOnly: false,
    disabled: false,
    textAlign: "center",
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
      regex: "",
    },
  },
  {
    name: "test6",
    type: "string",
    widgetType: "string",
    label: "TEST6",
    // choices: [{}],
    readOnly: false,
    disabled: false,
    textAlign: "center",
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
      regex: "",
    },
  },
];

const DATA = {
  test: "1",
  test2: "2",
  test3: "3",
  test4: "4",
  test5: "5",
  test6: "6",
};

const Sample1: React.FC<PageProps> = ({ info }: PageProps) => {
  const [fieldValues, handleChangeField] = useFieldValues(DATA);

  !info && console.log(info);

  return (
    <>
      <h4>FormContainer</h4>
      <FormContainer
        meta={META}
        data={fieldValues}
        lg={"3"}
        xl={"3"}
        xxl={"3"}
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

export default React.memo(Sample1);
