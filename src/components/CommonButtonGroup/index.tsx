import Button from "components/Button";
import React from "react";
import { ButtonGroup as BootStrapButtonGroup } from "react-bootstrap";

export interface Props {
  search: boolean;
  add: boolean;
  remove: boolean;
  save: boolean;
  excel: boolean;
  report: boolean;
  handleSearchButtonClick?: (event: any) => void;
  handleAddButtonClick?: (event: any) => void;
  handleDeleteButtonClick?: (event: any) => void;
  handleSaveButtonClick?: (event: any) => void;
  handleExcelButtonClick?: (event: any) => void;
  handleReportButtonClick?: (event: any) => void;
}

const CommonButtonGroup: React.FC<Props> = ({
  search = false,
  add = false,
  remove = false,
  save = false,
  excel = false,
  report = false,
  handleSearchButtonClick,
  handleAddButtonClick,
  handleDeleteButtonClick,
  handleSaveButtonClick,
  handleExcelButtonClick,
  handleReportButtonClick,
}: Props) => {
  return (
    <>
      {search && (
        <BootStrapButtonGroup className={"me-1"}>
          <Button onClick={handleSearchButtonClick}>조회</Button>
        </BootStrapButtonGroup>
      )}
      {add && (
        <BootStrapButtonGroup className={"me-1"}>
          <Button onClick={handleAddButtonClick}>추가</Button>
        </BootStrapButtonGroup>
      )}
      {remove && (
        <BootStrapButtonGroup className={"me-1"}>
          <Button onClick={handleDeleteButtonClick}>삭제</Button>
        </BootStrapButtonGroup>
      )}
      {save && (
        <BootStrapButtonGroup className={"me-1"}>
          <Button onClick={handleSaveButtonClick}>저장</Button>
        </BootStrapButtonGroup>
      )}
      {excel && (
        <BootStrapButtonGroup className={"me-1"}>
          <Button onClick={handleExcelButtonClick}>엑셀</Button>
        </BootStrapButtonGroup>
      )}
      {report && (
        <BootStrapButtonGroup>
          <Button onClick={handleReportButtonClick}>레포트</Button>
        </BootStrapButtonGroup>
      )}
    </>
  );
};

export default React.memo(CommonButtonGroup);
