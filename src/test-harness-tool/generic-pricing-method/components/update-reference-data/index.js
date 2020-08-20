import React, {useState, useRef} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Breadcrumb, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Service from '../../../common/service'
import styles from './update-reference-data.scss'
import common from '../../../common/common.scss'

function UpdateReferenceData(props) {
  const [showA, setShowA] = useState({ selectedFile: '', message: '', error: '', refresh: false, info: '' });
  const [minimumFee, setMinimumFee] = useState(false)
  const fileInput = useRef()
  const onFileUpload = () => { 
	  if (!fileInput.current.value) {
		  setShowA({...showA, error: 'Please choose file to upload', info: '', refresh: true})
		  return false;
	  }
      const formData = new FormData();
      formData.append(
        minimumFee ? "uploadMinimumFeeFile" : "uploadfile",
        showA.selectedFile,
        showA.selectedFile.name
		
      )
	  const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
	  
	  const apiURL = minimumFee ? '/rbs/th/gp/uploadMinimumFeeFile' : '/rbs/th/gp/uploadFile'
	  
      Service.post(apiURL, formData, config).then((res) => {
		fileInput.current.value = ''
		setShowA({...showA, message: 'Upload successfully', error: '', info: '', selectedFile: '', refresh: true})
	  }).catch((error) => {
		if (error.message.indexOf('304')) {
		  setShowA({...showA, info: 'Unable to Save Uploaded Reference Data', message: '', error: '', selectedFile: '', refresh: true})
		} else {
		  setShowA({...showA, info: 'Unable to read the uploaded file due to Invalid Input', message: '', error: '', selectedFile: '', refresh: true})
		}
		fileInput.current.value = ''
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
	setShowA({...showA, ...{ error: '', info: '', selectedFile: event.target.files[0], refresh: true, message: '' }})
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
	
  const onMinimumFee = (e) => {
	setMinimumFee(e.target.checked)
  }
  
  return (
      <Row className={styles.section}>
	  <Card>
	  <Card.Body>
	    {showA.error !== null && (
		  <div className={styles.fileErrorMessage}>{showA.error}</div>
	    )}
		<div className={styles.minimumFee}>
		  <Form.Check type='checkbox' label='Minimum Fee' onChange={onMinimumFee} />
		</div>
		<div className={common.uploadFile}>
         <input
		  onChange={onFileChange}
		  type="file"
		  ref={fileInput}
	     />
	     <Button variant="primary" onClick={onFileUpload}>Upload</Button>
		</div>
		{fileData()}
	    {showA.message !== null && (
		  <div className={styles.fileMessage}>{showA.message}</div>
	    )}
		{showA.info !== '' && (
		  <div className={styles.fileErrorMessage}>{showA.info}</div>
	    )}
	  </Card.Body>
	  </Card>
      </Row>
  );
}

export default UpdateReferenceData;
