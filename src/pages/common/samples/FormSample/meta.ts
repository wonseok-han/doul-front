import { FieldMetaProps } from "utils/types/pages";

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
export const META: Array<FieldMetaProps> = [
  {
    name: "string",
    type: "string",
    widgetType: "string",
    label: "일반문자",
    required: true,
    rules: {
      required: true,
      maxLength: 2,
      minLength: 1,
    },
  },
  {
    name: "number",
    type: "number",
    label: "일반숫자",
    required: true,
    rules: {
      required: true,
      max: 10,
      min: 1,
    },
  },
  {
    name: "date",
    type: "date",
    widgetType: "date",
    label: "날짜",
    required: true,
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
    },
  },
  {
    name: "textarea",
    type: "string",
    widgetType: "textarea",
    label: "TextArea",
    required: true,
    rules: {
      required: true,
      maxLength: 10,
    },
  },
  {
    name: "select",
    type: "select",
    label: "Default Select",
    choices: POSITION_ITEMS,
    textAlign: "center",
    required: true,
    selectOption: "choose",
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
    },
  },
  {
    name: "radio",
    type: "select",
    widgetType: "radio",
    label: "라디오",
    choices: LOCATION_ITEMS,
    textAlign: "center",
    required: true,
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
    },
  },
  {
    name: "check",
    type: "select",
    widgetType: "check",
    label: "체크",
    choices: USE_YN_ITEMS,
    textAlign: "center",
    required: true,
    rules: {
      required: true,
      maxLength: 0,
      minLength: 0,
    },
  },
];
