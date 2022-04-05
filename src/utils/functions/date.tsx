/**
 * NOTE: 현재일자를 String으로 받는 함수
 * @param returnType 년도, 년월, 일자, 일시타입
 * @returns "2022" or "2022-02" or "2022-02-24" or "2022-02-24 13:25"
 */
export const getCurrentDate = (
  returnType: "year" | "yearMonth" | "date" | "datetime" = "date"
): string => {
  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth() + 1;
  const date = current.getDate();
  const hour = current.getHours();
  const minute = current.getMinutes();

  // 년도
  if (returnType === "year") {
    return `${year}`;
  }
  // 년도-월
  else if (returnType === "yearMonth") {
    return `${year}-${month >= 10 ? month : "0" + month}`;
  }
  // 년도-월-일 시간:분
  else if (returnType === "datetime") {
    return `${year}-${month >= 10 ? month : "0" + month}-${
      date >= 10 ? date : "0" + date
    } ${hour >= 10 ? hour : "0" + hour}:${
      minute >= 10 ? minute : "0" + minute
    }`;
  }
  // 년-월-일
  else {
    return `${year}-${month >= 10 ? month : "0" + month}-${
      date >= 10 ? date : "0" + date
    }`;
  }
};

/**
 * NOTE: Date -> String 변환 함수
 * @param dateValue Date 타입 값
 * @param returnType 년도, 년월, 일자, 일시타입
 * @returns "2022" or "2022-02" or "2022-02-24" or "2022-02-24 13:25"
 */
export const parseDateToString = (
  dateValue: Date,
  returnType: "year" | "yearMonth" | "date" | "datetime" = "date"
): string | undefined => {
  if (dateValue) {
    const year = dateValue.getFullYear();
    const month = dateValue.getMonth() + 1;
    const date = dateValue.getDate();
    const hour = dateValue.getHours();
    const minute = dateValue.getMinutes();

    const stringValue =
      returnType === "datetime"
        ? `${year}-${month >= 10 ? month : "0" + month}-${
            date >= 10 ? date : "0" + date
          } ${hour >= 10 ? hour : "0" + hour}:${
            minute >= 10 ? minute : "0" + minute
          }`
        : returnType === "yearMonth"
        ? `${year}-${month >= 10 ? month : "0" + month}`
        : returnType === "year"
        ? `${year}`
        : `${year}-${month >= 10 ? month : "0" + month}-${
            date >= 10 ? date : "0" + date
          }`;
    return stringValue;
  } else {
    return undefined;
  }
};

/**
 * NOTE: 주일을 구하는 함수
 * @param date Date 타입 값
 * @returns 주일 -> true, 주말 -> false
 */
export const isWeekDay = (date: Date): boolean => {
  const day = date.getDay();

  return day !== 0 && day !== 6;
};
