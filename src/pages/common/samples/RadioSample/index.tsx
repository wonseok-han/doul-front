import Radio from "components/Radio";
import { PageProps } from "utils/types";

import { CHOICE_LIST } from "./meta";

const RadioSample: React.FC<PageProps> = () => {
  return (
    <>
      <Radio name={"radio-sample"} choices={CHOICE_LIST} />
    </>
  );
};

export default RadioSample;
