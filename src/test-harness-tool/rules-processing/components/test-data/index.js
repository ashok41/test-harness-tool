import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import RowEditable from './row-editable'
import styles from './test-data.scss'
import common from '../../../common/common.scss'

function TestData() {
  
  const history = useHistory()
  const location = useLocation()
  const {state} = location;
  const [dataLists, setDataLists] = useState(state);
  
  function handleSubmit() {
	  axios.post('http://localhost:8081/expectedScenarios', dataLists)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/rules-processing/service-request',
			state: data
		})
	  })
  }
  function rowEdit(data, idx) {
	  const obj = {...dataLists[idx], ...data}
	  setDataLists([...dataLists.slice(0, idx), data, ...dataLists.slice(idx + 1)])
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
				  <th>Action</th>
				</tr>
			  </thead>
			  <tbody>
				{dataLists.map((item, index) => (
				  <RowEditable data={item} key={index} rowIndex={index} rowEdit={rowEdit} />
				))}
			  </tbody>
		  </Table>
		</Col>
	  </Row>
	  <Row className={styles.section}>
		<Col md="3">
		  <Button variant="primary" onClick={() => history.goBack()}>Back</Button>{' '}
		  <Button variant="primary" onClick={handleSubmit}>Next</Button>
		</Col>
	   </Row>
    </>
  );
}

export default TestData;
