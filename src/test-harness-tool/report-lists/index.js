import React, {useState} from 'react';
import { Row, Col, Card, Breadcrumb, ListGroup, Form, Button, Table, Pagination, Dropdown, DropdownButton, Alert } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import DatePicker from  'react-date-picker'
import ProfileList from '../common/profile-list'
import data from './reports.json';
import common from '../common/common.scss'
import styles from './report-lists.scss'
	

function ReportLists() {
  const date = new Date()
  const minDate = new Date(date.getFullYear(), 0, 1)
  const initial = {from: date, to: date, business: '', data: []}
  const [state, setState] = useState(initial)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1);
  const params = useParams()
  const { slug } = params
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

  const leftMenu = {
	  "date-range": {"url": "#/report-lists", "name": "Date Range"},
	  "business-report": {"name": "#/report-lists", "name": "Business Report"}
  }
  
  function handleSubmit(e) {
	  const error = validation(state)
	  if (error === '') {
		setError('')	
	    setState({...state, data: data})
	  } else {
		setError(error)	
	  }
  }
  
  function validation(forms) {
	let errors = ''
	if (forms.from === null) {
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
			 <Card.Header>{leftMenu[slug].name}</Card.Header>
             <Card.Body>
              <Form>
			    {slug === "business-report" && <Row><Col md="8">
                 <Form.Group as={Row} controlId="business">
				  <Form.Label column sm="2">Product Name</Form.Label>
				  <Col sm="4">
				   <Form.Control as="select" value={state.business} onChange={onSelectedSingleOptionChange('business')}>
                      <option value="">Please Select</option>
					  <option value="01">Small Business</option>
                   </Form.Control>
				  </Col>
		         </Form.Group>
			    </Col></Row>}
			    {((slug === "business-report" && state.business != "") || (slug === "date-range")) &&
				 <>
				  <Row>
				   <Col md="12" className={styles.dateBox}>
				    <div className={slug === "business-report" ? styles.listBox :styles.fromBox}>From</div>
				    <div className={styles.listBox}>
				     <DatePicker
					  onChange={onTextUpdated('from')}
					  value={state.from}
					  maxDate={date}
					  minDate={minDate}
					 />
				    </div>
				    <div className={styles.toBox}>To</div>
				    <div className={styles.toBox}>
				     <DatePicker
					  onChange={onTextUpdated('to')}
					  value={state.to}
					  maxDate={date}
				      minDate={minDate}
				     />
				    </div>
				   </Col>
				  </Row>
				  <Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
                  <Button variant="primary" onClick={handleSubmit}>Generate Report</Button>
				 </>
				}
			  </Form>
			  {state.data.length >0 && <div className={styles.tableWrapper}>
			   <div className={styles.buttonBox}>
			    <DropdownButton id="dropdown-basic-button" className={styles.dropdown} title="Download Report">
			     <Dropdown.Item href="#">PDF</Dropdown.Item>
			     <Dropdown.Item href="#">Excel</Dropdown.Item>
			    </DropdownButton>
		        <Button variant="primary" disabled className={styles.dropdown}>Email Report</Button>
		        <Button variant="primary" disabled>Print</Button>
			   </div>
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
				  <th colSpan="2" className={styles.rateHead}>Expected</th>
				  <th colSpan="2" className={styles.actualHead}>Actual</th>
				 </tr>
				 <tr>
				  <th className={styles.rate}>AIR(%)</th>
				  <th className={styles.rate}>APR(%)</th>
				  <th className={styles.actual}>AIR(%)</th>
				  <th className={styles.actual}>APR(%)</th>
				 </tr>
			    </thead>
			    <tbody>
			     {paginationData.map((item) => (
				  <tr>
					<td>{item.id}</td>
					<td>{item.applicationIdentity}</td>
					<td>{item.bankDivision}</td>
					<td>{item.productFamily}</td>
					<td>{item.productName}</td>
					<td>{item.barrowAmount}</td>
					<td>{item.termFactor}</td>
					<td>{item.riskFactor}</td>
					<td className={styles.rate}>{item.expectedAllInRate}</td>
					<td className={styles.rate}>{item.expectedAnnualPercentageRate}</td>
					<td className={styles.actual}>{item.allInRate}</td>
					<td className={styles.actual}>{item.annualPercentageRate}</td>
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
