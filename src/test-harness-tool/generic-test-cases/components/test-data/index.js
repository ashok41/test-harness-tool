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
  const {state: {postData, formData, dynamicFormFields, tempMethod}} = location;
  const [dataLists, setDataLists] = useState(postData);
  const testsetid = dataLists.testSetId
  const [page, setPage] = useState(1)
  
  function handleSubmit() {
	  setLoading(true)
	  Service.get(`/rbs/th/gp/testdata/testsetidRate/${testsetid}`)
	  .then((response) => {
		  setLoading(false)
		  const { data } = response
		  history.push({
			pathname: '/generic-test-cases/service-request',
			state: data
		})
	 })
	 .catch(() => {
		history.push({
			pathname: '/error',
			
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
	if (paginationData[0][item] !== null && item !== 'expectedMarginRate' && item !== 'actualMarginRate' && item !== 'testTransactionId' && item !== 'testTransactionFlag') {
		if (item === 'testTransactionNo') {
			name = 'ID'
		}
		columns.push({
		  name: name,
		  key: item
		})
	}
  })
  let methodId = dataLists.pricingMethodName.toLowerCase().replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1+p2.toUpperCase(); } )
  methodId = methodId.replace(/\s/g, '')
  methodId = `${methodId[0].toLowerCase() + methodId.slice(1)}Id`
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
			{dataLists.productName && 
			  <div><span>Product Name:</span> {dataLists.productName}</div>
			}
			<div><span>Pricing Method:</span> {dataLists.pricingMethodName}	</div>
			<div><span>Customer Deal Segment:</span> {dataLists.customerDealSegmentName}</div>
			<div><span>{dataLists.pricingMethodName}:</span> {dataLists[methodId]}</div>
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
			pathname: '/pricing-method/generic-pricing-method',
			state: {formData: formData, dynamicFormFields: dynamicFormFields, tempMethod: tempMethod}
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
