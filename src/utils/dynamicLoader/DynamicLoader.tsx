import classNames from "classnames";
import Loading from "components/Loading";
import React, { Suspense, lazy } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useThemeContext } from "utils/context/Reducer";

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
  const { store: themeStore } = useThemeContext();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading loading={true} />}>
        <div
          className={classNames("dynamic-content", {
            darkMode: themeStore?.darkMode,
          })}
        >
          <LazyComponent info={info} />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default React.memo(DynamicLoader);
