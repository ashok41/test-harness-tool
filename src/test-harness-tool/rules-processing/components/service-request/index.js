import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styles from './service-request.scss'

function ServiceRequest() {
  const history = useHistory()
  return (
    <>
	   <Row className={styles.padBottom}>
		<Col md="6">
		  <Button variant="secondary" disabled className={styles.buttonAlignment}>Create Rules Service Request</Button>{' '}
		  <Button variant="secondary" disabled className={styles.buttonAlignment}>Configure data Input - Service Request into SOAP UI Tool</Button>{' '}
		</Col>
		<Col md="6">
		  <div className={styles.padBottom}><input type="text" size="71" placeholder="http://testdata.com.services" /></div>
		  <div className={styles.box}>From Screen 2- Add the finalGenerated/Edited Datasets to Service file </div>
		</Col>
	  </Row>
	  <div>Execute Web Service / API request with each data set, Connect to Rules Engine Server (RBS ODM calculation logic) and Execute service and generate the response in UI Grid table for review</div>
	  <Row className={styles.section}>
		<Col md="9">
	      <div className={styles.box}>Show all the Row of data in UI Grid - with Request andResponse data for comparison and validation</div>
		</Col>
		<Col md="3">
		  <Button variant="primary" onClick={() => history.goBack()}>Back</Button>{' '}
		  <Button variant="primary" onClick={() => history.push({
		pathname: '/reports',
	})}>Execute</Button>
		</Col>
	   </Row>
    </>
  );
}

export default ServiceRequest
;
