import React from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styles from './dashboard.scss'

function Dashboard() {
  const history = useHistory()
  return (
    <Container className={styles.container}>
      <Row className={styles.header}>
        <Col xs="6">
          <img src="https://www.mphasis.com/content/dam/mphasis-com/global/logo/logo.png" alt="mphasis logo" title="mphasis logo"/>
        </Col>
        <Col xs="6" className={styles.headerTxt}>Test Harness Tool</Col>
      </Row>
      <Row className={styles.section}>
        <Col md="4">
          <Card bg="light" text="dark">
            <Card.Header>Pricing Tool Menu</Card.Header>
            <Card.Body>
              <ListGroup defaultActiveKey="#/">
                <ListGroup.Item variant="dark" action href="#/">Upload Business Data</ListGroup.Item>
                <ListGroup.Item variant="dark" href="#link2">Create/View Data</ListGroup.Item>
                <ListGroup.Item variant="dark" href="#link3">Generate Test data</ListGroup.Item>
                <ListGroup.Item variant="dark" href="#link4">Configure Rule Service</ListGroup.Item>
                <ListGroup.Item variant="dark" href="#link5">Execute / Run</ListGroup.Item>
                <ListGroup.Item variant="dark" href="#link6">Test Report</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md="8">
          <Card bg="light" text="dark">
            <Card.Header>Form 1</Card.Header>
            <Card.Body>
            <Form>
              <Form.Group controlId="businessData">
                <Form.Label>Upload Business Data</Form.Label>
                <Form.File
                  label="Excel, CSV, JSON, XML types only"
                  data-browse="Upload"
                  custom
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="businessRules">
                <Form.Label>Select Type of Business Rules</Form.Label>
                <Form.Control as="select">
                  <option>BB</option>
                  <option>CB</option>
                  <option>OD</option>
                </Form.Control>
              </Form.Group>
              <Button variant="danger">Reset</Button>{' '}
              <Button variant="primary" onClick={() => history.push({
					pathname: '/rules-processing/test-data'
			  })}>Next</Button>
            </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className={styles.footer}>&copy; {new Date().getFullYear()} Mphasis. All rights reserved</Col>
      </Row>
    </Container>
  );
}

export default Dashboard
;
