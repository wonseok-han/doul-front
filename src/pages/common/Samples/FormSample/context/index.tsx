import { createContext, useContext, useState } from "react";

import { StateProperties, initial } from "./initial";
import useActions from "./useActions";
import useApiCall from "./useApiCall";

const PageContext = createContext<StateProperties>({} as StateProperties);

const PageProvider: React.FC = ({ children }: any) => {
  const [state, setState] = useState(initial);

  const actions = useActions({ state, setState });

  useApiCall({ state, setState, actions });

  return (
    <PageContext.Provider value={{ state, setState, actions }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = (): StateProperties => {
  return useContext(PageContext);
};

export default PageProvider;
