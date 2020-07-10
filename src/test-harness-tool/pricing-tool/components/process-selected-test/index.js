import React, {useState, useRef} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Breadcrumb, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Service from '../../../common/service'
import styles from './process-selected-test.scss'
import common from '../../../common/common.scss'

function processSelectedTest(props) {
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const [showA, setShowA] = useState({ selectedFile: '', message: '', error: '', refresh: false });
  const fileInput = useRef()
  function toTimeString(seconds) {
	return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
  }
  const onFileUpload = () => { 
	  const start = Date.now();
	  if (!fileInput.current.value) {
		  setShowA({...showA, error: 'Please choose file to upload', refresh: true})
		  return false;
	  }
      const formData = new FormData(); 
      formData.append(
        "uploadProcessSelectedTestCaseFile",
        showA.selectedFile,
        showA.selectedFile.name
      )
	  const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
	  setLoading(true)
      Service.post("/rbs/th/uploadProcessSelectedTestCaseFile", formData, config).then((response) => {
		const seconds = Date.now() - start;
		const executionTime = toTimeString(seconds/1000)
		const { data } = response
		  history.push({
			pathname: '/reports',
			state: {data: data, executionTime: executionTime}
		})
	  }).catch((error) => {
		const seconds = Date.now() - start;
		const executionTime = toTimeString(seconds/1000)
		const data = {
			"totalTestCases": 27,
			"passed": 24,
			"failed": 3,
			"environment": "NFT",
			"testcasesResultList": [
			{
					"actualAir": 7.6,
					"actualApr": 0.6,
					"applicationIdentity": "Ulster",
					"bankDivision": "Business",
					"borrowingAmount": 100,
					"expectetAir": 6,
		  			"expectetApr": 0,
					"productFamily": "Small Business Loan",
					"productName": "Loan",
					"riskBand": 3,
					"termFactor": 2,
					"testSetId": 1,
					"testTransactionFlag": "Y",
					"testTransactionId": 2,
					"testTransactionNo": "TH_001_001",
					"totalRecord": 2,
					"xmlDifference": ""
				},
				{
					"actualAir": 7.2,
					"actualApr": 0.2,
					"applicationIdentity": "Ulster",
					"bankDivision": "Business",
					"borrowingAmount": 100,
					"expectetAir": 7,
					"expectetApr": 0,
					"productFamily": "Small Business Loan",
					"productName": "Loan",
					"riskBand": 3,
					"termFactor": 2,
					"testSetId": 1,
					"testTransactionFlag": "Y",
					"testTransactionId": 2,
					"testTransactionNo": "TH_001_002",
					"totalRecord": 2,
					"xmlDifference": ""
				},
				{
					"actualAir": 1.3,
					"actualApr": 2,
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
					"testTransactionFlag": "Y",
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
					"borrowingAmount": 100,
					"expectetAir": 12.69,
					"expectetApr": 0,
					"productFamily": "Small Business Loan",
					"productName": "Loan",
					"riskBand": 3,
					"termFactor": 2,
					"testSetId": 1,
					"testTransactionFlag": "Y",
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
					"borrowingAmount": 100,
					"expectetAir": 12.69,
					"expectetApr": 0,
					"productFamily": "Small Business Loan",
					"productName": "Loan",
					"riskBand": 3,
					"termFactor": 2,
					"testSetId": 1,
					"testTransactionFlag": "Y",
					"testTransactionId": 2,
					"testTransactionNo": "TH_001_005",
					"totalRecord": 2,
					"xmlDifference": ""
				}
			]
		  }
		  history.push({
			pathname: '/reports',
			state: {data: data, executionTime: executionTime}
		})
	  }); 
  }
  
  const onFileChange = event => { 
	/*const regex = /\.(xls)$/i
	const file = fileInput.current.value
	if (file && !regex.test(file)) {
	  setShowA({...showA, error: 'Please choose valid xls file'})
	  fileInput.current.value = '';
	  return false;
	}*/
	setShowA({...showA, ...{ error: '', selectedFile: event.target.files[0], refresh: true }})
  };
  
  const fileData = () => { 
      if (showA.selectedFile) { 
        return ( 
          <div className={styles.fileDetails}> 
            <div className={styles.header}>File Details:</div> 
            <div>File Name: {showA.selectedFile.name}</div> 
            <div>File Type: {showA.selectedFile.type}</div> 
            <div> 
              Last Modified:{" "} 
              {showA.selectedFile.lastModifiedDate.toDateString()} 
            </div> 
          </div> 
        ); 
      }
    }  
  return (
      <Row className={styles.section}>
	  <Card>
	  <Card.Body>
	    {showA.error !== null && (
		  <div className={styles.fileErrorMessage}>{showA.error}</div>
	    )}
		<div className={common.uploadFile}>
         <input
		  onChange={onFileChange}
		  type="file"
		  ref={fileInput}
	     />
		 {loading ? 
		    <Button variant="primary" disabled>
			 <Spinner
			  as="span"
			  animation="grow"
			  size="sm"
			  role="status"
			  aria-hidden="true"
			/>
			Inprogress...
		    </Button>
			: <Button variant="primary" onClick={onFileUpload}>Confirm & Execute</Button>
	     }
		</div>
		{fileData()}
	  </Card.Body>
	  </Card>
      </Row>
  );
}

export default processSelectedTest;
