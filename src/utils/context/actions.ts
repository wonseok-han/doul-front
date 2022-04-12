import { ActionProps, AlertProps, UserInfoProps } from "utils/types/context";

// NOTE: 렌더링 카운트 증가
export const INCREASE_RENDER_COUNT = "INCREASE_RENDER_COUNT";
// NOTE: 유저정보 등록
export const SET_USER_INFO = "SET_USER_INFO";
// NOTE: 선택 메뉴 정보 등록
export const SET_ACTIVE_MENU = "SET_ACTIVE_MENU";
// NOTE: 활성화 할 메뉴 등록
export const SET_OPEN_MENU = "SET_OPEN_MENU";
// NOTE: 인디케이터 활성화 여부
export const SET_ACTIVE_INDICATOR = "SET_ACTIVE_INDICATOR";
// NOTE: SDI/MDI 여부
export const SET_TOGGLED_INTERFACE = "SET_TOGGLED_INTERFACE";
// NOTE: 다크모드 여부
export const SET_ACTIVE_DARKMODE = "SET_ACTIVE_DARKMODE";
// NOTE: 공통 Alert Show 여부
export const SHOW_ALERT = "SHOW_ALERT";

// NOTE: Reduce Actions
export const actions = {
  // 렌더링 카운트 증가
  increaseRenderCount: (): ActionProps => ({
    type: INCREASE_RENDER_COUNT,
  }),
  // 유저정보
  setUserInfo: (user: UserInfoProps | undefined): ActionProps => ({
    type: SET_USER_INFO,
    payload: user,
  }),
  // 선택 메뉴
  setActiveMenu: (menu: any): ActionProps => ({
    type: SET_ACTIVE_MENU,
    payload: menu,
  }),
  // 활성화 할 메뉴
  setOpenMenu: (menu: any): ActionProps => ({
    type: SET_OPEN_MENU,
    payload: menu,
  }),
  // 인디케이터 활성화 여부
  setActiveIndicator: (toggled: boolean): ActionProps => ({
    type: SET_ACTIVE_INDICATOR,
    payload: toggled,
  }),
  // SDI/MDI 여부
  setToggledInterface: (toggled: string): ActionProps => ({
    type: SET_TOGGLED_INTERFACE,
    payload: toggled,
  }),
  // 다크모드 여부
  setActiveDarkMode: (toggled: boolean): ActionProps => ({
    type: SET_ACTIVE_DARKMODE,
    payload: toggled,
  }),
  showAlert: (alert?: AlertProps): ActionProps => ({
    type: SHOW_ALERT,
    payload: {
      ...alert,
      show: alert?.show == undefined ? true : alert?.show,
    },
  }),
};
