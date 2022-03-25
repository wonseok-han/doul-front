import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import classNames from "classnames";
import Loading from "components/Loading";
import React, { Suspense, lazy } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useThemeContext } from "utils/context/Reducer";

export type Props = {
  path: string;
  info?: any;
};

// NOTE: 페이지를 Lazy하게 호출하기 위한 DynamicLoader 컴포넌트
const DynamicLoader: React.FC<Props> = ({ path, info }: Props) => {
  const LazyComponent = lazy(() => import(`pages/${path}`));
  const { store: themeStore } = useThemeContext();

  const theme = createTheme({
    palette: {
      mode: themeStore?.darkMode ? "dark" : "light",
    },
  });

  // NOTE: ErrorFallback 컴포넌트
  const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
      <div
        role="alert"
        className={classNames("dynamic-content", {
          darkMode: themeStore?.darkMode,
        })}
      >
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MuiThemeProvider theme={theme}>
        <Suspense fallback={<Loading loading={true} />}>
          <div
            className={classNames("dynamic-content", {
              darkMode: themeStore?.darkMode,
            })}
          >
            <LazyComponent info={info} />
          </div>
        </Suspense>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
};

export default React.memo(DynamicLoader);
