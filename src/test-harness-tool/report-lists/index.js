import React, {useState, useEffect} from 'react';
import { Row, Col, Card, Breadcrumb, ListGroup, Form, Button, Table, Pagination, Dropdown, DropdownButton, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import DatePicker from  'react-date-picker'
import ProfileList from '../common/profile-list'
import Service from '../common/service'
import common from '../common/common.scss'
import styles from './report-lists.scss'
	

function ReportLists() {
  const date = new Date()
  const minDate = new Date(date.getFullYear(), 0, 1)
  const initial = {from: date, to: date, business: '', data: [], environment: ''}
  const [state, setState] = useState(initial)
  const [businessAttributes, setBusinessAttributes] = useState({})
  const [error, setError] = useState('')
  const [page, setPage] = useState(1);
  const setPageItem = (number) => () => {
	  setPage(number)
  }
  
  let items = [];
  const total = Math.ceil(state.data.length/10)
  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={setPageItem(number)}>
        {number}
      </Pagination.Item>
    );
  }
  
  const indexOfLastTodo = page * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;
  const paginationData = state.data.slice(indexOfFirstTodo, indexOfLastTodo);
  
  function getBusinessAttributes() {
	  Service.get('/rbs/th/businessAttributes')
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
			"refDataKey": "PF001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 6,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Agri Facility",
			"refDataKey": "PR001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 7,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Overdraft",
			"refDataKey": "PF001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 4,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Small Business Loan",
			"refDataKey": "PR001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}, {
			"attributeId": 5,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Overdraft",
			"refDataKey": "PR001",
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

  function handleSubmit(e) {
	  const error = validation(state)
	  if (error === '') {
		setError('')
		Service.get(`/rbs/th/testsets/${formatDate(state.from)}}/${formatDate(state.to)}/${state.environment}/${state.business}`)
		.then((response) => {
		  const { data } = response
	      setState({...state, data: data})
		})
		.catch((error) => {
			const data = [
			{
				"testSetId": 1173,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1174,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}]
		    setState({...state, data: data})
		})
	  } else {
		setError(error)	
	  }
  }
  
  function validation(forms) {
	let errors = ''
	if (forms.environment === '') {
		errors = 'Please enter environment';
	} 
	if (errors === '' && forms.business === '') {
		errors = 'Please enter business';
	} 
	if (errors === '' && forms.from === null) {
		errors = 'Please enter valid from date';
	} 
	if (errors === '' && forms.to === null) {
		errors = 'Please enter valid to date';
	}
	return errors
  }
  
  function handleReset() {
	  setState({...state, ...initial})
  }
  
  const onTextUpdated = (label) => (data) => {
	  setState({...state, [label]: data})
  }
  
  const onSelectedSingleOptionChange = (label) => (e) => {
	setState({...state, [label]: e.target.value})
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
  
   return (
    <>
      <Row className={styles.section}>
        <Col md="12">
		  <Row>
		   <Col md="9">
		    <Breadcrumb>
		     <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		     <Breadcrumb.Item active>Report</Breadcrumb.Item>
		    </Breadcrumb>
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>
		  </Row>
		  <Row>
		   <Col md="12">
		   {error &&
		    <Alert key="1" className={styles.alert} variant="danger">
			  {error}
		    </Alert>
		   }
		    <Card>
			 <Card.Header>Date Range</Card.Header>
             <Card.Body>
              <Form>
			    <Row>
				  <Col md="5">
				    <Form.Group as={Row} controlId="environment">
					  <Form.Label column sm="3">Environment</Form.Label>
					  <Col sm="6">
					    <Form.Control as="select" value={state.environment} onChange={onSelectedSingleOptionChange('environment')}>
						 <option value="">Please Select</option>
						 <option value="NFT">NFT</option>
						 <option value="UAT">UAT</option>
						 <option value="Dev">Dev</option>
					    </Form.Control>
					  </Col>
				    </Form.Group>
				   </Col>
				   <Col md="6">
				    <Form.Group as={Row} controlId="business">
				     <Form.Label column sm="3">Product Name</Form.Label>
				     <Col sm="5">
				      <Form.Control as="select" value={state.business} onChange={onSelectedSingleOptionChange('business')}>
                       <option value="">Please Select</option>
					   {businessAttributes['PR001'] && businessAttributes['PR001'].map((item) => {
						  return (<option value={item.attributeId}>{item.refDataDesc}</option>)
						})}
                      </Form.Control>
				     </Col>
		            </Form.Group>
				   </Col>
				   <Col md="5">
				    <Form.Group as={Row} controlId="from">
				     <Form.Label column sm="3">From</Form.Label>
				     <Col sm="5">
				      <DatePicker
					  onChange={onTextUpdated('from')}
					  value={state.from}
					  maxDate={date}
					  minDate={minDate}
					 />
				     </Col>
		            </Form.Group>
				   </Col>
				   <Col md="6">
				    <Form.Group as={Row} controlId="to">
				     <Form.Label column sm="3">To</Form.Label>
				     <Col sm="5">
				      <DatePicker
					  onChange={onTextUpdated('to')}
					  value={state.to}
					  maxDate={date}
				      minDate={minDate}
				     />
				     </Col>
		            </Form.Group>
				   </Col>
				</Row>
				<Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
                <Button variant="primary" onClick={handleSubmit}>Generate Report</Button>	
			  </Form>
			  {state.data.length >0 && <div className={styles.tableWrapper}>
			   <Table responsive striped bordered hover size="md">
			    <thead>
				 <tr>
				  <th rowSpan="2">ID</th>
				  <th rowSpan="2">Application Identity</th>
				  <th rowSpan="2">Bank Division</th>
				  <th rowSpan="2">Product Family</th>
				  <th rowSpan="2">Product Name</th>
				  <th rowSpan="2">Borrowing Amount(GBP)</th>
				  <th rowSpan="2">Term (Months)</th>
				  <th rowSpan="2">Risk Band</th>
				 </tr>
			    </thead>
			    <tbody>
			     {paginationData.map((item) => (
				  <tr>
					<td><a href={`#reports/${item.testSetId}`}>{item.testSetId}</a></td>
					<td>{item.applicationIdentity}</td>
					<td>{item.bankDivision}</td>
					<td>{item.productFamily}</td>
					<td>{item.productName}</td>
					<td>{item.borrowingAmount}</td>
					<td>{item.riskBand}</td>
					<td>{item.termFactor}</td>
				  </tr>
				 ))}
			    </tbody>
			   </Table>
			   {state.data.length > 10 && <div>
				<Pagination>{items}</Pagination>
			  </div>}
			  </div>}
             </Card.Body>
            </Card>
		   </Col>
          </Row>		   	
        </Col>
      </Row>
    </>
  );
}

export default ReportLists;
