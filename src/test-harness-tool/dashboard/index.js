import React, {useState, useRef } from 'react';
import { Row, Col, Card, Dropdown, DropdownButton, Popover,OverlayTrigger, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Service from '../common/service'
import common from '../common/common.scss'
import styles from './dashboard.scss'
	

function Dashboard() {
  const history = useHistory();
  const [showA, setShowA] = useState({ selectedFile: '', show: false, message: '', error: '' });
  const fileInput = useRef()

  const toggleShowA = () => setShowA({show: !showA, message: '', error: ''});
  
  function logout() {
	  localStorage.removeItem('logged');
	  localStorage.removeItem('date');
	  history.push({
		pathname: '/login',  
	  })
  }
  
  const onFileChange = event => { 
	/*const regex = /\.(xls)$/i
	const file = fileInput.current.value
	if (file && !regex.test(file)) {
	  setShowA({...showA, error: 'Please choose valid xls file'})
	  fileInput.current.value = '';
	  return false;
	}*/
	setShowA({...showA, ...{ error: '', selectedFile: event.target.files[0] }})
  }; 
  
  const onFileUpload = () => { 
	  if (!fileInput.current.value) {
		  setShowA({...showA, error: 'Please choose file to upload'})
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
		setShowA({...showA, message: 'Upload successfully', error: '', selectedFile: ''})
	  }).catch((error) => {
		fileInput.current.value = ''
		setShowA({...showA, message: 'Upload successfully', error: '', selectedFile: ''})
	  }); 
  }
  
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
  
  const popover = (
  <Popover id="popover-basic" className={styles.popoverContainer}>
    <Popover.Content>
	  {showA.error !== null && (
		<div className={styles.fileErrorMessage}>{showA.error}</div>
	  )}
	  <input
		   type="file"
		   onChange={onFileChange}
		   ref={fileInput}
	  />
	  <Button variant="primary" onClick={onFileUpload} className={styles.uploadButton}>Upload</Button>
	  {fileData()}
	  {showA.message !== null && (
		<div className={styles.fileMessage}>{showA.message}</div>
	  )}
    </Popover.Content>
  </Popover>
);
  
  return (
    <>
      <Row className={styles.section}>
        <Col md="12">
		  <Card className={styles.cardWrapper}>
            <Card.Body className={styles.relative}>
			<div className={styles.profileList}>
				<div><span>Welcome,</span> <i>{localStorage.getItem('logged')}</i> <span className={styles.logout} href="#" onClick={logout}>(Logout)</span></div>
				<div><span>Logged in</span> <i>{localStorage.getItem('date')}</i></div>
			</div>
            <div className={styles.listWrapper}>
			 <ul className={styles.listGroup}>
			   <li>
			    <i />
				<span>
				 <DropdownButton id="dropdown-basic-button" drop="right" className={styles.dropdown} title="Pricing Tool">
			      <Dropdown.Item href="#pricing-method/generic-pricing-method">RM and Digital</Dropdown.Item>
			      <Dropdown.Item href="#pricing-tool">Ulster</Dropdown.Item>
				  <Dropdown.Item href="#/">CBIL</Dropdown.Item>
				  <Dropdown.Item href="#pricing-method/lombard">Lombard</Dropdown.Item>
			     </DropdownButton>
			    </span>
			  </li>
			  <li>
			    <i />
				<span>
				 <DropdownButton id="dropdown-basic-button" drop="right" className={styles.dropdown} title="Pricing Assessment">
			      <Dropdown.Item href="#pricing-assessment/RM and Digital Assessment">RM and Digital Assessment</Dropdown.Item>
				  <Dropdown.Item href="#pricing-assessment/Lombard Assessment">Lombard Assessment</Dropdown.Item>
			     </DropdownButton>
			    </span>
			  </li>
			  <li>
			    <i /><span><a href="#lending-finder">Lending Finder</a></span>
			  </li>
			  <li>
			    <i />
				<span>
				<DropdownButton id="dropdown-basic-button" drop="right" className={styles.dropdown} title="Reports">
			      <Dropdown.Item href="#generic-report-lists">RM and Digital</Dropdown.Item>
			      <Dropdown.Item href="#report-lists">Ulster</Dropdown.Item>
				  <Dropdown.Item href="#/">CBIL</Dropdown.Item>
				  <Dropdown.Item href="#/">Lombard</Dropdown.Item>
			     </DropdownButton>
				</span>
			  </li>
			 </ul>
			</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
