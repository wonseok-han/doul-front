import { StateProperties } from "./initial";

const useActions = ({ state, setState }: StateProperties) => {
  const handleSearchButtonClick = () => {
    console.log("조회", state);
    setState((previous) => ({
      ...previous,
      detailAxiosConfig: "345",
    }));
  };

  const handleAddButtonClick = (event: any) => {
    console.log("추가", event);
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
