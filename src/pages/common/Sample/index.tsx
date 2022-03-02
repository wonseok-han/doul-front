import Button from "components/Button";
import Check from "components/Check";
import DateTimePicker from "components/DateTimePicker";
import FormRow from "components/FormRow";
import InputBox from "components/InputBox";
import Label from "components/Label";
import Loading from "components/Loading";
import PageHeader from "components/PageHeader";
import Radio from "components/Radio";
import Row from "components/Row";
import Select from "components/Select";
import Textarea from "components/Textarea";
import React from "react";
import { Col, Form, FormGroup } from "react-bootstrap";
import { getCurrentDate } from "utils/functions/date";
import useFieldValues from "utils/hooks/useFieldValues";
import { PageProps } from "utils/types";

import PageProvider, { usePageContext } from "./context";

const USE_YN_ITEMS = [
  { code: "Y", name: "사용" },
  { code: "N", name: "미사용" },
];

const POSITION_ITEMS = [
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

const LOCATION_ITEMS = [
  {
    code: "00",
    name: "부산",
  },
  {
    code: "01",
    name: "서울",
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
  location: "01",
  comment: "",
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
      <Form>
        <FormRow>
          <FormGroup as={Row}>
            <Label sm={"4"} required>
              성명
            </Label>
            <Col sm={"8"}>
              <InputBox
                name={"name"}
                placeholder={"성명"}
                isValid={false}
                value={fieldValues.name}
                handleChangeField={handleChangeField}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Label sm={"4"}>이메일</Label>
            <Col sm={"8"}>
              <InputBox
                name={"email"}
                prefix={"pre"}
                postfix={"post"}
                value={fieldValues.email}
                handleChangeField={handleChangeField}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Label sm={"4"}>패스워드</Label>
            <Col sm={"8"}>
              <InputBox name={"password"} isPassword placeholder={"Password"} />
            </Col>
          </FormGroup>
        </FormRow>
      </Form>
      <hr />
      <h4>Textarea</h4>
      <Form>
        <FormRow xs={"1"} sm={"2"} md={"2"} lg={"2"} xl={"2"} xxl={"2"}>
          <FormGroup as={Row}>
            <Label sm={"4"}>비고</Label>
            <Col sm={"8"}>
              <Textarea
                name={"comment"}
                value={fieldValues.comment}
                handleChangeField={handleChangeField}
              />
            </Col>
          </FormGroup>
        </FormRow>
      </Form>
      <hr />
      <h4>SelectBox</h4>
      <Form>
        <FormRow>
          <FormGroup as={Row}>
            <Label sm={"4"}>직위</Label>
            <Col sm={"8"}>
              <Select
                name={"position"}
                items={POSITION_ITEMS}
                selectOption={"choose"}
                value={fieldValues.position}
                handleChangeField={handleChangeField}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Label sm={"4"}>언어</Label>
            <Col sm={"8"}>
              <Select
                name={"skills"}
                items={SKILL_ITEMS}
                selectOption={"all"}
                multiple
                value={fieldValues.skills}
                handleChangeField={handleChangeField}
              />
            </Col>
          </FormGroup>
        </FormRow>
      </Form>
      <hr />
      <h5>Date/TimePicker</h5>
      <Form>
        <FormRow>
          <FormGroup as={Row}>
            <Label sm={"4"}>입사일자</Label>
            <Col sm={"8"}>
              <DateTimePicker
                name={"join_date"}
                value={fieldValues.join_date}
                handleChangeField={handleChangeField}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Label sm={"4"}>현재년도</Label>
            <Col sm={"8"}>
              <DateTimePicker
                name={"year"}
                type={"year"}
                value={getCurrentDate("year")}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Label sm={"4"}>현재년월</Label>
            <Col sm={"8"}>
              <DateTimePicker
                name={"yearMonth"}
                type={"yearMonth"}
                value={getCurrentDate("yearMonth")}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Label sm={"4"}>등록일시</Label>
            <Col sm={"8"}>
              <DateTimePicker
                name={"register_date"}
                type={"datetime"}
                value={fieldValues.register_date}
                handleChangeField={handleChangeField}
              />
            </Col>
          </FormGroup>
        </FormRow>
      </Form>
      <hr />
      <h5>Check/Radio Box</h5>
      <Form>
        <FormRow>
          <FormGroup as={Row}>
            <Label sm={"4"}>사용여부</Label>
            <Col sm={"8"}>
              <Check
                name={"use_yn"}
                choices={USE_YN_ITEMS}
                value={fieldValues.use_yn}
                handleChangeField={handleChangeField}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Label sm={"4"}>지역</Label>
            <Col sm={"8"}>
              <Radio
                name={"location"}
                choices={LOCATION_ITEMS}
                value={fieldValues.location}
                handleChangeField={handleChangeField}
              />
            </Col>
          </FormGroup>
        </FormRow>
      </Form>
      <hr />
      <h5>Loading</h5>
      <Loading />
    </>
  );
};

const Index: React.FC = (props) => (
  <PageProvider>
    <Sample {...props} />
  </PageProvider>
);

export default React.memo(Index);
