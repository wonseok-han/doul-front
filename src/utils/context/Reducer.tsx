import { createContext, useContext, useReducer } from "react";

export interface AppStoreProps {
  userInfo?: any; // NOTE: 사용자정보
  activeMenu?: any; // NOTE: 선택되어 활성화된 메뉴
}

export interface AppContextProps {
  store: AppStoreProps | undefined;
  dispatch: any;
}

export interface AppProviderProps {
  children: any;
  initialStore?: any;
}

export interface ActionProps {
  type?: string;
  payload?: any;
}

const AppContext = createContext<AppContextProps>({
  store: undefined,
  dispatch: undefined,
});

const reducer = (state: any, action: ActionProps) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER_INFO":
      return { ...state, userInfo: payload };
    case "SET_ACTIVE_MENU":
      return { ...state, activeMenu: payload };
    default:
      throw new Error("Unsupported action type:" + type);
  }
};

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  initialStore,
}: AppProviderProps) => {
  const [store, dispatch]: [AppStoreProps, any] = useReducer(reducer, {
    ...initialStore,
  });

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextProps => {
  return useContext(AppContext);
};

export default useAppContext;
