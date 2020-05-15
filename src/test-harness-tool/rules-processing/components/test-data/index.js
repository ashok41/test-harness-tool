import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import styles from './test-data.scss'
import common from '../../../common/common.scss'

function TestData() {
  
  const history = useHistory()
  const location = useLocation()
  const {state} = location;
  
  const columns = [{
	  dataField: 'id',
	  text: 'ID'
	}, {
	  dataField: 'applicationIdentity',
	  text: 'Location Identity'
	}, {
	  dataField: 'bankDivision',
	  text: 'Bank Division'
	}, {
	  dataField: 'productFamily',
	  text: 'Product Family'
	}, {
	  dataField: 'productName',
	  text: 'Product Name'
	}, {
	  dataField: 'barrowAmount',
	  text: 'Borrow Amount'
	}, {
	  dataField: 'termFactor',
	  text: 'Term Factor'
	}, {
	  dataField: 'riskFactor',
	  text: 'Risk Factor'
	}];
    
  function handleSubmit() {
	  axios.post('http://localhost:8081/expectedScenarios', state)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/rules-processing/service-request',
			state: data
		})
	  })
  }
  return (
    <>
	  <Row className={styles.padTop}>
	    <Col md="12">
		<BootstrapTable
		  keyField="id"
		  data={ state }
		  columns={ columns }
		  cellEdit={ cellEditFactory({
			mode: 'click',
			blurToSave: true
		  }) }
		/>
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
