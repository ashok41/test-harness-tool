import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import TestLog from './components/testlog';
import styles from './reports.scss';

function createLogData(data) {
	const cases = []
	cases.push({ "color": "#00c21e", "cases": "Passed", "status": "Y", "count": data.passed, percent: data.passed});
	cases.push({ "color": "#d81a36", "cases": "Failed", "status": "N", "count": data.failed, percent: data.failed});
	return cases;
}

function ControlledTabs(props) {
  const { data, testCasesRun, testDataList } = props
  const statusList = ['Y', 'N']
  const [key, setKey] = useState(data[0].status);
  const filteredData = testDataList.filter(function (item) {
	return item.status === key
  })
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
	{data.map((item, index) => {
	  const percent = item.percent ? ` (${item.percent}%)` : ''
      return (<Tab key={index} eventKey={item.status} title={`${item.cases}: ${item.count}`}>
        <Table responsive striped bordered hover size="sm">
		  <thead>
			<tr>
			  <th>ID</th>
			  <th>Application Identity</th>
			  <th>Bank Division</th>
			  <th>Product Family</th>
			  <th>Product Name</th>
			  <th>Borrowing Amount</th>
			  <th>Term Factor</th>
			  <th>Risk Factor</th>
			  <th>All In Rate</th>
			  <th>Annual Percentage Rate</th>
			  <th>Actual Annual Percentage Rate</th>
			</tr>
		  </thead>
		  <tbody>
		  {filteredData.map((item) => (
			  <tr>
				<td>{item.id}</td>
				<td>{item.applicationIdentity}</td>
				<td>{item.bankDivision}</td>
				<td>{item.productFamily}</td>
				<td>{item.productName}</td>
				<td>{item.barrowAmount}</td>
				<td>{item.termFactor}</td>
				<td>{item.riskFactor}</td>
				<td>{item.allInRate}</td>
				<td>{item.annualPercentageRate}</td>
				<td>{item.expectedAnnualPercentageRate}</td>
			  </tr>
			))}
		  </tbody>
		  </Table>
      </Tab>)
	})}
    </Tabs>
  );
}

function RoutingPage() {
  const location = useLocation()
  const {state} = location;
  return (
	<>
	  <Row className={styles.section}>
        <Col md="12">
		  <div>
		    <div className={styles.headTitle}>Test Execution Summary</div>
		    <TestLog testCasesRun={state.totaltestcases} logData={createLogData(state)} />
		  </div>
		</Col>
	  </Row>
	  <ControlledTabs data={createLogData(state)} testCasesRun={state.totaltestcases} testDataList={state.testcasesResultList} />
	</>
  );
}

export default RoutingPage;
