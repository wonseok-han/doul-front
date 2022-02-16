import PageHeader from "components/PageHeader";
import React from "react";
import { PageProps } from "utils/types";

import PageProvider, { usePageContext } from "./context";

const CmnCdMng: React.FC<PageProps> = ({ info }: PageProps) => {
  const {
    actions: {
      handleSearchButtonClick,
      handleAddButtonClick,
      handleDeleteButtonClick,
      handleSaveButtonClick,
      handleExcelButtonClick,
      handleReportButtonClick,
    },
  } = usePageContext();

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
      공통코드관리
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
      <div>aa</div>
    </>
  );
};

const Index: React.FC = (props) => (
  <PageProvider>
    <CmnCdMng {...props} />
  </PageProvider>
);

export default React.memo(Index);
