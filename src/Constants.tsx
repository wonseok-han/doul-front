declare global {
  interface Window {
    API_HOST: string;
    REPORT_HOST: string;
  }
}

const fixProtocol = (url: string): string => {
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : window.location.protocol + "//" + url;
};

// 테스트 시에 다수의 도메인에서 장고/리액트가 서비스됩니다.
// 매 도메인마다 리액트를 빌드하기보다
// 하나의 빌드에서 다수의 API_HOST를 바라볼 수 있도록
// window.API_HOST 설정을 추가하고
// 빌드된 리액트 파일을 nginx를 통해 서비스 시에
// 이 설정을 변경할 수 있도록 합니다.
export const API_HOST = fixProtocol(
  window.API_HOST || process.env.REACT_APP_API_HOST || "http://localhost:8000"
);

export const REPORT_HOST = fixProtocol(
  window.REPORT_HOST ||
    process.env.REACT_APP_REPORT_HOST ||
    "http://164.125.8.21:8080"
);

export const USE_SIGNED_TIMESTAMP: boolean = ["t", "true", "1"].includes(
  process.env.REACT_APP_USE_SIGNED_TIMESTAMP || "false"
);
export const SALT_KEY = process.env.REACT_APP_SALT_KEY || API_HOST;

// 렌더링 횟수 표현 컴포넌트인 RenderIndicator 동작 여부
export const USE_RENDER_INDICATOR = ["t", "true", "1"].includes(
  process.env.REACT_APP_USE_RENDER_INDICATOR || "false"
);
