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
  //const {state} = location;
  const state = [
        {
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 10,
			"expectetAir": 6.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan (Fixed)",
			"productName": "Small Business Loan (Fixed)",
			"riskBand": 2,
			"termFactor": 1,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 1,
			"testTransactionNo": "TH_001_001",
			"totalRecord": 2,
			"xmlDifference": "",
			"environment": "NFT"
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 12.69,
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
		}]
  const testsetid = state[0].testSetId
  const createdby = state[0].createdBy
  const [sort, setSort] = useState({})
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
			pathname: '/reports',
			state: {data: data, executionTime: executionTime}
		})
	  })
	  .catch(() => {
		history.push({
			pathname: '/error'
		})
	  }
	  )
  }
  const [page, setPage] = useState(1)
  const setPageItem = (number) => () => {
	  setPage(number)
  }
  
  let items = [];
  const total = Math.ceil(state.length/10)
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
  const paginationData = state.slice(indexOfFirstTodo, indexOfLastTodo);
  const firstColumns = [{
	  name: 'ID',
	  key: 'id',
	  rowSpan: 2
  }, {
	  name: 'Application Identity',
	  key: 'applicationIdentity',
	  sortable: true,
	  direction: 'asc',
	  rowSpan: 2
  }, {
	  name: 'Bank Division',
	  key: 'bankDivision',
	  rowSpan: 2
  }, {
	  name: 'Product Family',
	  key: 'productFamily',
	  rowSpan: 2
  }, {
	  name: 'Product Name',
	  key: 'productName',
	  rowSpan: 2
  }, {
	  name: 'Borrowing Amount(GBP)',
	  key: 'borrowingAmount',
	  sortable: true,
	  direction: 'asc',
	  rowSpan: 2
  }, {
	  name: 'Term (Months)',
	  key: 'termFactor',
	  rowSpan: 2
  }, {
	  name: 'Risk Band',
	  key: 'riskBand',
	  rowSpan: 2
  }]
  
  if (paginationData[0].productName === 'Agri Facility') {
	Array.prototype.push.apply(firstColumns, [{
	  name: 'Start Margin',
	  key: 'startMargin',
	  rowSpan: 2
	}, {
	  name: 'Term Margin Premium',
	  key: 'termMarginPremium',
	  rowSpan: 2
	}])
  }
  
  if (paginationData[0].productName === 'Small Business Loan (Fixed)') {
	Array.prototype.push.apply(firstColumns, [{
	  name: 'Expected AIR(%)',
	  key: 'air'
	}, {
	  name: 'Expected APR(%)',
	  key: 'apr'
	}])
  }
    
  if (paginationData[0].productName === 'Overdraft' || paginationData[0].productName === 'Agri Facility') {
	  Array.prototype.push.apply(firstColumns, [{
	  name: 'Expected Margin Fee',
	  key: 'marginFee'
	}, {
	  name: 'Expected Arrangement Fee',
	  key: 'arrangementFee'
	}])
  }
  
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
		    <div className={common.environment}><span>Environment:</span> {paginationData[0].environment}</div>
			<div><span>Total Test Cases:</span> {paginationData[0].totalRecord}</div>
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>	
		  </Row>
		  <Table responsive striped bordered hover size="md">
			  <thead>
				<tr>
				  {firstColumns.map((item) => {
					const itemClassName = item.className ? ` ${item.className}`: ''
					//const className = styles.sortHeader.concat(itemClassName)
					return <th className={itemClassName} onClick={sortable(item.key, item.direction, item.sortable)}>
					  <span>{item.name}</span>
					  {item.sortable ? <span className={styles.arrow}><div className={getSortDirection(item.key)} /></span> : ''}
					</th>
				  })}
				</tr>
			  </thead>
			  <tbody>
				{paginationData.map((item) => (
				  <tr>
					<td>{item.testTransactionNo}</td>
					<td>{item.applicationIdentity}</td>
					<td>{item.bankDivision}</td>
					<td>{item.productFamily}</td>
					<td>{item.productName}</td>
					<td>{item.borrowingAmount}</td>
					<td>{item.termFactor}</td>
					<td>{item.riskBand}</td>
					{paginationData[0].productName === 'Agri Facility' &&
					  <>
					   <td>{item.startMargin}</td>
					   <td>{item.termMarginPremium}</td>
					   <td>{item.expectetMarginFee}</td>
					   <td>{item.expectetArrangementFee}</td>
					  </>
					}
					{paginationData[0].productName === 'Small Business Loan (Fixed)' &&
					  <>
					   <td>{item.expectetAir}</td>
					   <td>{item.expectetApr}</td>
					  </>
					}
					{paginationData[0].productName === 'Overdraft' &&
					  <>
					   <td>{item.expectetMarginFee}</td>
					   <td>{item.expectetArrangementFee}</td>
					  </>
					}
				  </tr>
				))}
			  </tbody>
		  </Table>
		  {state.length > 10 && <div>
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
		   <Button variant="primary" disabled={confirmDisabled} onClick={downloadScenario(`${Service.getApiRoot()}/rbs/th/testdata/generatescenarioexcel/${testsetid}/${createdby}`)}>
		    Download Test Scenarios
		   </Button>
		  </div> 
		</Col>
	  </Row>
    </Card>
  );
}

export default ServiceRequest;
