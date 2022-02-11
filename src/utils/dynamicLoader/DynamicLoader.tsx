import React, { Suspense, lazy } from 'react';

export type Props = {
  path: string;
};

const DynamicLoader: React.FC<Props> = ({ path }: Props) => {
  const LazyComponent = lazy(() => import(`pages/${path}`));
  return (
    <Suspense fallback={<div>loading...</div>}>
      <LazyComponent path={path} />
    </Suspense>
  );
};

export default React.memo(DynamicLoader);
