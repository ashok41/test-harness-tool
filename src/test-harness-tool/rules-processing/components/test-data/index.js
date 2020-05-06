import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styles from './test-data.scss'

function TestData() {
  const history = useHistory()
  return (
    <>
	  <Row>
		<Col md="6">
		  <Button variant="secondary" disabled className={styles.buttonAlignment}>View and Edit Test data in UI Grid</Button>{' '}
		  <Button variant="secondary" disabled className={styles.buttonAlignment}>Generate Test datasets and Save</Button>{' '}
		</Col>
		<Col md="6">
		  <div className={styles.box}>From Screen 1 - Capture the uploadedtest data in Excel & Allow user to view thesame data in UI Grid  which is Editable /Selectable for Service execution</div>
		</Col>
	  </Row>
	  <Row className={styles.section}>
		<Col md="9">
		  <div><span>Integrate Automated Test Data Generation solution</span> - Under Construction</div>
		</Col>
		<Col md="3">
		  <Button variant="primary" onClick={() => history.goBack()}>Back</Button>{' '}
		  <Button variant="primary" onClick={() => history.push({
		pathname: '/rules-processing/service-request',
		state: 'service-request'
	})}>Next</Button>
		</Col>
	   </Row>
    </>
  );
}

export default TestData
;
