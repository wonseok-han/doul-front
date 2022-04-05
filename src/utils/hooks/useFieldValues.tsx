import { useCallback, useState } from "react";

const useFieldValues = (initial: any): Array<any> => {
  const [fieldValues, setFieldValues] = useState(initial);

  const handleChangeField = useCallback((event) => {
    setFieldValues((previous: any) => ({
      ...previous,
      [event?.target?.name]: event?.target?.value,
      previous: { ...previous, previous: undefined },
    }));
  }, []);

  return [fieldValues, handleChangeField];
};

export default useFieldValues;
