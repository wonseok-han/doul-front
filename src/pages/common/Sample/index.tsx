import Button from "components/Button";
import DateTimePicker from "components/DateTimePicker";
import InputBox from "components/InputBox";
import PageHeader from "components/PageHeader";
import Row from "components/Row";
import Select from "components/Select";
import React from "react";
import { Col } from "react-bootstrap";
import { PageProps } from "utils/types";

import PageProvider, { usePageContext } from "./context";

const SELECT_ITEMS = [
  {
    code: "00",
    name: "zero",
  },
  {
    code: "01",
    name: "one",
  },
  {
    code: "02",
    name: "two",
  },
  {
    code: "03",
    name: "three",
  },
  {
    code: "04",
    name: "four",
  },
  {
    code: "05",
    name: "five",
  },
  {
    code: "06",
    name: "six",
  },
  {
    code: "07",
    name: "seven",
  },
];

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
      <h4>공통버튼그룹</h4>
      <PageHeader
        info={info}
        handleSearchButtonClick={handleSearchButtonClick}
        handleAddButtonClick={handleAddButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
        handleSaveButtonClick={handleSaveButtonClick}
        handleExcelButtonClick={handleExcelButtonClick}
        handleReportButtonClick={handleReportButtonClick}
      />
      <h4>Button</h4>
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
          <Button variant="warning">warning</Button>
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
          <Button variant="outline-warning">warning</Button>
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
      <hr />
      <h4>InputBox</h4>
      <Row xs={"auto"}>
        <Col>
          <InputBox placeholder={"입력하세요."} isValid={false} />
        </Col>
        <Col>
          <InputBox prefix={"pre"} postfix={"post"} />
        </Col>
        <Col>
          <InputBox isPassword placeholder={"Password"} />
        </Col>
      </Row>
      <hr />
      <h4>SelectBox</h4>
      <Row
        xs={"auto"}
        style={{ justifyContent: "space-start", marginTop: "10px" }}
      >
        <Col>
          <Select items={SELECT_ITEMS} />
        </Col>
        <Col>
          <Select items={SELECT_ITEMS} selectOption={"all"} multiple />
        </Col>
      </Row>
      <hr />
      <h5>Date/TimePicker</h5>
      <Row
        xs={"auto"}
        style={{ justifyContent: "space-start", marginTop: "10px" }}
      >
        <Col>
          <DateTimePicker name={"date"} defaultValue={new Date()} />
        </Col>
        <Col>
          <DateTimePicker
            name={"year"}
            type={"year"}
            style={{ width: "100px" }}
          />
        </Col>
        <Col>
          <DateTimePicker name={"yearMonth"} type={"yearMonth"} />
        </Col>
        <Col>
          <DateTimePicker name={"datetime"} type={"datetime"} />
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
