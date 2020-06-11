import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table, Pagination, Card } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import ProfileList from '../../../common/profile-list'
import RowEditable from './row-editable'
import styles from './test-data.scss'
import common from '../../../common/common.scss'

function TestData() {
  const history = useHistory()
  const location = useLocation()
  const {state: {postData, formData}} = location;
  const [dataLists, setDataLists] = useState(postData);
  const testsetid = dataLists[0].testSetId
  const [sort, setSort] = useState({})
  
  const [page, setPage] = useState(1)
  
  function handleSubmit() {
	  axios.get(`http://localhost:8081/rbs/th/testdata/airapr/${testsetid}`)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/rules-processing/service-request',
			state: data
		})
	 })
	 .catch(() => {
		 const data = [
        {
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 10,
			"expectetAir": 6.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 2,
			"termFactor": 1,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 1,
			"testTransactionNo": "TH_001_001",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 40,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_003",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 70,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_004",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 90,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_005",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_006",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 90,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_007",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 70,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_004",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 90,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_005",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_006",
			"totalRecord": 2,
			"xmlDifference": ""
		},
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 100,
			"expectetAir": 12.69,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_007",
			"totalRecord": 2,
			"xmlDifference": ""
		}
		]
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
  const total = Math.ceil(dataLists.length/10)
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
  const columns = [{
	  name: 'ID',
	  key: 'id'
  }, {
	  name: 'Application Identity',
	  key: 'applicationIdentity',
	  sortable: true,
	  direction: 'asc'
  }, {
	  name: 'Bank Division',
	  key: 'bankDivision'
  }, {
	  name: 'Product Family',
	  key: 'productFamily'
  }, {
	  name: 'Product Name',
	  key: 'productName'
  }, {
	  name: 'Borrowing Amount(GBP)',
	  key: 'borrowingAmount',
	  sortable: true,
	  direction: 'asc'
  }, {
	  name: 'Term (Months)',
	  key: 'termFactor'
  }, {
	  name: 'Risk Band',
	  key: 'riskBand'
  }]
  
  const sortable = (sortKey, direction, isSortable) => () => {
    if (isSortable) {
	  let newDirection = direction
	  if (sort[sortKey]) {
		  newDirection = sort[sortKey] === 'asc' ? 'desc' : 'asc'
	  }
	  if (newDirection === 'asc') {
		dataLists.sort((a,b) => a[sortKey] - b[sortKey])
	  }
	  if (newDirection === 'desc') {
		dataLists.sort((a,b) => b[sortKey] - a[sortKey])
	  }
	  setDataLists([...dataLists])
	  setSort({[sortKey]: newDirection})
	}
  }
  const getSortDirection = (key) => {
	  return !sort[key] ? '' : (sort[key] === 'desc' ? styles.arrowDown : styles.arrowUp);
  }
  return (
    <Card>
	  <Row className={styles.wrapper}>
	    <Col md="12">
		 <Row>
		   <Col md="9">
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>
		  </Row>
		  <Table responsive striped bordered hover size="md">
			  <thead>
				<tr>
				{columns.map((item) => {
					return <th className={styles.sortHeader} onClick={sortable(item.key, item.direction, item.sortable)}>
					  <span>{item.name}</span>
					  {item.sortable ? <span className={styles.arrow}><div className={getSortDirection(item.key)} /></span> : ''}
					</th>
				})}
				</tr>
			  </thead>
			  <tbody>
				{paginationData.map((item, index) => (
				  <RowEditable data={item} key={index} rowIndex={index} rowEdit={rowEdit} />
				))}
			  </tbody>
		  </Table>
		  {dataLists.length > 10 && <div>
		    <Pagination>{items}</Pagination>
	      </div>}
		  <div>
		    <Button variant="primary" onClick={() => history.push({
			pathname: '/pricing-tool',
			state: formData
		})}>Back</Button>{' '}
		    <Button variant="primary" onClick={handleSubmit}>Next</Button>
		  </div>
		</Col>
	  </Row>
    </Card>
  );
}

export default TestData;
