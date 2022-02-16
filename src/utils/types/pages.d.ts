export interface PageProps {
  info?: any;
}

export interface PageHeaderProps extends PageProps {
  handleSearchButtonClick?: (event?: any) => any;
  handleAddButtonClick?: (event?: any) => void;
  handleDeleteButtonClick?: (event?: any) => void;
  handleSaveButtonClick?: (event?: any) => void;
  handleExcelButtonClick?: (event?: any) => void;
  handleReportButtonClick?: (event?: any) => void;
}
