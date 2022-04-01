import { useEffect } from "react";

import { StateProperties } from "./initial";

// NOTE: state의 값이 변경됨에 따른 처리를 하는 메소드
const useApiCall = ({ state, setState }: StateProperties) => {
  useEffect(() => {
    setState((previous) => ({
      ...previous,
      masterAxiosConfig: "000",
    }));
  }, [state.detailAxiosConfig]);
};

export default useApiCall;
