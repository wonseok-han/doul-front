import Loading from "components/Loading";
import { useState } from "react";
import { PageProps } from "utils/types";

const LoadingSample: React.FC<PageProps> = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Loading loading={loading} onClick={() => setLoading(false)} />
    </>
  );
};

export default LoadingSample;
