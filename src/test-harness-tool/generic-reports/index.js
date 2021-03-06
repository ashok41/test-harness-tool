 import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Table, Pagination, Card, DropdownButton, Dropdown, Breadcrumb, Spinner } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import ProfileList from '../common/profile-list'
import TestLog from '../common/testlog';
import Service from '../common/service'
import styles from './reports.scss';
import common from '../common/common.scss';

function createLogData(data) {
	const cases = []
	cases.push({ "color": "#d81a36", "cases": "Failed", "status": "N", "count": data.failed, "className": styles.failed, percent: data.failedPercent});
	if (data.passed  <= 0) {
		cases.push({ "color": "#00c21e", "cases": "Passed", "status": "Y", "count": data.passed, "className": styles.passed, percent: data.passedPercent});
	} else {
		cases.unshift({ "color": "#00c21e", "cases": "Passed", "status": "Y", "count": data.passed, "className": styles.passed, percent: data.passedPercent});
	}
	return cases;
}

function ControlledTabs(props) {
  const { data, testCasesRun, testDataList } = props
  const statusList = ['Y', 'N']
  const [key, setKey] = useState(data[0].status);
  const [page, setPage] = useState({'Y': 1, 'N': 1})
  
  const filteredData = testDataList.filter(function (item) {
	return item.testTransactionFlag === key
  })
  
  const setPageItem = (number) => () => {
	  setPage({...page, [key]: number})
  }
  let items = [];
  const total = Math.ceil(filteredData.length/10)
  if (page[key] > 1 && total > 5) {
    let prev = page[key]
	items.push(<Pagination.Item onClick={setPageItem(1)} className={common.paginationArrowStartEnd}>&lt;&lt;</Pagination.Item>)
	items.push(<Pagination.Item onClick={setPageItem(--prev)} className={common.paginationArrow}>&lt;</Pagination.Item>)
  }
  let start = page[key] > 5 ? page[key] - 4 : 1
  const totalItems = page[key] > 5 ? page[key] : 5
  
  for (let number = start; number <= totalItems; number++) {
	if (number > total) {
		continue;
	}
	items.push(
      <Pagination.Item key={number} active={number === page[key]} onClick={setPageItem(number)}>
        {number}
      </Pagination.Item>
    );
  }
   
  if (total > 5 && page[key] < total) {
	let next = page[key]
	items.push(<Pagination.Item onClick={setPageItem(++next)} className={common.paginationArrow}>&gt;</Pagination.Item>)
	items.push(<Pagination.Item onClick={setPageItem(total)} className={common.paginationArrowStartEnd}>&gt;&gt;</Pagination.Item>)
  }
  const indexOfLastTodo = page[key] * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;
  const paginationData = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
  const firstColumns = []
  Object.keys(paginationData[0]).forEach((item) => {
	let name = item.replace(/([A-Z])/g, ' $1')
	name = name[0].toUpperCase() + name.slice(1)
    if (item !== 'testTransactionId' && item !== 'testTransactionFlag' && item !== 'color') {
		if (item === 'testTransactionNo') {
			name = 'ID'
		}
		firstColumns.push({
		  name: name,
		  key: item
		})
	}
  })
  
  return (
    <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
	  className={styles.reportTabs}
    >
	{data.map((item, index) => {
	  const percent = item.percent ? ` (${item.percent}%)` : ''
      return (<Tab key={index} eventKey={item.status} tabClassName={item.className} title={`${item.cases}: ${item.count}${percent}`}>
        {filteredData.length <= 0 &&
			<div className={styles.noRecords}>No Records to Display</div>
		}
		{filteredData.length > 0 &&
		<div>
		<Table responsive striped bordered hover size="md">
		  <thead>
			<tr>
			  {firstColumns.map((item) => {
				const colSpan = item.colSpan ? { colSpan: item.colSpan } : {}
				const rowSpan = item.rowSpan ? { rowSpan: item.rowSpan } : {}
				const className = item.className ? { className: item.className } : {}
				return <th {...rowSpan} {...colSpan} {...className}>
				  <div>{item.name}</div>
				</th>
		      })}
			</tr>
		  </thead>
		  <tbody>
		  {paginationData.map((item) => (
		    <tr>
			  {firstColumns.map((data) => {
				let color = {}
				if (data.key === 'expectetAir') {
					color = {backgroundColor: item['color'], fontWeight: 'bold', color: '#fff'}
				}
				return (<td style={color}>{item[data.key]}</td>)
			  })}
			  </tr>
			))}
		  </tbody>
		</Table></div>}
		  {filteredData.length > 10 && <div>
		    <Pagination>{items}</Pagination>
	      </div>}
      </Tab>)
	})}
    </Tabs>
  );
}

