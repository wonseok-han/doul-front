import { useCallback, useState } from "react";

const useFieldValues = (initial: any) => {
  const [fieldValues, setFieldValues] = useState(initial);

  const handleChangeField = useCallback((event) => {
    setFieldValues((previous: any) => ({
      ...previous,
      [event?.target?.name]: event?.target?.value,
    }));
  }, []);

  return [fieldValues, handleChangeField];
};

export default useFieldValues;
