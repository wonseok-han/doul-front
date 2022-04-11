import Button from "components/Button";
import Col from "components/Col";
import Row from "components/Row";
import { PageProps } from "utils/types";

const ButtonSample: React.FC<PageProps> = () => {
  return (
    <>
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
    </>
  );
};

export default ButtonSample;