function RoutingPage() {
  const [file, setFile] = useState('')
  const params = useParams();
  const { slug, slug1 } = params;
  let reportsData = {data: {}, executionTime: ''}
  if (!slug) { 
	const location = useLocation();
	const {state: {data, executionTime}} = location
	reportsData.data = data
	reportsData.executionTime = executionTime
  }
  const [reports, setReports] = useState(reportsData)
  if (Object.keys(reports.data).length > 0) {
	reports.data['passedPercent'] = Math.round((reports.data.passed/reports.data.totalRecord) * 100);
	reports.data['failedPercent'] = Math.round((reports.data.failed/reports.data.totalRecord) * 100);
  }
  
  useEffect(() => {
	if (slug) {
	  Service.get(`/rbs/th/gp/generic-reports/${slug}`)
		.then((response) => {
		  const { data } = response
	      setReports({...reports, data: data, noRecords: false})
		})
		.catch((error) => {
	      const data = {
			"totalRecord": 27,
			"passed": 24,
			"failed": 3,
			"bankDivision": "Commercial",
			"productFamily": "Overdraft",
			"productName": "",
			"pricingMethodName": "Fee Method",
			"pricingMethodId": "9",
			"feeMethodId": "FM23",
			"feeMethodName": "FM23",
			"environment": "NFT",
			"customerDealSegmentName": "CPB REF Large Commercial 2",
			"genericPricingTestCaseList": [
			{
					"actualAir": 7.6,
					"actualApr": 0.6,
					"applicationIdentity": "Ulster",
					"bankDivision": "Business",
					"borrowingAmount": 100,
					"expectetAir": 6,
					"expectetApr": 0,
					"productFamily": "Loan",
					"productName": "Small Business Loan (Fixed)",
					"riskBand": 3,
					"termFactor": 2,
					"testSetId": 1,
					"testTransactionFlag": "Y",
					"testTransactionId": 2,
					"testTransactionNo": "TH_001_001",
					"totalRecord": 2,
					"color": "#ff0000"
				},
				{
					"actualAir": 7.6,
					"actualApr": 0.6,
					"applicationIdentity": "Ulster",
					"bankDivision": "Business",
					"borrowingAmount": 100,
					"expectetAir": 6,
					"expectetApr": 0,
					"productFamily": "Loan",
					"productName": "Small Business Loan (Fixed)",
					"riskBand": 3,
					"termFactor": 2,
					"testSetId": 1,
					"testTransactionFlag": "Y",
					"testTransactionId": 2,
					"testTransactionNo": "TH_001_001",
					"totalRecord": 2,
					"color": "#002d64"
				},
				{
					"actualAir": 7.6,
					"actualApr": 0.6,
					"applicationIdentity": "Ulster",
					"bankDivision": "Business",
					"borrowingAmount": 100,
					"expectetAir": 6,
					"expectetApr": 0,
					"productFamily": "Loan",
					"productName": "Small Business Loan (Fixed)",
					"riskBand": 3,
					"termFactor": 2,
					"testSetId": 1,
					"testTransactionFlag": "Y",
					"testTransactionId": 2,
					"testTransactionNo": "TH_001_001",
					"totalRecord": 2,
					"color": "#00c21e"
				}
			]
		  } 
	      setReports({...reports, data: data})
		})
	}
  }, slug)
  
  const toDownloadLink = (link) => () => {
    window.open(link,'_blank');
  }
  const resultsData = reports.data.genericPricingTestCaseList
  let methodId = reports.data.pricingMethodName
  if (methodId) {
    methodId = methodId.toLowerCase().replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1+p2.toUpperCase(); } )
    methodId = methodId.replace(/\s/g, '')
    methodId = `${methodId[0].toLowerCase() + methodId.slice(1)}Name`
  }
  return (
	<Row className={styles.container}>
	{reports.noRecords &&
		<div>No records found</div>
	}
	{Object.keys(reports.data).length > 0 ?
	<Col md="12">
	  <Row>
	   <Col md="9">
		<Breadcrumb>
		 <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		 <Breadcrumb.Item active>Reports</Breadcrumb.Item>
		</Breadcrumb>
	   </Col>
	   <Col md="3">
		<ProfileList />
	   </Col>
	  </Row>
	  <Card>
	    <Card.Header className={styles.headerContainer}>
		 <div>Test Execution Summary</div>
		 <div className={styles.download}>
		    <DropdownButton id="dropdown-basic-button" className={styles.dropdown} title="Download Report">
			  <Dropdown.Item onClick={toDownloadLink(`${Service.getApiRoot()}/rbs/th/testdata/generatepdf/${reports.data.testSetId}`)}>PDF</Dropdown.Item>
			  <Dropdown.Item onClick={toDownloadLink(`${Service.getApiRoot()}/rbs/th/gp/downloadtestcaseexcelreport/${reports.data.testSetId}/${localStorage.getItem('logged')}`)} >Excel</Dropdown.Item>
			</DropdownButton>
	     </div>
		</Card.Header>
	    <Card.Body className={styles.cardBody}>
		  <div>
			<Row>
			<Col md="5">
		     <TestLog testCasesRun={reports.data.totalRecord} executionTime={reports.executionTime} logData={createLogData(reports.data)} />
			</Col>
			 <Col md="7">
			  <div className={common.environment}>
		       <div><span>Bank Division:</span> {reports.data.bankDivision}</div>
			   <div><span>Product Family:</span> {reports.data.productFamily}</div>
			   <div><span>Product Name:</span> {reports.data.productName}	</div>
			   <div><span>Pricing Method:</span> {reports.data.pricingMethodName}	</div>
			   <div><span>Customer Deal Segment:</span> {reports.data.customerDealSegmentName}</div>
			   <div><span>{reports.data.pricingMethodName}:</span> {reports.data[methodId]}</div>
		       <div><span>Environment:</span> {reports.data.environment}</div>
			   <div className={styles.totalRecord}><span>Total Test Cases:</span> {reports.data.totalRecord}</div>
		      </div>
			 </Col>
			</Row>
		  </div>
		 </Card.Body>
	  </Card>
	  <div className={styles.tabWrapper}>
	   <Card>
	    <Card.Body>
	     <ControlledTabs data={createLogData(reports.data)} testCasesRun={reports.data.totalRecord} testDataList={resultsData} />
		</Card.Body>
	   </Card>
	  </div>
	</Col> :
	<div className={styles.overlayContainer}>
	  <Spinner animation="border" role="status">
		<span className="sr-only">Loading...</span>
	  </Spinner>
	</div>
	}
	</Row>
  );
}

export default RoutingPage;
