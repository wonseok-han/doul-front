import { createContext, useContext, useReducer } from "react";
import {
  ActionProps,
  AppContextProps,
  AppProviderProps,
  AppStoreProps,
  ThemeContextProps,
  ThemeStoreProps,
} from "utils/types";

/**
 * userInfo: 사용자정보
 * activeMenu: 선택된 메뉴
 * activeIndicator: RenderIndicator 활성화 여부
 * toggledInterface: SDI/MDI 여부
 */
const AppContext = createContext<AppContextProps>({
  store: undefined,
  dispatch: undefined,
});

/**
 * darkMode: 다크모드 여부
 */
const ThemeContext = createContext<ThemeContextProps>({
  store: undefined,
  dispatch: undefined,
});

// NOTE: AppContext, ThemeContext reducer
const reducer = (state: any, action: ActionProps) => {
  const { type, payload } = action;
  switch (type) {
    // 유저정보
    case "SET_USER_INFO":
      return { ...state, userInfo: payload };
    // 선택 메뉴
    case "SET_ACTIVE_MENU":
      return { ...state, activeMenu: payload };
    // 활성화 할 메뉴
    case "SET_OPEN_MENU":
      return { ...state, openMenu: payload };
    // 인디케이터 활성화 여부
    case "SET_ACTIVE_INDICATOR":
      return { ...state, activeIndicator: payload };
    // SDI/MDI 여부
    case "SET_TOGGLED_INTERFACE":
      return { ...state, toggledInterface: payload };
    // 다크모드 여부
    case "SET_ACTIVE_DARKMODE":
      return { ...state, darkMode: payload };
    default:
      throw new Error("Unsupported action type:" + type);
  }
};

// NOTE: App Provider
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

// NOTE: Theme Provider
export const ThemeProvider: React.FC<AppProviderProps> = ({
  children,
  initialStore,
}: AppProviderProps) => {
  const [store, dispatch]: [ThemeStoreProps, any] = useReducer(reducer, {
    ...initialStore,
  });

  return (
    <ThemeContext.Provider value={{ store, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

// NOTE: AppContext
const useAppContext = (): AppContextProps => {
  return useContext(AppContext);
};

// NOTE: ThemeContext
export const useThemeContext = (): ThemeContextProps => {
  return useContext(ThemeContext);
};

export default useAppContext;
