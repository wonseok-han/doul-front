import { Suspense, lazy, useEffect, useState } from 'react';

export type Props = {
  path: string;
};

const DynamicLoader: React.FC<Props> = ({ path }: Props) => {
  //   const [component, setComponent] = useState();

  //   useEffect(() => {
  //     import(`pages/${path}`)
  //       .then((module) => {
  //         console.log('모듈::' + module);
  //       })
  //       .catch((error) => console.log('에러::', error));
  //   }, [path]);

  const LazyComponent = lazy(() => import(`pages/${path}`));
  return (
    <Suspense fallback={<div>loading...</div>}>
      <LazyComponent path={path} />
    </Suspense>
  );
};

export default DynamicLoader;
