import Textarea from "components/Textarea";
import { PageProps } from "utils/types";

const TextareaSample: React.FC<PageProps> = () => {
  return (
    <>
      <Textarea name={"textarea-sample"} placeholder={"input please..."} />
    </>
  );
};

export default TextareaSample;
