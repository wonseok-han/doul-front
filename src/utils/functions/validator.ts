import { FieldMetaProps } from "utils/types/pages";

import { isNull } from "./data";

export const checkValidate = (
  meta: FieldMetaProps,
  value: string | number | boolean
): {
  invalid: string;
  message: string;
} => {
  const { type, widgetType, falseValue, choices, label, rules } = meta;

  let invalid = "";
  let message = "";

  if (!rules) {
    invalid = "rules";
    message = `입력된 "rules"이 없습니다.`;
  } else {
    const required = rules?.required;

    // 필수값 체크
    if (required) {
      // 체크박스
      if (type === "select" && widgetType === "check") {
        if (
          value === falseValue ||
          isNull(value) ||
          (isNull(falseValue) && choices && choices[1]?.code === value)
        ) {
          return {
            invalid: "required",
            message: `"${label}" 항목은 필수입력입니다.`,
          };
        }
      } else {
        if (isNull(value)) {
          return {
            invalid: "required",
            message: `"${label}" 항목은 필수입력입니다.`,
          };
        }
      }
    }

    // 문자열
    if (type === "string") {
      const maxLength = rules?.maxLength || 0;
      const minLength = rules?.minLength || 0;

      if (typeof value !== "string") {
        return {
          invalid: "not string",
          message: `"${label}" 항목은 문자열만 입력가능합니다.`,
        };
      }

      // 최대길이
      if (!isNull(rules?.maxLength) && value.toString().length > maxLength) {
        return {
          invalid: "maxLength",
          message: `"${label}" 항목의 최대 길이는 ${maxLength}입니다.`,
        };
      }
      // 최소길이
      else if (
        !isNull(rules?.minLength) &&
        value.toString().length < minLength
      ) {
        return {
          invalid: "minLength",
          message: `"${label}" 항목의 최소 길이는 ${minLength}입니다.`,
        };
      }
      // 정규식
      else if (!isNull(rules?.regex)) {
        const regex = rules?.regex?.pattern || "";
        const message = rules.regex?.message || "";

        const pattern = new RegExp(regex, "g");
        if (!pattern.test(value.toString())) {
          return {
            invalid: "regex",
            message: `${message}`,
          };
        }
      }
    }
    // 숫자
    else if (type === "number") {
      const max = rules?.max || 0;
      const min = rules?.min || 0;

      if (isNaN(Number(value))) {
        return {
          invalid: "not number",
          message: `"${label}" 항목은 숫자만 입력가능합니다.`,
        };
      }

      // 최대길이
      if (!isNull(rules?.max) && value > max) {
        return {
          invalid: "max",
          message: `"${label}" 항목의 최대값은 ${max}입니다.`,
        };
      }
      // 최소길이
      else if (!isNull(rules?.min) && value < min) {
        return {
          invalid: "min",
          message: `"${label}" 항목의 최소값은 ${min}입니다.`,
        };
      }
      // 정규식
      else if (!isNull(rules?.regex)) {
        const regex = rules?.regex?.pattern || "";
        const message = rules.regex?.message || "";

        const pattern = new RegExp(regex, "g");
        if (!pattern.test(value.toString())) {
          return {
            invalid: "regex",
            message: `${message}`,
          };
        }
      }
    }
    // 날짜
    else if (type === "date") {
      const max = typeof rules?.max === "string" && new Date(rules?.max);
      const min = typeof rules?.min === "string" && new Date(rules?.min);
      const valueDate = typeof value === "string" && new Date(value);

      // 최대길이
      if (!isNull(rules?.max) && valueDate > max) {
        return {
          invalid: "max",
          message: `"${label}" 항목의 최대 일정은 ${rules?.max}입니다.`,
        };
      }
      // 최소길이
      else if (!isNull(rules?.min) && valueDate < min) {
        return {
          invalid: "min",
          message: `"${label}" 항목의 최소 일정은 ${rules?.min}입니다.`,
        };
      }
    }
  }

  return {
    invalid,
    message,
  };
};
