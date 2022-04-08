// NOTE: 유저정보 Props
export interface UserInfoProps {
  id: string;
  name: string;
}

// NOTE: appContext store Props
export interface AppStoreProps {
  userInfo?: UserInfoProps; // NOTE: 사용자정보
  activeMenu?: any; // NOTE: 선택되어 활성화된 메뉴
  openMenu?: any; // NOTE: 활성화 할 메뉴
  activeIndicator?: boolean; // NOTE: RenderIndicator 활성화 여부
  toggledInterface?: string; // NOTE: SDI/MDI 여부
  showAlert?: AlertProps; // NOTE: Alert 호출
}

// NOTE: themeContext store Props
export interface ThemeStoreProps {
  darkMode?: boolean; // NOTE: 다크모드 활성화 여부
}

// NOTE: appContext Props
export interface AppContextProps {
  store: AppStoreProps | undefined;
  dispatch: any;
}

// NOTE: themeContext Props
export interface ThemeContextProps {
  store: ThemeStoreProps | undefined;
  dispatch: any;
}

// NOTE: appProvider Props
export interface AppProviderProps {
  children: any;
  initialStore?: any;
}

// NOTE: action Props
export interface ActionProps {
  type?: string;
  payload?: any;
}

// NOTE: Alert Props
export interface AlertProps {
  show?: boolean;
  confirm?: boolean;
  header?: string;
  body?: string;
  callBack?: any;
}
