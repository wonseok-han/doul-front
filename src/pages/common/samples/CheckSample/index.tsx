import Check from "components/Check";
import { PageProps } from "utils/types";

import { CHECK_LIST } from "./meta";

const CheckSample: React.FC<PageProps> = () => {
  return (
    <>
      <Check name={"check-sample"} value={"Y"} choices={CHECK_LIST} />
    </>
  );
};

export default CheckSample;
