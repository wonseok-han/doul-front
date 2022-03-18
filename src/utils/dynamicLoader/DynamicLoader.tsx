import Loading from "components/Loading";
import React, { Suspense, lazy } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export type Props = {
  path: string;
  info?: any;
};

// NOTE: ErrorFallback 컴포넌트
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

// NOTE: 페이지를 Lazy하게 호출하기 위한 DynamicLoader 컴포넌트
const DynamicLoader: React.FC<Props> = ({ path, info }: Props) => {
  const LazyComponent = lazy(() => import(`pages/${path}`));
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading loading={true} />}>
        <div
          style={{ marginTop: "15px", marginLeft: "10px", marginRight: "10px" }}
        >
          <LazyComponent info={info} />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default React.memo(DynamicLoader);
