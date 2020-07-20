import React, {useState, useRef} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Breadcrumb, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Service from '../../../common/service'
import styles from './process-selected-test.scss'
import common from '../../../common/common.scss'

function processSelectedTest(props) {
  const [loading, setLoading] = useState({loader: false, message: ''})
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
	  setLoading({loader: true, message: ''})
      Service.post("/rbs/th/uploadProcessSelectedTestCaseFile", formData, config).then((response) => {
		const seconds = Date.now() - start;
		const executionTime = toTimeString(seconds/1000)
		const { data, status } = response
		  if (status === 200) {
		    history.push({
			  pathname: '/reports',
			  state: {data: data, executionTime: executionTime}
		    })
		  } else {
			setLoading({loader: false, message: 'Please upload file with valid URL appropriate to the provided Environment'})
			setShowA({selectedFile: '', message: '', error: '', refresh: false})
			fileInput.current.value = '';
		  }
	  }).catch((error) => {
		  if (error.message.indexOf('404') !== -1) {
		    setLoading({loader: false, message: 'Please upload file with valid URL appropriate to the provided Environment'})
		  } else {
			setLoading({loader: false, message: 'Unable to read the uploaded file due to Invalid Input'})
		  }
		  setShowA({selectedFile: '', message: '', error: '', refresh: false})
		  fileInput.current.value = '';
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
	setShowA({...showA, ...{ error: '', selectedFile: event.target.files[0], refresh: true, message: '' }})
	setLoading({loader: false, message: ''})
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
		 {loading.loader ? 
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
			: <Button variant="primary" onClick={onFileUpload}>Scenarios Execution</Button>
	     }
		</div>
		{fileData()}
		{loading.message && <div className={styles.fileErrorMessage}>{loading.message}</div>}
	  </Card.Body>
	  </Card>
      </Row>
  );
}

export default processSelectedTest;
