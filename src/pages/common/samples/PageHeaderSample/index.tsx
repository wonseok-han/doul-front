import PageHeader from "components/PageHeader";
import { PageProps } from "utils/types";

const PageHeaderSample: React.FC<PageProps> = ({ info }: PageProps) => {
  const handleSearchButtonClick = (event: any) => {
    console.log("조회", event);
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

  return (
    <>
      <PageHeader
        info={info}
        handleSearchButtonClick={handleSearchButtonClick}
        handleAddButtonClick={handleAddButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
        handleSaveButtonClick={handleSaveButtonClick}
        handleExcelButtonClick={handleExcelButtonClick}
        handleReportButtonClick={handleReportButtonClick}
      />
    </>
  );
};

export default PageHeaderSample;
