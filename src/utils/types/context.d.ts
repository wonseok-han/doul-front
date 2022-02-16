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
