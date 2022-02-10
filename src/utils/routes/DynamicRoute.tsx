/* eslint-disable @typescript-eslint/no-explicit-any */

// import { FrownOutlined } from "@ant-design/icons";
// import { notification } from "antd";
// import Loading from "components/General/Loading";
// import LayoutContainer from "components/Layout/LayoutContainer";
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

// import useAppContext from "utils/Reducers";

interface AsyncComponentProperties {
  path: string;
  search: any;
  component: any;
  loading: any;
  onError: any;
  otherProps: any;
  history: any;
}

interface DynamicRouteProperties {
  page?: any;
  loading?: any;
  onError?: any;
  props?: any;
}

const AsyncComponent: React.FC<AsyncComponentProperties> = ({
  path,
  search,
  component,
  loading,
  onError,
  otherProps,
  history,
}) => {
  const [Component, setComponent] = useState(undefined);

  useEffect(() => {
    let cleanedUp = false;
    component
      .then((propsComponent: any) => {
        if (cleanedUp) {
          return;
        }
        setComponent(() => propsComponent);
      })
      .catch((error: any) => {
        if (!cleanedUp) {
          setComponent(undefined);
        }
        if (typeof onError === 'function') {
          onError(error, history);
          return;
        }
        throw error;
      });
    return () => {
      setComponent(undefined);
      cleanedUp = true;
    };
  }, [component, history, onError, path, search]);

  return Component ? React.createElement(Component, otherProps) : loading;
};

const DynamicRoute: React.FC<DynamicRouteProperties> = ({
  page,
  loading,
  onError,
  props,
}) => {
  // const navigate = useNavigate();
  const params = useParams();
  console.log('page::', page);
  console.log('params::', params);
  return (
    <Routes>
      <Route
        path="/"

        // element={({ history }: any) => {
        //   console.log('history::', history);
        //   return (
        //     <AsyncComponent
        //       path={history.location.pathname}
        //       search={history.location.search}
        //       component={page(history.location.pathname)}
        //       loading={loading || <div>loading...</div>}
        //       onError={onError}
        //       otherProps={props}
        //       history={history}
        //     />
        //   );
        // }}
        // element={
        //   <AsyncComponent
        //     path={history.location.pathname}
        //     search={history.location.search}
        //     component={page(history.location.pathname)}
        //     loading={loading || <div>loading...</div>}
        //     onError={onError}
        //     otherProps={props}
        //     history={history}
        //   />
        // }
      />
    </Routes>
  );
};

export default DynamicRoute;
