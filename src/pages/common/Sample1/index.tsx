import FormContainer from "components/Form/FormContainer";
import FormRowContainer from "components/Form/FormRowContainer";
import React from "react";
import { PageProps } from "utils/types";

// 메타속성
const meta = [
  {
    name: "test",
    type: "string",
    widgetType: "string",
    label: "TEST",
    // choices: [{}],
    readOnly: true,
    disabled: true,
    textAlign: "center",
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
    readOnly: true,
    disabled: true,
    textAlign: "center",
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
    readOnly: true,
    disabled: true,
    textAlign: "center",
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
    readOnly: true,
    disabled: true,
    textAlign: "center",
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
    readOnly: true,
    disabled: true,
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
    readOnly: true,
    disabled: true,
    textAlign: "center",
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
      regex: "",
    },
  },
];

const Sample1: React.FC<PageProps> = ({ info }: PageProps) => {
  !info && console.log(info);
  return (
    <>
      <FormContainer meta={meta} lg={"3"} xl={"3"} xxl={"3"} />
      <FormRowContainer meta={meta} />
    </>
  );
};

export default React.memo(Sample1);
