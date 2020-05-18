import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table, Pagination, Card } from 'react-bootstrap'
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
  const [page, setPage] = useState(1)
  const setPageItem = (number) => () => {
	  setPage(number)
  }
  let items = [];
  const total = Math.ceil(state.length/10)
  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={setPageItem(number)}>
        {number}
      </Pagination.Item>
    );
  }
  const indexOfLastTodo = page * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;
  const paginationData = state.slice(indexOfFirstTodo, indexOfLastTodo);
  return (
    <Card>
	  <Row className={styles.wrapper}>
	    <Col md="12">
		<Table responsive striped bordered hover size="md">
			  <thead>
				<tr>
				  <th>ID</th>
				  <th>Application Identity</th>
				  <th>Bank Division</th>
				  <th>Product Family</th>
				  <th>Product Name</th>
				  <th>Borrowing Amount(GBP)</th>
				  <th>Term (Months)</th>
				  <th>Risk Band</th>
				  <th className={styles.rate}>AIR(%)</th>
				  <th className={styles.rate}>APR(%)</th>
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
					<td className={styles.rate}>{item.allInRate}</td>
					<td className={styles.rate}>{item.annualPercentageRate}</td>
				  </tr>
				))}
			  </tbody>
		  </Table>
		  {state.length > 10 && <div>
		    <Pagination>{items}</Pagination>
	      </div>}
		  <div>
		   <Button variant="primary" disabled onClick={() => history.goBack()}>Back</Button>{' '}
		   <Button variant="primary" onClick={handleSubmit}>Confirm & Execute</Button>
		  </div>
		</Col>
	  </Row>
	  
    </Card>
  );
}

export default ServiceRequest;
