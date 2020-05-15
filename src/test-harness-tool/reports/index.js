import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Table } from 'react-bootstrap'
import axios from 'axios';
import TestLog from './components/testlog';
import data from './reports.json';
import styles from './reports.scss';

function createLogData(data) {
	const cases = []
	cases.push({ "color": "#00c21e", "cases": "Passed", "count": data.passed, percent: data.passedPercent});
	cases.push({ "color": "#d81a36", "cases": "Failed", "count": data.failed, percent: data.failedPercent});
	return cases;
}

function ControlledTabs(props) {
  const { data, testCasesRun, testDataList } = props
  const statusList = ['Skipped', 'Not Completed']
  const [key, setKey] = useState(data[0].cases);
  const filteredData = testDataList.filter(function (item) {
	let status = item.status
	if (statusList.indexOf(item.status) !== -1) {
		status = 'Warnings'
	}
	return key === "Total executed" ? item : status === key
  })
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
	{data.map((item, index) => {
	  const percent = item.percent ? ` (${item.percent}%)` : ''
      return (<Tab key={index} eventKey={item.cases} title={`${item.cases}: ${item.count}${percent}`}>
        <Table responsive>
		  <thead>
			<tr>
			  <th>Test Case</th>
			  <th>Project</th>
			  <th>Start Time</th>
			  <th>Duration</th>
			</tr>
		  </thead>
		  <tbody>
			{filteredData.map((item) => (
			  <tr>
				<td>{item.testCase}</td>
				<td>{item.project}</td>
				<td>{item.startTime}</td>
				<td>{item.duration}</td>
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
  const reportsRef = useRef()
  useEffect(() => {
	axios.get('reports.json').then((response) => {
	  const { data } = response
	  reportsRef.current = data
	})
  }, [])
  return (
	<>
	  <Row className={styles.section}>
        <Col md="12">
		  <div>
		    <div className={styles.headTitle}>Test Execution Summary</div>
		    <TestLog testCasesRun={data.testCasesRun} expectedDuration={data.expectedDuration} logData={createLogData(data)} />
		  </div>
		</Col>
	  </Row>
	  <ControlledTabs data={createLogData(data)} testCasesRun={data.testCasesRun} testDataList={data.testDataList} />
	</>
  );
}

export default RoutingPage;
