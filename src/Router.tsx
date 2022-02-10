// import Login from 'pages/Accounts/Login';
import { lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { DynamicRoute } from 'utils/routes';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Router = () => {
  return (
    <>
      {/* <Route exact path={'/login'} component={Login} /> */}
      <DynamicRoute
        page={(path: string) => {
          console.log('path::', path);
          PageImport(path);
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError={(error: any) => {
          if (/Loading chunk \d+ failed/.test(error.message)) {
            window.location.reload();
            return;
          }
          throw error;
        }}
      />
    </>
  );
};

const PageImport = (path: string, defaultPath = './pages/') => {
  return import(defaultPath + path + '')
    .then((module) => module.default)
    .catch((error) => {
      console.log(error);
      if (/not find module/.test(error.message)) {
        return import(defaultPath + '/404').then((module) => module.default);
      }
      throw error;
    });
};

export const PageImportLazy = (path: string, defaultPath = './pages') => {
  return lazy(() =>
    import(defaultPath + path + '').catch((error) => {
      console.log('error::', error);
      // if (/not find module/.test(error.message)) {
      //   return import(defaultPath + '/404').then((module) => module.default);
      // }
      // throw error;
    })
  );
};
export default Router;
