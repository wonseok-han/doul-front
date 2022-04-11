import Select from "components/Select";
import { PageProps } from "utils/types";

import { CHOICE_LIST } from "./meta";

const SelectSample: React.FC<PageProps> = () => {
  return (
    <>
      <Select
        name={"select-sample"}
        choices={CHOICE_LIST}
        selectOption={"choose"}
      />
    </>
  );
};

export default SelectSample;
