import React, {useState} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import styles from './dashboard.scss'

function Dashboard() {
  const history = useHistory()
  
  const [state, setState] = useState({rules: '', labels:[]})
  
  function handleSubmit(e) {
	  e.preventDefault();
	  buildJSON(state.labels)
  }
  
  function buildJSON(labels) {
	  const data = [
		{barrowAmount: 1000, riskFactor: 4, termFactor: 34},
		{barrowAmount: 4999, riskFactor: 4, termFactor: 58},
		{barrowAmount: 30001, riskFactor: 1, termFactor: 119}
	  ]
	  let newData = []
	  data.forEach((item) => {
		const newObj = {}
		labels.forEach((key) => {
		  newObj[key] = item[key]
		})
		newData.push(newObj)
	  })
	  const postData = {"inputList": newData}
	  axios.post('http://localhost:8081', postData)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/rules-processing/test-data',
			state: data
		  })
	  })
  }
  
  function checkLables(value) {
	  const labels = state.labels
	  const isLabled = labels.findIndex((item) => ( item === value ))
	  if (isLabled !== -1) {
		labels.splice(isLabled, 1)
	  } else {
		labels.push(value)
	  }
	  return labels
  }
  
  function onSelectedSingleOptionChange(e) {
	  setState({...state, rules: e.target.value})
  }
  
  function onSelectedOptionsChange(e) {
	  const data = checkLables(e.target.value)
	  setState({...state, labels: data})
  }
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
                <Form.Control as="select" value={state.rules} onChange={onSelectedSingleOptionChange}>
                  <option value="BB">BB</option>
                  <option value="CB">CB</option>
                  <option value="OD">OD</option>
                </Form.Control>
              </Form.Group>
			  <Form.Group controlId="labels">
                <Form.Label>Select Type of Lables</Form.Label>
                <Form.Control as="select" multiple value={state.labels} onChange={onSelectedOptionsChange}>
                  <option value="barrowAmount">Borrowing Amount</option>
                  <option value="termFactor">Term (Months)</option>
                  <option value="riskFactor">Risk Band</option>
                </Form.Control>
              </Form.Group>
              <Button variant="danger">Reset</Button>{' '}
              <Button variant="primary" onClick={handleSubmit}>Next</Button>
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
