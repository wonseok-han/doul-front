import CommonButtonGroup from "components/CommonButtonGroup";
import { Col, Row } from "react-bootstrap";
import { PageHeaderProps } from "utils/types";

const PageHeader: React.FC<PageHeaderProps> = ({
  info,
  handleSearchButtonClick,
  handleAddButtonClick,
  handleDeleteButtonClick,
  handleSaveButtonClick,
  handleExcelButtonClick,
  handleReportButtonClick,
}: PageHeaderProps) => {
  const { search, add, remove, save, excel, report } = info;

  return (
    <div style={{ marginTop: "12px" }}>
      <Row
        xs={"auto"}
        className={"gx-0"}
        style={{
          justifyContent: "end",
        }}
      >
        <Col xs={"auto"}>
          <CommonButtonGroup
            search={search}
            add={add}
            remove={remove}
            save={save}
            excel={excel}
            report={report}
            handleSearchButtonClick={handleSearchButtonClick}
            handleAddButtonClick={handleAddButtonClick}
            handleDeleteButtonClick={handleDeleteButtonClick}
            handleSaveButtonClick={handleSaveButtonClick}
            handleExcelButtonClick={handleExcelButtonClick}
            handleReportButtonClick={handleReportButtonClick}
          />
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default PageHeader;
