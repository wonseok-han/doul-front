import { actions, useAppContext } from "utils/context";

import { StateProperties } from "./initial";

const useActions = ({ state, setState }: StateProperties): any => {
  const { dispatch } = useAppContext();
  const { showAlert } = actions;

  const handleSearchButtonClick = () => {
    console.log("조회", state);
    setState((previous) => ({
      ...previous,
      detailAxiosConfig: "345",
    }));
  };

  const handleAddButtonClick = () => {
    dispatch(showAlert({ body: "개발 중" }));
  };

  const handleDeleteButtonClick = (event: any) => {
    console.log("삭제", event);
  };

  const handleSaveButtonClick = (event: any) => {
    console.log("저장", event);
  };

  const handleExcelButtonClick = (event: any) => {
    console.log("엑셀", event);
  };

  const handleReportButtonClick = (event: any) => {
    console.log("레포트", event);
  };

  return {
    handleSearchButtonClick,
    handleAddButtonClick,
    handleDeleteButtonClick,
    handleSaveButtonClick,
    handleExcelButtonClick,
    handleReportButtonClick,
  };
};

export default useActions;
