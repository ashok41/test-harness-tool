import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import styles from './service-request.scss'
import common from '../../../common/common.scss'

function ServiceRequest() {
  
  const history = useHistory()
  const location = useLocation()
  const {state} = location;
  
  function handleSubmit() {
	  axios.post('http://localhost:8081/testCasesResult', state)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/reports',
			state: data
		})
	  })
  }
  return (
    <>
	  <Row className={styles.padTop}>
	    <Col md="12">
		<Table responsive striped bordered hover size="sm">
			  <thead>
				<tr>
				  <th>ID</th>
				  <th>Application Identity</th>
				  <th>Bank Division</th>
				  <th>Product Family</th>
				  <th>Product Name</th>
				  <th>Borrowing Amount</th>
				  <th>Term (Months)</th>
				  <th>Risk Band</th>
				  <th>All In Rate</th>
				  <th>Annual Percentage Rate</th>
				</tr>
			  </thead>
			  <tbody>
				{state.map((item) => (
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
				  </tr>
				))}
			  </tbody>
		  </Table>
		</Col>
	  </Row>
	  <Row className={styles.section}>
		<Col md="3">
		  <Button variant="primary" onClick={() => history.goBack()}>Back</Button>{' '}
		  <Button variant="primary" onClick={handleSubmit}>Confirm & Execute</Button>
		</Col>
	   </Row>
    </>
  );
}

export default ServiceRequest;
