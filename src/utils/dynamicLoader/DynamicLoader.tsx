import React, { Suspense, lazy } from "react";

export type Props = {
  path: string;
  info?: any;
};

const DynamicLoader: React.FC<Props> = ({ path, info }: Props) => {
  const LazyComponent = lazy(() => import(`pages/${path}`));
  return (
    <Suspense fallback={<div>loading...</div>}>
      <LazyComponent info={info} />
    </Suspense>
  );
};

export default React.memo(DynamicLoader);
