import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Table, Pagination, Card, DropdownButton,Dropdown } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import TestLog from './components/testlog';
import styles from './reports.scss';

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
	return item.status === key
  })
  const setPageItem = (number) => () => {
	  setPage({...page, [key]: number})
  }
  let items = [];
  const total = Math.ceil(filteredData.length/10)
  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page[key]} onClick={setPageItem(number)}>
        {number}
      </Pagination.Item>
    );
  }
  const indexOfLastTodo = page[key] * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;
  const paginationData = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
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
  const {state} = location;
  
  state['passedPercent'] = Math.round((state.passed/state.totaltestcases) * 100);
  state['failedPercent'] = Math.round((state.failed/state.totaltestcases) * 100);
  return (
	<div className={styles.container}>
	  <Card>
	    <Card.Header>Test Execution Summary</Card.Header>
	    <Card.Body className={styles.cardBody}>
		  <div className={styles.relative}>
		   <div className={styles.download}>
		    <DropdownButton id="dropdown-basic-button" className={styles.dropdown} title="Download Report">
			  <Dropdown.Item href="#">PDF</Dropdown.Item>
			  <Dropdown.Item href="#">Excel</Dropdown.Item>
			 </DropdownButton>
		    <Button variant="primary" disabled className={styles.dropdown}>Email Report</Button>
		    <Button variant="primary" disabled>Print</Button>
		   </div>
		 </div>
		  <div>
		    <TestLog testCasesRun={state.totaltestcases} logData={createLogData(state)} />
		  </div>
		 </Card.Body>
	  </Card>
	  <div className={styles.tabWrapper}>
	   <Card>
	    <Card.Body>
	     <ControlledTabs data={createLogData(state)} testCasesRun={state.totaltestcases} testDataList={state.testcasesResultList} />
		</Card.Body>
	   </Card>
	  </div>
	</div>
  );
}

export default RoutingPage;
