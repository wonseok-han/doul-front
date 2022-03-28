import FormContainer from "components/Form/FormContainer";
import FormRowContainer from "components/Form/FormRowContainer";
import React from "react";
import useFieldValues from "utils/hooks/useFieldValues";
import { PageProps } from "utils/types";

const POSITION_ITEMS = [
  {
    code: "00",
    name: "사원",
  },
  {
    code: "01",
    name: "대리",
  },
  {
    code: "02",
    name: "과장",
  },
  {
    code: "03",
    name: "차장",
  },
  {
    code: "04",
    name: "부장",
  },
  {
    code: "05",
    name: "이사",
  },
  {
    code: "06",
    name: "사장",
  },
];

const USE_YN_ITEMS = [
  { code: "Y", name: "사용" },
  { code: "N", name: "미사용" },
];

const LOCATION_ITEMS = [
  {
    code: "00",
    name: "부산",
  },
  {
    code: "01",
    name: "서울",
  },
];

// 메타속성
const META = [
  {
    name: "test",
    type: "string",
    widgetType: "string",
    label: "일반문자",
    // choices: [{}],
    readOnly: false,
    disabled: false,
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
    type: "number",
    widgetType: "string",
    label: "일반숫자",
    // choices: [{}],
    readOnly: false,
    disabled: false,
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
    type: "date",
    widgetType: "date",
    label: "날짜",
    // choices: [{}],
    readOnly: false,
    disabled: false,
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
    widgetType: "textarea",
    label: "TextArea",
    // choices: [{}],
    readOnly: false,
    disabled: false,
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
      regex: "",
    },
  },
  {
    name: "test5",
    type: "select",
    label: "Default Select",
    choices: POSITION_ITEMS,
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
    type: "select",
    widgetType: "radio",
    label: "라디오",
    choices: LOCATION_ITEMS,
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
    name: "test7",
    type: "select",
    widgetType: "check",
    label: "체크",
    choices: USE_YN_ITEMS,
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
  test2: 2,
  test3: "2022-03-25",
  test4: "4",
  test5: "",
  test6: "",
  test7: "",
};

const Sample1: React.FC<PageProps> = ({ info }: PageProps) => {
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

export default React.memo(Sample1);
