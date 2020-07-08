import React, {useState, useRef} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Breadcrumb, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Service from '../../../common/service'
import styles from './update-reference-data.scss'
import common from '../../../common/common.scss'

function UpdateReferenceData(props) {
  console.log('props', props)
  
  const [showA, setShowA] = useState({ selectedFile: '', message: '', error: '', refresh: false });
  const fileInput = useRef()
  const onFileUpload = () => { 
	  if (!fileInput.current.value) {
		  setShowA({...showA, error: 'Please choose file to upload', refresh: true})
		  return false;
	  }
      const formData = new FormData(); 
      formData.append(
        "uploadfile",
        showA.selectedFile,
        showA.selectedFile.name
      )
	  const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      Service.post("/rbs/th/uploadFile", formData, config).then((res) => {
		fileInput.current.value = ''
		setShowA({...showA, message: 'Upload successfully', error: '', selectedFile: '', refresh: true})
	  }).catch((error) => {
		fileInput.current.value = ''
		setShowA({...showA, message: 'Upload successfully', error: '', selectedFile: '', refresh: true})
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
         <input
		  onChange={onFileChange}
		  type="file"
		  ref={fileInput}
	    />
	    <Button variant="primary" onClick={onFileUpload}>Upload</Button>
		{fileData()}
	    {showA.message !== null && (
		  <div className={styles.fileMessage}>{showA.message}</div>
	    )}
	  </Card.Body>
	  </Card>
      </Row>
  );
}

export default UpdateReferenceData;
