/**
 * NOTE: 값 null, undefined, '' 체크
 * @param value 체크할 값
 * @returns null || undefined || '' => true, !null && !undefined && !'' => false,
 */
export const isNull = (
  value: string | number | Date | null | undefined
): boolean => {
  return value === null || value === undefined || value === "";
};
