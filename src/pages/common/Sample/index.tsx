import Button from "components/Button";
import Check from "components/Check";
import DateTimePicker from "components/DateTimePicker";
import InputBox from "components/InputBox";
import PageHeader from "components/PageHeader";
import Row from "components/Row";
import Select from "components/Select";
import React from "react";
import { Col } from "react-bootstrap";
import useFieldValues from "utils/hooks/useFieldValues";
import { PageProps } from "utils/types";

import PageProvider, { usePageContext } from "./context";

const POSITON_ITEMS = [
  {
    code: "00",
    name: "사원",
  },
  {
    code: "01",
    name: "대리",
  },
  {
    code: "02",
    name: "과장",
  },
  {
    code: "03",
    name: "차장",
  },
  {
    code: "04",
    name: "부장",
  },
  {
    code: "05",
    name: "이사",
  },
  {
    code: "06",
    name: "사장",
  },
];

const SKILL_ITEMS = [
  {
    code: "00",
    name: "JavaScript",
  },
  {
    code: "01",
    name: "Java",
  },
  {
    code: "02",
    name: "Python",
  },
];

const FIELDS = {
  name: "한원석",
  email: "oshan1112@gmail.com",
  position: "01",
  skills: "00,02",
  join_date: "2018-07-02",
  register_date: "2022-02-22 13:00",
  use_yn: "Y",
};

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
  const [fieldValues, handleChangeField] = useFieldValues(FIELDS);

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
      <Row>{JSON.stringify(fieldValues)}</Row>
      <hr />
      <h4>InputBox</h4>
      <Row xs={"auto"}>
        <Col>
          <InputBox
            name={"name"}
            placeholder={"성명"}
            isValid={false}
            value={fieldValues.name}
            handleChangeField={handleChangeField}
          />
        </Col>
        <Col>
          <InputBox
            name={"email"}
            prefix={"pre"}
            postfix={"post"}
            value={fieldValues.email}
            handleChangeField={handleChangeField}
          />
        </Col>
        <Col>
          <InputBox name={"password"} isPassword placeholder={"Password"} />
        </Col>
      </Row>
      <hr />
      <h4>SelectBox</h4>
      <Row
        xs={"auto"}
        style={{ justifyContent: "space-start", marginTop: "10px" }}
      >
        <Col>
          <Select
            name={"position"}
            items={POSITON_ITEMS}
            selectOption={"choose"}
            value={fieldValues.position.split(",")}
            handleChangeField={handleChangeField}
          />
        </Col>
        <Col>
          <Select
            name={"skills"}
            items={SKILL_ITEMS}
            selectOption={"all"}
            multiple
            value={fieldValues.skills.split(",")}
            handleChangeField={handleChangeField}
          />
        </Col>
      </Row>
      <hr />
      <h5>Date/TimePicker</h5>
      <Row
        xs={"auto"}
        style={{ justifyContent: "space-start", marginTop: "10px" }}
      >
        <Col>
          <DateTimePicker
            name={"join_date"}
            defaultValue={new Date()}
            value={fieldValues.join_date}
            handleChangeField={handleChangeField}
          />
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
          <DateTimePicker
            name={"register_date"}
            type={"datetime"}
            value={fieldValues.register_date}
            handleChangeField={handleChangeField}
          />
        </Col>
      </Row>
      <hr />
      <h5>Check/Radio Box</h5>
      <Row
        xs={"auto"}
        style={{ justifyContent: "space-start", marginTop: "10px" }}
      >
        <Col>
          <Check
            name={"use_yn"}
            choices={[
              { code: "Y", name: "사용" },
              { code: "N", name: "미사용" },
            ]}
            value={fieldValues.use_yn}
            handleChangeField={handleChangeField}
          />
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
