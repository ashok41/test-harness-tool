import React, {useState} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import styles from './dashboard.scss'

function Dashboard() {
  const history = useHistory()
  const initial = {labels: [], borrowingAmount: '', riskBand:'', term: ''}
  const [state, setState] = useState(initial)
  const [error, setError] = useState('')
  const labelLists = { 
	borrowingAmount: {label: 'Borrowing Amount', placeholder: '1000,2000,3000', name: 'barrowAmount', error: 'Please enter borrowing amount'},
	riskBand: {label: 'Risk Band', placeholder: '1,2,3', name: 'riskFactor', error: 'Please enter risk band'},
	term: {label: 'Term (Months)', placeholder: '34,58,119', name: 'termFactor', error: 'Please enter term (months)'}
  }
  
  function handleSubmit(e) {
	  e.preventDefault();
	  const error = validation(state)
	  if (error === '') {
		buildJSON(state)
	  } else {
		setError(error)	
	  }
  }
  
  function validation(forms) {
    let errors = ''
	if (forms.labels.length === 0) {
		errors = "Please select labels"
	}
	return errors
	/*const errors = {borrowingAmount: '', riskBand: '', term: ''}
	if (forms.borrowingAmount.value !== '') {
		errors.borrowingAmount = 'Please enter borrowing amount';
	}
	else if (forms.riskBand.value !== '') {
		errors.riskBand = 'Please enter risk band';
	}
	else if (forms.term.value !== '') {
		errors.term = 'Please enter t (months)';
	}*/
  }
  
  function buildJSON(forms) {
	  let labelsArray = {}
	  forms.labels.forEach((item) => {
		  labelsArray[item] = forms[item].split(',')
	  })
	  let postData = [];
	  const firstKey = Object.keys(labelsArray)[0]
	  labelsArray[firstKey].forEach((item, index) => {
		  const lists = {}
		  forms.labels.forEach((d) => {
			  lists[d] = labelsArray[d][index]
		  })
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
  
  function checkLables(value) {
	  const labels = state.labels
	  let deletedLabel = ''
	  const isLabled = labels.findIndex((item) => ( item === value ))
	  if (isLabled !== -1) {
		labels.splice(isLabled, 1)
		deletedLabel = value
	  } else {
	    deletedLabel = ''
		labels.unshift(value)
	  }
	  return [labels, deletedLabel]
  }
  
  function onSelectedOptionsChange(e) {
	  const data = checkLables(e.target.value)
	  const deletedOne = data[1]
	  setState({...state, labels: data[0], ...(deletedOne !='' && {[deletedOne]: ''})})
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
		    <Alert key="1" className={styles.alert} variant="danger">
			  {error}
		    </Alert>
		  }
          <Card>
            <Card.Header>Pricing Data Parameters</Card.Header>
            <Card.Body>
            <Form>
			  <Form.Group controlId="labels">
                <Form.Label>Please select lables</Form.Label>
                <Form.Control as="select" multiple value={state.labels} onChange={onSelectedOptionsChange}>
                  <option value="borrowingAmount">Borrowing Amount</option>
                  <option value="term">Term (Months)</option>
                  <option value="riskBand">Risk Band</option>
                </Form.Control>
              </Form.Group>
              {state.labels.map((item) => {
				  const formData = labelLists[item]
				  return (<Form.Group as={Row} controlId={item}>
					<Form.Label column sm="3">{formData.label}</Form.Label>
					<Col sm="9">
					  <Form.Control type="text" required placeholder={formData.placeholder} value={state[item]} onChange={onTextUpdated(item)} />
					</Col>
				  </Form.Group>)
			  })}
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
