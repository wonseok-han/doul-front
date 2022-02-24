// NOTE: 값 null, undefined, '' 체크
// null || undefined || '' => true,
// !null && !undefined && !'' => false,
export const isNull = (value: string | number | Date): boolean => {
  return value === null || value === undefined || value === "";
};
