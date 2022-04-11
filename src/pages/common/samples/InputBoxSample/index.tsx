import InputBox from "components/InputBox";
import { PageProps } from "utils/types";

const InputBoxSample: React.FC<PageProps> = () => {
  return (
    <>
      <InputBox name={"input-box-sample"} placeholder={"input please..."} />
    </>
  );
};

export default InputBoxSample;
