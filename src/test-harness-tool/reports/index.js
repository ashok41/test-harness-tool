import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Table, Pagination, Card, DropdownButton, Dropdown, Breadcrumb } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import ProfileList from '../common/profile-list'
import TestLog from './components/testlog';
import Service from '../common/service'
import styles from './reports.scss';
import common from '../common/common.scss';

function createLogData(data) {
	const cases = []
	cases.push({ "color": "#00c21e", "cases": "Passed", "status": "Y", "count": data.passed, percent: data.passedPercent});
	cases.push({ "color": "#d81a36", "cases": "Failed", "status": "N", "count": data.failed, percent: data.failedPercent});
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
  if (page[key] > 1) {
    let prev = page[key]
	items.push(<Pagination.Item onClick={setPageItem(--prev)}>Prev</Pagination.Item>)
  }
  for (let number = 1; number <= total; number++) {
	if (number > 5 ) {
		continue;
	}
	items.push(
      <Pagination.Item key={number} active={number === page[key]} onClick={setPageItem(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  if (total > 5) {
	let next = page[key]
	items.push(<Pagination.Item onClick={setPageItem(++next)}>Next</Pagination.Item>)
  }
  const indexOfLastTodo = page[key] * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;
  const paginationData = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
  const firstColumns = [{
	  name: 'ID',
	  key: 'id',
	  rowSpan: 2,
  }, {
	  name: 'Application Identity',
	  key: 'applicationIdentity',
	  rowSpan: 2,
  }, {
	  name: 'Bank Division',
	  key: 'bankDivision',
	  rowSpan: 2,
  }, {
	  name: 'Product Family',
	  key: 'productFamily',
	  rowSpan: 2,
  }, {
	  name: 'Product Name',
	  key: 'productName',
	  rowSpan: 2,
  }, {
	  name: 'Borrowing Amount(GBP)',
	  key: 'borrowingAmount',
	  rowSpan: 2,
  }, {
	  name: 'Term (Months)',
	  key: 'termFactor',
	  rowSpan: 2,
  }, {
	  name: 'Risk Band',
	  key: 'riskBand',
	  rowSpan: 2,
  }]
  if (paginationData[0].productName === 'Agri Facility') {
	Array.prototype.push.apply(firstColumns, [{
	  name: 'Start Margin',
	  key: 'startMargin'
	}, {
	  name: 'Term Margin Premium',
	  key: 'termMarginPremium'
	}])
  }
  Array.prototype.push.apply(firstColumns, [{
	  name: 'Expected',
	  key: 'expected',
	  className: styles.rateHead,
	  colSpan: 2,
	}, {
	  name: 'Actual',
	  key: 'actual',
	  className: styles.actualHead,
	  colSpan: 2,
  }])
  const secondColumns = []
  if (paginationData[0].productName === 'Small Business Loan (Fixed)') {
	Array.prototype.push.apply(secondColumns, [{
	  name: 'AIR(%)',
	  key: 'air'
	}, {
	  name: 'APR(%)',
	  key: 'apr'
	}, {
	  name: 'AIR(%)',
	  key: 'air'
	}, {
	  name: 'APR(%)',
	  key: 'apr'
	}])
  }
  if (paginationData[0].productName === 'Overdraft' || paginationData[0].productName === 'Agri Facility') {
	Array.prototype.push.apply(secondColumns, [{
	  name: 'Margin Fee',
	  key: 'marginFee'
	}, {
	  name: 'Arrangement Fee',
	  key: 'arrangementFee'
	}, {
	  name: 'Margin Fee',
	  key: 'marginFee'
	}, {
	  name: 'Arrangement Fee',
	  key: 'arrangementFee'
	}])
  }
  
  return (
    <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
	{data.map((item, index) => {
	  const percent = item.percent ? ` (${item.percent}%)` : ''
      return (<Tab key={index} eventKey={item.status} title={`${item.cases}: ${item.count}${percent}`}>
        <Table responsive striped bordered hover size="md">
		  <thead>
			<tr>
			  {firstColumns.map((item) => {
				const colSpan = item.colSpan ? { colSpan: item.colSpan } : {}
				const rowSpan = item.rowSpan ? { rowSpan: item.rowSpan } : {}
				const className = item.className ? { className: item.className } : {}
				return <th {...rowSpan} {...colSpan} {...className}>
				  {item.name}
				</th>
		      })}
			</tr>
			<tr>
			  {secondColumns.map((item2) => {
				return <th>
				  {item2.name}
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
				   <td>{item.actualMarginFee}</td>
				   <td>{item.actualArrangementFee}</td> 
			  	  </>
				}
				{paginationData[0].productName === 'Small Business Loan (Fixed)' &&
				  <>
				   <td>{item.expectetAir}</td>
				   <td>{item.expectetApr}</td>
				   <td>{item.actualAir}</td>
				   <td>{item.actualApr}</td>
			  	  </>
				}
				{paginationData[0].productName === 'Overdraft' &&
				  <>
				   <td>{item.expectetMarginFee}</td>
				   <td>{item.expectetArrangementFee}</td>
				   <td>{item.actualMarginFee}</td>
				   <td>{item.actualArrangementFee}</td>
			  	  </>
				}
			  </tr>
			))}
		  </tbody>
		  </Table>
		  {filteredData.length > 10 && <div>
		    <Pagination>{items}</Pagination>
	      </div>}
      </Tab>)
	})}
    </Tabs>
  );
}

function RoutingPage() {
  const location = useLocation();
  const [file, setFile] = useState('')
  const {state: {data, executionTime}} = location
  data['passedPercent'] = Math.round((data.passed/data.totalTestCases) * 100);
  data['failedPercent'] = Math.round((data.failed/data.totalTestCases) * 100);
  
  return (
	<Row className={styles.container}>
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
		 <div className={common.environment}><span>Environment:</span> {data.environment}</div>
		</Card.Header>
	    <Card.Body className={styles.cardBody}>
		  <div className={styles.relative}>
		   <div className={styles.download}>
		    <DropdownButton id="dropdown-basic-button" className={styles.dropdown} title="Download Report">
			  <Dropdown.Item href={`http://localhost:8081/rbs/th/testdata/generatepdf/${data.testcasesResultList[0].testSetId}`} download>PDF</Dropdown.Item>
			  <Dropdown.Item href={`http://localhost:8081/rbs/th/testdata/generateexcel/${data.testcasesResultList[0].testSetId}`} download>Excel</Dropdown.Item>
			 </DropdownButton>
		    <Button variant="primary" disabled className={styles.dropdown}>Email Report</Button>
		    <Button variant="primary" disabled>Print</Button>
		   </div>
		 </div>
		  <div>
		    <TestLog testCasesRun={data.totalTestCases} executionTime={executionTime} logData={createLogData(data)} />
		  </div>
		 </Card.Body>
	  </Card>
	  <div className={styles.tabWrapper}>
	   <Card>
	    <Card.Body>
	     <ControlledTabs data={createLogData(data)} testCasesRun={data.totalTestCases} testDataList={data.testcasesResultList} />
		</Card.Body>
	   </Card>
	  </div>
	  </Col>
	</Row>
  );
}

export default RoutingPage;
