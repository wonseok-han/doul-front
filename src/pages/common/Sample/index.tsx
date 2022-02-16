import Button from "components/Button";
import PageHeader from "components/PageHeader";
import Row from "components/Row";
import React from "react";
import { Col } from "react-bootstrap";
import { PageProps } from "utils/types";

import PageProvider, { usePageContext } from "./context";

const Sample: React.FC<PageProps> = ({ info }: PageProps) => {
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
      <Row xs={"auto"} style={{ justifyContent: "space-around" }}>
        <Col>
          <Button variant="primary">primary</Button>
        </Col>
        <Col>
          <Button variant="secondary">secondary</Button>
        </Col>
        <Col>
          <Button variant="success">success</Button>
        </Col>
        <Col>
          <Button variant="waring">waring</Button>
        </Col>
        <Col>
          <Button variant="danger">danger</Button>
        </Col>
        <Col>
          <Button variant="info">info</Button>
        </Col>
        <Col>
          <Button variant="light">light</Button>
        </Col>
        <Col>
          <Button variant="dark">dark</Button>
        </Col>
        <Col>
          <Button variant="link">link</Button>
        </Col>
      </Row>
      <Row
        xs={"auto"}
        style={{ justifyContent: "space-around", marginTop: "10px" }}
      >
        <Col>
          <Button variant="outline-primary">primary</Button>
        </Col>
        <Col>
          <Button variant="outline-secondary">secondary</Button>
        </Col>
        <Col>
          <Button variant="outline-success">success</Button>
        </Col>
        <Col>
          <Button variant="outline-waring">waring</Button>
        </Col>
        <Col>
          <Button variant="outline-danger">danger</Button>
        </Col>
        <Col>
          <Button variant="outline-info">info</Button>
        </Col>
        <Col>
          <Button variant="outline-light">light</Button>
        </Col>
        <Col>
          <Button variant="outline-dark">dark</Button>
        </Col>
      </Row>
    </>
  );
};

const Index: React.FC = (props) => (
  <PageProvider>
    <Sample {...props} />
  </PageProvider>
);

export default React.memo(Index);
