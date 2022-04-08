import { useCallback, useState } from "react";

const useFieldValues = (initial: any): Array<any> => {
  const [fieldValues, setFieldValues] = useState(initial);

  const handleChangeField = useCallback((event) => {
    const {
      target: { name, value },
    } = event;

    setFieldValues((previous: any) => ({
      ...previous,
      [name]: value,
      previous: { ...previous, previous: undefined },
    }));
  }, []);

  return [fieldValues, handleChangeField];
};

export default useFieldValues;
