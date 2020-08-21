import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table, Pagination, Card, Spinner, Breadcrumb } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import ProfileList from '../../../common/profile-list'
import Service from '../../../common/service'
import styles from './service-request.scss'
import common from '../../../common/common.scss'

function ServiceRequest() {
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const location = useLocation();
  const {state} = location;
  const testsetid = state.testSetId
  const createdby = state.createdBy
  const [sort, setSort] = useState({})
  const [error, setError] = useState('')
  const [confirmDisabled, setConfirmDisabled] = useState(false)
  
  function toTimeString(seconds) {
	return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
  }
  
  function handleSubmit() {
	  const start = Date.now();
	  setLoading(true)
	  setConfirmDisabled(true)
	  Service.get(`/rbs/th/testdata/result/${testsetid}`)
	  .then((response) => {
		  const seconds = Date.now() - start;
		  const executionTime = toTimeString(seconds/1000)
		  const { data } = response
		  history.push({
			pathname: '/generic-reports',
			state: {data: data, executionTime: executionTime}
		})
	  })
	  .catch(() => {
		history.push({
			pathname: '/error'
		})
	  })
  }
  const [page, setPage] = useState(1)
  const setPageItem = (number) => () => {
	  setPage(number)
  }
  
  let items = [];
  const total = Math.ceil(state.genericPricingTestCaseList.length/10)
  if (page > 1 && total > 5) {
    let prev = page
	items.push(<Pagination.Item onClick={setPageItem(1)} className={common.paginationArrowStartEnd}>&lt;&lt;</Pagination.Item>)
	items.push(<Pagination.Item onClick={setPageItem(--prev)} className={common.paginationArrow}>&lt;</Pagination.Item>)
  }
  let start = page > 5 ? page - 4 : 1
  const totalItems = page > 5 ? page : 5
  for (let number = start; number <= totalItems; number++) {
	if (number > total) {
		continue;
	}
	items.push(
      <Pagination.Item key={number} active={number === page} onClick={setPageItem(number)}>
        {number}
      </Pagination.Item>
    );
  }
  if (total > 5 && page < total) {
	let next = page
	items.push(<Pagination.Item onClick={setPageItem(++next)} className={common.paginationArrow}>&gt;</Pagination.Item>)
	items.push(<Pagination.Item onClick={setPageItem(total)} className={common.paginationArrowStartEnd}>&gt;&gt;</Pagination.Item>)
  }
  
  const indexOfLastTodo = page * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;
  const paginationData = state.genericPricingTestCaseList.slice(indexOfFirstTodo, indexOfLastTodo);
  const firstColumns = []
  Object.keys(paginationData[0]).forEach((item) => {
	let name = item.replace(/([A-Z])/g, ' $1')
	name = name[0].toUpperCase() + name.slice(1)
    if (paginationData[0][item] !== null && item !== 'actualMarginRate' && item !== 'testTransactionId' && item !== 'testTransactionFlag') {
		if (item === 'testTransactionNo') {
			name = 'ID'
		}
		firstColumns.push({
		  name: name,
		  key: item
		})
	}
  })
  
  const sortable = (sortKey, direction, isSortable) => () => {
    if (isSortable) {
	  let newDirection = direction
	  if (sort[sortKey]) {
		  newDirection = sort[sortKey] === 'asc' ? 'desc' : 'asc'
	  }
	  if (newDirection === 'asc') {
		state.sort((a,b) => a[sortKey] - b[sortKey])
	  }
	  if (newDirection === 'desc') {
		state.sort((a,b) => b[sortKey] - a[sortKey])
	  }
	  setSort({[sortKey]: newDirection})
	}
  }
  const getSortDirection = (key) => {
	  return !sort[key] ? '' : (sort[key] === 'desc' ? styles.arrowDown : styles.arrowUp);
  }
  
  const downloadScenario = (link) => () => {
	  window.open(link,'_blank');
	  setConfirmDisabled(true)
  }
  let methodId = state.pricingMethodName.replace(/\s/g, '')
  methodId = `${methodId[0].toLowerCase() + methodId.slice(1)}Id`
  return (
    <Card>
	  <Row className={styles.wrapper}>
	    <Col md="12">
		 <Row>
		   <Col md="9" className={common.listContainer}>
		    <Breadcrumb>
		     <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		     <Breadcrumb.Item active>Test Case Execution</Breadcrumb.Item>
		    </Breadcrumb>
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>	
		  </Row>
		  {error && 
		    <div className={styles.error}>{error}</div>
		  }
		  <div className={common.environment}>
		    <div><span>Bank Division:</span> {state.bankDivision}</div>
			<div><span>Product Family:</span> {state.productFamily}</div>
			<div><span>Product Name:</span> {state.productName}	</div>
			<div><span>Pricing Method:</span> {state.pricingMethodName}	</div>
			<div><span>Customer Deal Segment:</span> {state.customerDealSegmentName}</div>
			<div><span>{state.pricingMethodName}:</span> {state[methodId]}</div>
		    <div><span>Environment:</span> {state.environment}</div>
			<div className={common.totalRecord}><span>Total Test Cases:</span> {state.totalRecord}</div>
		  </div>
		  <Table responsive striped bordered hover size="md">
			  <thead>
				<tr>
				  {firstColumns.map((item) => {
					const colSpan = item.colSpan ? { colSpan: item.colSpan } : {}
				    const rowSpan = item.rowSpan ? { rowSpan: item.rowSpan } : {}
					const itemClassName = item.className ? ` ${item.className}`: ''
					//const className = styles.sortHeader.concat(itemClassName)
					return <th {...rowSpan} {...colSpan} className={itemClassName} onClick={sortable(item.key, item.direction, item.sortable)}>
					  <span>{item.name}</span>
					  {item.sortable ? <span className={styles.arrow}><div className={getSortDirection(item.key)} /></span> : ''}
					</th>
				  })}
				</tr>
			  </thead>
			  <tbody>
			    {paginationData.map((item, index) => {
				  return (<tr>
				  {firstColumns.map((data) => {
					return (<td>{item[data.key]}</td>)
				  })}
				  </tr>)
				})}
			  </tbody>
		  </Table>
		  {state.genericPricingTestCaseList.length > 10 && <div>
		    <Pagination>{items}</Pagination>
	      </div>}
		  <div>
		   <Button variant="primary" disabled className={styles.handleConfirm} onClick={() => history.goBack()}>
		   Back</Button>{' '}
		   {loading ? 
		    <Button variant="primary" disabled>
			 <Spinner
			  as="span"
			  animation="grow"
			  size="sm"
			  role="status"
			  aria-hidden="true"
			/>
			Inprogress...
		    </Button>
			: <Button variant="primary" onClick={handleSubmit} disabled={confirmDisabled} className={styles.handleConfirm}>Confirm & Execute</Button>
		   }{' '}
		   <Button variant="primary" disabled={confirmDisabled} onClick={downloadScenario(`${Service.getApiRoot()}/rbs/th/gp/generateselectivescenario/${testsetid}`)}>
		    Download Test Scenarios
		   </Button>
		  </div> 
		</Col>
	  </Row>
    </Card>
  );
}

export default ServiceRequest;
