import React, {useState} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import styles from './dashboard.scss'

function Dashboard() {
  const history = useHistory()
  const initial = {borrowingAmount: '', riskBand:'', term: ''}
  const [state, setState] = useState(initial)
  const [error, setError] = useState('')
  
  function handleSubmit(e) {
	  e.preventDefault();
	  validation(state)
	  if (error === '') {
		buildJSON(state)
	  }
  }
  
  function validation(forms) {
	const errors = {borrowingAmount: '', riskBand: '', term: ''}
	if (forms.borrowingAmount.value !== '') {
		errors.borrowingAmount = 'Please enter borrowing amount';
	}
	else if (forms.riskBand.value !== '') {
		errors.riskBand = 'Please enter risk band';
	}
	else if (forms.term.value !== '') {
		errors.term = 'Please enter t (months)';
	}
  }
  
  function buildJSON(forms) {
	  const borrowingAmount = forms.borrowingAmount.split(',');
	  const riskBand = forms.riskBand.split(',');
	  const term = forms.term.split(',');
	  let postData = [];
	  borrowingAmount.forEach((item, index) => {
		  const lists = {}
		  lists['barrowAmount'] = item;
		  lists['riskFactor'] = riskBand[index];
		  lists['termFactor'] = term[index];
		  postData.push(lists)
	  })
	  axios.post('http://localhost:8081/testCases', postData)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/rules-processing/test-data',
			state: data
		  })
	  })
  }
  
  function handleReset() {
	  setState({...state, ...initial})
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
        <Col xs="4">
          <img src="https://www.mphasis.com/content/dam/mphasis-com/global/logo/logo.png" alt="mphasis logo" title="mphasis logo"/>
        </Col>
        <Col xs="8" className={styles.headerTxt}>Test Harness Tool</Col>
      </Row>
      <Row className={styles.section}>
        <Col md="4" className={styles.colRounded}>
          <Card>
            <Card.Header>Pricing Tool Menu</Card.Header>
            <Card.Body>
              <ListGroup defaultActiveKey="#/">
                <ListGroup.Item action href="#/">Upload Business Data</ListGroup.Item>
                <ListGroup.Item href="#link2">Create/View Data</ListGroup.Item>
                <ListGroup.Item href="#link3">Generate Test data</ListGroup.Item>
                <ListGroup.Item href="#link4">Configure Rule Service</ListGroup.Item>
                <ListGroup.Item href="#link5">Execute / Run</ListGroup.Item>
                <ListGroup.Item href="#link6">Test Report</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md="8" className={styles.colRounded}>
		  {error &&
		    <Alert key="1" variant="danger">
			  {error}
		    </Alert>
		  }
          <Card>
            <Card.Header>Pricing Data Parameters</Card.Header>
            <Card.Body>
            <Form>
              <Form.Group as={Row} controlId="borrowingAmount">
				<Form.Label column sm="3">Borrowing Amount</Form.Label>
				<Col sm="9">
				  <Form.Control type="text" required placeholder="1000,2000,3000" value={state.borrowingAmount} onChange={onTextUpdated('borrowingAmount')} />
				</Col>
		      </Form.Group>
			  <Form.Group as={Row} controlId="riskBand">
				<Form.Label column sm="3">Risk Band</Form.Label>
				<Col sm="9">
				  <Form.Control type="text" required placeholder="1,2,3" value={state.riskBand} onChange={onTextUpdated('riskBand')} />
				</Col>
			  </Form.Group>
			  <Form.Group as={Row} controlId="term">
				<Form.Label column sm="3">Term (Months)</Form.Label>
				<Col sm="9">
				  <Form.Control type="text" required placeholder="34,54,119" value={state.term} onChange={onTextUpdated('term')} />
				</Col>
			  </Form.Group>
              <Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
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
