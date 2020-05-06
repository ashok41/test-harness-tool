import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Table } from 'react-bootstrap'
import axios from 'axios';
import TestLog from './components/testlog';
import data from './reports.json';
import styles from './reports.scss';

function createLogData(data) {
	const cases = []
	cases.push({ "color": "#d81a36", "cases": "Failed", "count": data.failed, percent: data.failedPercent});
	cases.push({ "color": "#efe000", "cases": "Warnings", "count": data.warnings, percent: data.warningPercent});
	cases.push({ "color": "#00c21e", "cases": "Passed", "count": data.passed, percent: data.passedPercent});
	return cases;
}

function ControlledTabs(props) {
  const { data, testCasesRun, testDataList } = props
  if (data.length === 3) {
	data.unshift({ "color": "#000000", "cases": "Total executed", "count": testCasesRun})
  }
  const [key, setKey] = useState(data[0].cases);
  const filteredData = testDataList.filter(function (item) {
	return key === "Total executed" ? item : item.status === key
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
	<Container className={styles.container}>
	  <Row className={styles.header}>
        <Col xs="6">
          <img src="https://www.mphasis.com/content/dam/mphasis-com/global/logo/logo.png" alt="mphasis logo" title="mphasis logo"/>
        </Col>
        <Col xs="6" className={styles.headerTxt}>Test Harness Tool</Col>
      </Row>
	  <Row className={styles.section}>
        <Col md="12">
		  <div>
		    <div className={styles.headTitle}>Test Execution Summary</div>
		    <TestLog testCasesRun={data.testCasesRun} expectedDuration={data.expectedDuration} logData={createLogData(data)} />
		  </div>
		</Col>
	  </Row>
	  <ControlledTabs data={createLogData(data)} testCasesRun={data.testCasesRun} testDataList={data.testDataList} />
	  <Row>
        <Col className={styles.footer}>&copy; {new Date().getFullYear()} Mphasis. All rights reserved</Col>
      </Row>
	</Container>
  );
}

export default RoutingPage
;
