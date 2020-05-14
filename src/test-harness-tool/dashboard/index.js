import React, {useState} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import styles from './dashboard.scss'

function Dashboard() {
  const history = useHistory()
  
  const [state, setState] = useState({barrowAmount: '', riskFactor:'', termFactor: ''})
  
  function handleSubmit(e) {
	  e.preventDefault();
	  buildJSON(state)
  }
  
  function validation(forms) {
	 
  }
  
  function buildJSON(forms) {
	  const barrowAmount = forms.barrowAmount.split(',');
	  const riskFactor = forms.riskFactor.split(',');
	  const termFactor = forms.termFactor.split(',');
	  let newData = []
	  barrowAmount.forEach((item, index) => {
		  const newObj = {}
		  newObj['barrowAmount'] = item;
		  newObj['riskFactor'] = riskFactor[index];
		  newObj['termFactor'] = termFactor[index];
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
  
  const onTextUpdated = (label) => (e) => {
	  const data = e.target.value;
	  const checkCommas = data.split(',')
	  const totCommas = checkCommas.length
	  const regex = /^[\d\,]+$/g
	  if (regex.test(data) && totCommas <= 3) {
	    setState({...state, [label]: data})
	  }
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
              <Form.Group controlId="barrowAmount">
				<Form.Label>Barrow Amount</Form.Label>
				<Form.Control type="text" required value={state.barrowAmount} pattern='[0-9\,]+' onChange={onTextUpdated('barrowAmount')} />
				<Form.Text className="text-muted">
				  1000,2000,3000
				</Form.Text>
		      </Form.Group>
			  <Form.Group controlId="riskFactor">
				<Form.Label>Risk Factor</Form.Label>
				<Form.Control type="text" required value={state.riskFactor} onChange={onTextUpdated('riskFactor')} />
				<Form.Text className="text-muted">
				  1,2,3
				</Form.Text>
			  </Form.Group>
			  <Form.Group controlId="termFactor">
				<Form.Label>Term Factor</Form.Label>
				<Form.Control type="text" required value={state.termFactor} onChange={onTextUpdated('termFactor')} />
				<Form.Text className="text-muted">
				  34,54,119
				</Form.Text>
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
