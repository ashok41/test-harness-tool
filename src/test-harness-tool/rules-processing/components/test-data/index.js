import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table, Pagination } from 'react-bootstrap'
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
  
  const [page, setPage] = useState(1)
  
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
  
  const setPageItem = (number) => () => {
	  setPage(number)
  }
  
  let items = [];
  const total = Math.ceil(state.length/10)
  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={setPageItem(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  
  const indexOfLastTodo = page * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;
  const paginationData = dataLists.slice(indexOfFirstTodo, indexOfLastTodo);
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
				{paginationData.map((item, index) => (
				  <RowEditable data={item} key={index} rowIndex={index} rowEdit={rowEdit} />
				))}
			  </tbody>
		  </Table>
		  {state.length > 10 && <div>
		    <Pagination>{items}</Pagination>
	      </div>}
		</Col>
	  </Row>
	  <Row className={styles.section}>
		<Col md="3">
		  <Button variant="primary" disabled onClick={() => history.goBack()}>Back</Button>{' '}
		  <Button variant="primary" onClick={handleSubmit}>Next</Button>
		</Col>
	   </Row>
    </>
  );
}

export default TestData;
