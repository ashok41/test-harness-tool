import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table, Spinner } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import styles from './test-data.scss'

function TestData() {
  
  const history = useHistory()
  const location = useLocation()
  const {state} = location
    
  return (
    <Container className={styles.container}>
	 <Row className={styles.header}>
        <Col xs="4">
          <img src="https://www.mphasis.com/content/dam/mphasis-com/global/logo/logo.png" alt="mphasis logo" title="mphasis logo"/>
        </Col>
        <Col xs="8" className={styles.headerTxt}>Test Harness Tool</Col>
      </Row>
	  <Row className={styles.padTop}>
	    <Col md="12">
		  <Table responsive striped bordered hover>
			  <thead>
				<tr>
				  <th>ID</th>
				  <th>Location Identity</th>
				  <th>Bank Division</th>
				  <th>Product Family</th>
				  <th>Product Name</th>
				  <th>Borrow Amount</th>
				  <th>Term Factor</th>
				  <th>Risk Factor</th>
				  <th>All In Rate</th>
				  <th>Annual Percentage Rate</th>
				</tr>
			  </thead>
			  <tbody>
				{state.map((item) => (
				  <tr>
					<td>{item.id}</td>
					<td>{item.licationIdentity}</td>
					<td>{item.bankDivision}</td>
					<td>{item.productFamily}</td>
					<td>{item.productName}</td>
					<td>{item.barrowAmount}</td>
					<td>{item.termFactor}</td>
					<td>{item.riskFactor}</td>
					<td>{item.allInRate}</td>
					<td>{item.annualPercentageRate}</td>
				  </tr>
				))}
			  </tbody>
		  </Table>
		  {state.length === 0 &&
			<div className={styles.centerOne}>
				<Spinner animation="border" role="status">
				  <span className="sr-only">Loading...</span>
				</Spinner>
			</div>
		   }
		</Col>
	  </Row>
	  <Row className={styles.section}>
		<Col md="3">
		  <Button variant="primary" onClick={() => history.goBack()}>Back</Button>{' '}
		  <Button variant="primary" onClick={() => history.push({
		pathname: '/rules-processing/service-request',
		state: 'service-request'
	})}>Next</Button>
		</Col>
	   </Row>
	   <Row>
        <Col className={styles.footer}>&copy; {new Date().getFullYear()} Mphasis. All rights reserved</Col>
      </Row>
    </>
  );
}

export default TestData
;
