import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table, Pagination, Card, Breadcrumb, Spinner } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import Service from '../../../common/service'
import ProfileList from '../../../common/profile-list'
import RowEditable from './row-editable'
import styles from './test-data.scss'
import common from '../../../common/common.scss'

function TestData() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const location = useLocation()
 // const {state: {postData, formData}} = location;
  const postData = 
	{
		"testSetId": 1169,
		"applicationIdentity": "Ulster",
		"bankDivision": "Commercial",
		"productFamily": "Loans",
		"productName": "Fixed Rate Loan",
		"totalRecord": 2,
		"environment": "NFT",
		"marginMethodId": "MM5",
		"marginMethodName": "CPB Trad Busi Loans",
		"customerDealSegmentId": "CDS6",
		"customerDealSegmentName": "CPB Trading Busi",
		"pricingMethodId": 8,
		"pricingMethodName": "Margin Method",
     	"genericPricingTestCaseList": [
        {
			"testTransactionId": 22846,
			"testTransactionNo": "TH_001_001",
			"totalCustomerLimit": 100,
			"turnOver": 1200,
			"balanceSheetNetAsset": 1000,
			"termFactor": 11,
			"masterGradingScale": 10,
			"sector": "Agriculture",
			"securityCoverage": 55,
	    },
		{
			"testTransactionId": 22846,
			"testTransactionNo": "TH_001_001",
			"totalCustomerLimit": 100,
			"turnOver": 1200,
			"balanceSheetNetAsset": 1000,
			"termFactor": 11,
			"masterGradingScale": 10,
			"sector": "Agriculture",
			"securityCoverage": 55,
	    },
		{
			"testTransactionId": 22846,
			"testTransactionNo": "TH_001_001",
			"totalCustomerLimit": 100,
			"turnOver": 1200,
			"balanceSheetNetAsset": 1000,
			"termFactor": 11,
			"masterGradingScale": 10,
			"sector": "Agriculture",
			"securityCoverage": 55,
	    }
		]
   }
  const [dataLists, setDataLists] = useState(postData);
  const testsetid = dataLists.testSetId
  const [sort, setSort] = useState({})
  
  const [page, setPage] = useState(1)
  
  function handleSubmit() {
	  setLoading(true)
	  Service.get(`/rbs/th/testdata/airapr/${testsetid}`)
	  .then((response) => {
		  setLoading(false)
		  const { data } = response
		  history.push({
			pathname: '/rules-processing/service-request',
			state: data
		})
	 })
	 .catch(() => {
		history.push({
			pathname: '/error'
		})
	 })
  }
  function rowEdit(data, idx) {
	  const obj = {...dataLists[idx], ...data}
	  setDataLists([...dataLists.slice(0, idx), data, ...dataLists.slice(idx + 1)])
  }
  
  const setPageItem = (number) => () => {
	  setPage(number)
  }
  
  let items = [];
  const total = Math.ceil(dataLists.length/10)
  if (page > 1 && total > 5) {
    let prev = page
	items.push(<Pagination.Item onClick={setPageItem(1)} className={common.paginationArrowStartEnd}>&lt;&lt;</Pagination.Item>)
	items.push(<Pagination.Item onClick={setPageItem(--prev)} className={common.paginationArrow}>&lt;</Pagination.Item>)
  }
  let start = page > 5 ? page - 4 : 1
  const totalItems = page > 5 ? page : 5
  for (let number = start; number <= totalItems; number++) {
	if (number > total ) {
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
  const paginationData = dataLists.genericPricingTestCaseList.slice(indexOfFirstTodo, indexOfLastTodo);
  const columns = []
  Object.keys(paginationData[0]).forEach((item) => {
	let name = item.replace(/([A-Z])/g, ' $1')
	name = name[0].toUpperCase() + name.slice(1)
    columns.push({
	  name: name,
	  key: item
    })
  })
  const columnsz = [{
	  name: 'ID',
	  key: 'id'
  }, {
	  name: 'Total Customer Limit',
	  key: 'totalCustomerLimit'
  }, {
	  name: 'Turnover',
	  key: 'Turnover'
  }, {
	  name: 'Balance Sheet Net Assets',
	  key: 'balanceSheetNetAssets'
  }, {
	  name: 'Borrowing Amount(GBP)',
	  key: 'borrowingAmount',
	  sortable: true,
	  direction: 'asc'
  }, {
	  name: 'Term (Months)',
	  key: 'termFactor'
  }, {
	  name: 'Security Coverage',
	  key: 'riskBand'
  }, {
	  name: 'Master Grading Scale',
	  key: 'masterGradingScale'
  }, {
	  name: 'Sector',
	  key: 'sector'
  }]
  
  const sortable = (sortKey, direction, isSortable) => () => {
    if (isSortable) {
	  let newDirection = direction
	  if (sort[sortKey]) {
		  newDirection = sort[sortKey] === 'asc' ? 'desc' : 'asc'
	  }
	  if (newDirection === 'asc') {
		dataLists.sort((a,b) => a[sortKey] - b[sortKey])
	  }
	  if (newDirection === 'desc') {
		dataLists.sort((a,b) => b[sortKey] - a[sortKey])
	  }
	  setDataLists([...dataLists])
	  setSort({[sortKey]: newDirection})
	}
  }
  const getSortDirection = (key) => {
	  return !sort[key] ? '' : (sort[key] === 'desc' ? styles.arrowDown : styles.arrowUp);
  }
  return (
    <Card>
	  <Row className={styles.wrapper}>
	    <Col md="12">
		 <Row>
		   <Col md="9" className={common.listContainer}>
		   <Breadcrumb>
		     <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		     <Breadcrumb.Item active>Generated Test Cases</Breadcrumb.Item>
		    </Breadcrumb>
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>
		  </Row>
		  <div className={common.environment}>
		    <div><span>Bank Division:</span> {dataLists.bankDivision}</div>
			<div><span>Product Family:</span> {dataLists.productFamily}</div>
			<div><span>Product Name:</span> {dataLists.productName}	</div>
			<div><span>Pricing Method:</span> {dataLists.pricingMethodName}	</div>
			<div><span>Customer Deal Segment:</span> {dataLists.customerDealSegmentName}</div>
			<div><span>Margin Method:</span> {dataLists.marginMethodName}</div>
		    <div><span>Environment:</span> {dataLists.environment}</div>
			<div className={common.totalRecord}><span>Total Test Cases:</span> {dataLists.totalRecord}</div>
		  </div>
		  <Table responsive striped bordered hover size="md">
			  <thead>
				<tr>
				{columns.map((item) => {
					return <th onClick={sortable(item.key, item.direction, item.sortable)}>
					  <span>{item.name}</span>
					  {item.sortable ? <span className={styles.arrow}><div className={getSortDirection(item.key)} /></span> : ''}
					</th>
				})}
				</tr>
			  </thead>
			  <tbody>
				{paginationData.map((item, index) => (
				  <RowEditable data={item} key={index} rowIndex={index} rowEdit={rowEdit} />
				))}
			  </tbody>
		  </Table>
		  {dataLists.length > 10 && <div>
		    <Pagination>{items}</Pagination>
	      </div>}
		  <div>
		    <Button variant="primary" onClick={() => history.push({
			pathname: '/pricing-tool',
			state: formData
		})}>Back</Button>{' '}
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
			: <Button variant="primary" onClick={handleSubmit}>Next</Button>
		   }
		  </div>
		</Col>
	  </Row>
    </Card>
  );
}

export default TestData;
