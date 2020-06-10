import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Breadcrumb, OverlayTrigger, Tooltip } from 'react-bootstrap'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import ProfileList from '../common/profile-list'
import styles from './pricing-tool.scss'
import common from '../common/common.scss'

function Dashboard() {
  const history = useHistory()
  const location = useLocation()
  const { state: backFormData } = location
  const initial = {borrowingAmount: '', riskBand:'', term: '', locationIdentity: '', bankDivision : '', productFamily: '', productName: ''}
  const [state, setState] = useState(backFormData ? backFormData : initial)
  const [error, setError] = useState('')
  const [businessAttributes, setBusinessAttributes] = useState({})
    
  function handleSubmit(e) {
	  e.preventDefault();
	  const error = validation(state)
	  if (error === '') {
		setError('')
		buildJSON(state)
	  } else {
		setError(error)	
	  }
  }
  
  function getBusinessAttributes() {
	  axios.get('http://localhost:8081/rbs/th/businessAttributes')
	  .then((response) => {
		const { data } = response
		let attrs = {}
		data.map((item) => {
		  if (attrs[item.refDataKey] === undefined) {
			attrs[item.refDataKey] = []
		  }
		  attrs[item.refDataKey].push(item)
		})
		setBusinessAttributes(attrs)
	  })
	  .catch(() => {
		const data = [
		{
			"attributeId": 1,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Ulster",
			"refDataKey": "AP001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 2,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Business",
			"refDataKey": "BU001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 3,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Loans",
			"refDataKey": "PR001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 4,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Small Business Loan",
			"refDataKey": "PF001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}, {
			"attributeId": 5,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Large Business Loan",
			"refDataKey": "PF001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}]
		let attrs = {}
		data.map((item) => {
		  if (attrs[item.refDataKey] === undefined) {
			attrs[item.refDataKey] = []
		  }
		  attrs[item.refDataKey].push(item)
		})
		setBusinessAttributes(attrs)
	  })
  }
  
  useEffect(() => {
	 const businessAttributesData = Object.keys(businessAttributes).length
	 if (businessAttributesData === 0) {
		getBusinessAttributes()
	 }
  }, [businessAttributes])
  
  function validation(forms) {
	let errors = ''
	if (forms.locationIdentity === '') {
		errors = 'Please enter application identity';
	} 
	if (errors === '' && forms.bankDivision === '') {
		errors = 'Please enter bank division';
	}
	if (errors === '' && forms.productFamily === '') {
		errors = 'Please enter product family';
	}
	if (errors === '' && forms.productName === '') {
		errors = 'Please enter product name';
	}
	if (errors === '' && forms.borrowingAmount === '') {
		errors = 'Please enter borrowing amount';
	} 
	if (errors === '' && forms.riskBand === '') {
		errors = 'Please enter risk band';
	}
	if (errors === '' && forms.term === '') {
		errors = 'Please enter term (months)';
	}
	return errors
  }
  
  function buildJSON(forms) {
	  const borrowingAmount = forms.borrowingAmount.split(',').map(Number);
	  const riskBand = forms.riskBand.split(',').map(Number);
	  const term = forms.term.split(',').map(Number);
	  const lists = {}
	  lists['borrowingAmount'] = borrowingAmount;
	  lists['riskFactor'] = riskBand;
	  lists['termFactor'] = term;
	  lists['applicationIdentity'] = Number(forms.locationIdentity);
	  lists['bankDivision'] = Number(forms.bankDivision);
	  lists['productFamily'] = Number(forms.productFamily);
	  lists['productName'] = Number(forms.productName);
	  lists['userId'] = "R123";
	  axios.post('http://localhost:8081/rbs/th/testdata', lists)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/rules-processing/test-data',
			state: {postData: data, formData: forms}
		})
	 })
	 .catch(() => {
		 const data = [
        {
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 10,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 2,
			"termFactor": 1,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 1,
			"testTransactionNo": "TH_001_001",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    }
		]
		  history.push({
			pathname: '/rules-processing/test-data',
			state: {postData: data, formData: forms}
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
	  const eachData = checkCommas[totCommas-1]
	  const lastBeforeData = checkCommas[totCommas-2]
	  const regex = /^[\d\,]+$/g
	  let valid = true
	  if (label === "borrowingAmount" && lastBeforeData && (Number(lastBeforeData) < 1000 || Number(lastBeforeData) > 5000)) {
		  valid = false
	  }
	  if (data === '' || (data && regex.test(data) && totCommas <= 4 && eachData !== "0" && checkCommas[0] !== "" && valid)) {
		setState({...state, [label]: data})
	  }
  }
  
  const removeUnwantedComma = (label) => (e) => {
	  const data = e.target.value;
	  const checkCommas = data.split(',')
	  const totCommas = checkCommas.length
	  const eachData = checkCommas[totCommas-2]
	  const regex = /,\s*$/
	  if (regex.test(data)) {
		setState({...state, [label]: data.replace(regex, "")})
	  }
  }
  
  const onSelectedSingleOptionChange = (label) => (e) => {
	setState({...state, [label]: e.target.value})
  }
  
  return (
    <>
      <Row className={styles.section}>
        <Col md="12">
		  <Row>
		   <Col md="9">
		    <Breadcrumb>
		     <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		     <Breadcrumb.Item active>Pricing Tool</Breadcrumb.Item>
		    </Breadcrumb>
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>
		  </Row>
		  {error &&
		    <Alert key="1" className={styles.alert} variant="danger">
			  {error}
		    </Alert>
		  }
          <Card>
            <Card.Header>Pricing Business Parameters</Card.Header>
            <Card.Body>
            <Form>
			  <Row>
			    <Col md="6">
			     <Form.Group as={Row} controlId="locationIdentity">
                   <Form.Label column sm="4">Application Identity</Form.Label>
                   <Col sm="6">
				     <Form.Control as="select" value={state.locationIdentity} onChange={onSelectedSingleOptionChange('locationIdentity')}>
                      <option value="">Please Select</option>
					  {businessAttributes['AP001'] && businessAttributes['AP001'].map((item) => {
						return (<option value={item.attributeId}>{item.refDataDesc}</option>)
					  })}
                     </Form.Control>
				   </Col>
                 </Form.Group>
			    </Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="bankDivision">
                  <Form.Label column sm="3">Bank Division</Form.Label>
                  <Col sm="6">
				    <Form.Control as="select" value={state.bankDivision} onChange={onSelectedSingleOptionChange('bankDivision')}>
                      <option value="">Please Select</option>
					  {businessAttributes['BU001'] && businessAttributes['BU001'].map((item) => {
						return (<option value={item.attributeId}>{item.refDataDesc}</option>)
					  })}
                    </Form.Control>
				   </Col>
                  </Form.Group>
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
				  <Form.Group as={Row} controlId="productFamily">
					<Form.Label column sm="4">Product Family</Form.Label>
					<Col sm="6">
					  <Form.Control as="select" value={state.productFamily} onChange={onSelectedSingleOptionChange('productFamily')}>
						<option value="">Please Select</option>
						{businessAttributes['PF001'] && businessAttributes['PF001'].map((item) => {
						  return (<option value={item.attributeId}>{item.refDataDesc}</option>)
						})}
					  </Form.Control>
					</Col>
				  </Form.Group>
				</Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="productName">
					<Form.Label column sm="3">Product Name</Form.Label>
					<Col sm="6">
					  <Form.Control as="select" value={state.productName} onChange={onSelectedSingleOptionChange('productName')}>
						<option value="">Please Select</option>
						{businessAttributes['PR001'] && businessAttributes['PR001'].map((item) => {
						  return (<option value={item.attributeId}>{item.refDataDesc}</option>)
						})}
					  </Form.Control>
					</Col>
				  </Form.Group>
				</Col>
			  </Row>
			  <Form.Group as={Row} controlId="borrowingAmount">
				<Form.Label column sm="2">Borrowing Amount</Form.Label>
				<Col sm="4" className={styles.textform}>
				  <Form.Control type="text" value={state.borrowingAmount} autoComplete="off" onChange={onTextUpdated('borrowingAmount')} onBlur={removeUnwantedComma('borrowingAmount')} />
				  <OverlayTrigger
					  placement="right"	
					  overlay={
						<Tooltip>Min: 1000, Max: 5000 Delimiter [0-9,]</Tooltip>
					  }
					>
					<div className={styles.tooltip}><div className={styles.qicon} /></div>
                  </OverlayTrigger>
				</Col>
		      </Form.Group>
			  <Form.Group as={Row} controlId="term">
				<Form.Label column sm="2">Term (Months)</Form.Label>
				<Col sm="4" className={styles.textform}>
				  <Form.Control type="text" value={state.term} autoComplete="off" onChange={onTextUpdated('term')} onBlur={removeUnwantedComma('term')} />
				  <OverlayTrigger
					  placement="right"	
					  overlay={
						<Tooltip>Delimiter [0-9,]</Tooltip>
					  }
					>
					<div className={styles.tooltip}><div className={styles.qicon} /></div>
                  </OverlayTrigger>
				</Col>
			  </Form.Group>
			  <Form.Group as={Row} controlId="riskBand">
				<Form.Label column sm="2">Risk Band</Form.Label>
				<Col sm="4" className={styles.textform}>
				  <Form.Control type="text" value={state.riskBand} autoComplete="off" onChange={onTextUpdated('riskBand')} onBlur={removeUnwantedComma('riskBand')} />
				  <OverlayTrigger
					  placement="right"	
					  overlay={
						<Tooltip>Delimiter [0-9,]</Tooltip>
					  }
					>
					<div className={styles.tooltip}><div className={styles.qicon} /></div>
                  </OverlayTrigger>
				</Col>
			  </Form.Group>
			  <Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
              <Button variant="primary" onClick={handleSubmit}>Next</Button>
            </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
