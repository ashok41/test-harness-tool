import React, {useState} from 'react';
import { Row, Col, Card, Dropdown, DropdownButton, Popover,OverlayTrigger, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Service from '../common/service'
import common from '../common/common.scss'
import styles from './dashboard.scss'
	

function Dashboard() {
  const history = useHistory();
  const [file, setFile] = useState({selectedFile: ''});
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);
  
  function logout() {
	  localStorage.removeItem('logged');
	  localStorage.removeItem('date');
	  history.push({
		pathname: '/login',  
	  })
  }
  
  const onFileChange = event => { 
    setFile({ selectedFile: event.target.files[0] }); 
  }; 
  
  const onFileUpload = () => { 
      const formData = new FormData(); 
      formData.append("file", file);
	  const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      Service.post("http://localhost:8081/rbs/th/uploadFile", formData, config).then((res) => {
		  console.log('response', res)
	  }).catch((error) => {
		  console.log('error', error)
	  }); 
  }
  
  const fileData = () => { 
      if (file.selectedFile) { 
        return ( 
          <div className={styles.fileDetails}> 
            <div className={styles.header}>File Details:</div> 
            <div>File Name: {file.selectedFile.name}</div> 
            <div>File Type: {file.selectedFile.type}</div> 
            <div> 
              Last Modified:{" "} 
              {file.selectedFile.lastModifiedDate.toDateString()} 
            </div> 
          </div> 
        ); 
      }
    }
  
  const popover = (
  <Popover id="popover-basic">
    <Popover.Content>
	  <input
		   id="file"
		   type="file"
		   name="selectedFile"
		   onChange={onFileChange}
	  />
	  <Button variant="primary" onClick={onFileUpload} className={styles.uploadButton}>Upload</Button>
	  {fileData()} 
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
			    <i /><span><a href="#pricing-tool">Pricing Tool</a></span>
			  </li>
			  <li>
			    <i /><span><a href="#">Product Finder</a></span>
			  </li>
			  <li>
			    <i />
				<span>
				 <DropdownButton id="dropdown-basic-button" className={styles.dropdown} title="Report">
			      <Dropdown.Item href="#/report-lists/date-range">Date Range</Dropdown.Item>
			      <Dropdown.Item href="#/report-lists/business-report">Business Report</Dropdown.Item>
			     </DropdownButton>
			    </span>
			  </li>
			  <li className={styles.toastContainer}>
			    <i />
				<span>
				  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
					<a href="#" onClick={toggleShowA}>Update Reference Data</a>
				  </OverlayTrigger>
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
