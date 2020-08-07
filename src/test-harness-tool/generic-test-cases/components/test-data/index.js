import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table, Pagination, Card, Breadcrumb, Spinner } from 'react-bootstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Service from '../../../common/service'
import ProfileList from '../../../common/profile-list'
import styles from './test-data.scss'
import common from '../../../common/common.scss'

function TestData() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const {state: {postData, formData}} = location;
  const [dataLists, setDataLists] = useState(postData);
  const testsetid = dataLists.testSetId
  
  const [page, setPage] = useState(1)
  
  function handleSubmit() {
	  setLoading(true)
	  Service.get(`/rbs/th/gp/testdata/airapr/${testsetid}`)
	  .then((response) => {
		  setLoading(false)
		  const { data } = response
		  history.push({
			pathname: '/generic-test-cases/service-request',
			state: data
		})
	 })
	 .catch(() => {
		 setLoading(false)
		 const data = {
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
				"expectedMarginRate": 55.1,
				"actualMarginRate": 33.4
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
				"expectedMarginRate": 55.1,
				"actualMarginRate": 33.4
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
				"expectedMarginRate": 55.1,
				"actualMarginRate": 33.4
			}
		]
		}
		  history.push({
			pathname: '/generic-test-cases/service-request',
			state: data
		})
	 })
  }
 
  const setPageItem = (number) => () => {
	  setPage(number)
  }
  
  let items = [];
  const total = Math.ceil(dataLists.genericPricingTestCaseList.length/10)
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
	if (item !== 'expectedMarginRate' && item !== 'actualMarginRate') {
		columns.push({
		  name: name,
		  key: item
		})
	}
  })
   
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
					return <th>
					  <span>{item.name}</span>
					</th>
				})}
				</tr>
			  </thead>
			  <tbody>
				{paginationData.map((item, index) => {
				  return (<tr>
				  {columns.map((data) => {
					return (<td>{item[data.key]}</td>)
				  })}
				  </tr>)
				})}
			  </tbody>
		  </Table>
		  {dataLists.genericPricingTestCaseList.length > 10 && <div>
		    <Pagination>{items}</Pagination>
	      </div>}
		  <div>
		    <Button variant="primary" onClick={() => history.push({
			pathname: '/generic-pricing-method',
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