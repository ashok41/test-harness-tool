import React, {useState} from 'react';
import { Row, Col, Card, Breadcrumb, ListGroup, Form, Button, Table, Pagination } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import ProfileList from '../common/profile-list'
import data from './reports.json';
import common from '../common/common.scss'
import styles from './report-lists.scss'
	

function ReportLists() {
  const initial = {from: '', to: '', business: '', data: []}
  const [state, setState] = useState(initial)
  const [list, setList] = useState('date-range')
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

  const leftMenu = {
	  "date-range": {"url": "#/report-lists", "name": "Date Range"},
	  "business-report": {"name": "#/report-lists", "name": "Business Report"}
  }
  
  function handleSubmit(e) {
	  setState({...state, data: data})
  }
  
  function handleReset() {
	  setState({...state, ...initial})
  }
  
  const onTextUpdated = (label) => (e) => {
	  const data = e.target.value;
	  setState({...state, [label]: data})
  }
  
  const menuOpen = (list) => (e) => {
	  setState(initial)
	  setList(list)
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
		   <Col md="3">
            <Card bg="light" text="dark">
             <Card.Body>
              <ListGroup defaultActiveKey={leftMenu[list].url}>
                <ListGroup.Item variant="dark" action href="#/report-lists" onClick={menuOpen('date-range')}>Date Range</ListGroup.Item>
                <ListGroup.Item variant="dark" href="#/report-lists/business-report" onClick={menuOpen('business-report')}>Business Report</ListGroup.Item>
              </ListGroup>
             </Card.Body>
            </Card>
           </Col>
		   <Col md="9">
		    <Card>
			 <Card.Header>{leftMenu[list].name}</Card.Header>
             <Card.Body>
              <Form>
			   <Row>
			   {list === "business-report" && <Col md="12">
                 <Form.Group as={Row} controlId="business">
				  <Form.Label column sm="2">Business</Form.Label>
				  <Col sm="4">
				   <Form.Control type="text" value={state.business} onChange={onTextUpdated('business')} />
				  </Col>
		         </Form.Group>
			   </Col>}
			    <Col md="6">
                 <Form.Group as={Row} controlId="from">
				  <Form.Label column sm="4">From</Form.Label>
				  <Col sm="8">
				   <Form.Control type="text" value={state.from} onChange={onTextUpdated('from')} />
				  </Col>
		         </Form.Group>
				</Col>
				<Col md="6">
			     <Form.Group as={Row} controlId="to">
				  <Form.Label column sm="2">To</Form.Label>
				  <Col sm="8">
				   <Form.Control type="text" value={state.to} onChange={onTextUpdated('to')} />
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
