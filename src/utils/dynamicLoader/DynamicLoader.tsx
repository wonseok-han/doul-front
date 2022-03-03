import Loading from "components/Loading";
import React, { Suspense, lazy } from "react";

export type Props = {
  path: string;
  info?: any;
};

const DynamicLoader: React.FC<Props> = ({ path, info }: Props) => {
  const LazyComponent = lazy(() => import(`pages/${path}`));
  return (
    <Suspense fallback={<Loading loading={true} />}>
      <div
        style={{ marginTop: "15px", marginLeft: "10px", marginRight: "10px" }}
      >
        <LazyComponent info={info} />
      </div>
    </Suspense>
  );
};

export default React.memo(DynamicLoader);
