import React, {useState} from 'react';
import { Row, Col, Card, Dropdown, DropdownButton, Popover,OverlayTrigger, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import common from '../common/common.scss'
import styles from './dashboard.scss'
	

function Dashboard() {
  const history = useHistory();
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  
  function logout() {
	  localStorage.removeItem('logged');
	  localStorage.removeItem('date');
	  history.push({
		pathname: '/login',
	  })
  }
  
  const popover = (
  <Popover id="popover-basic">
    <Popover.Content>
      <Form.File 
		id="custom-file"
		label=""
		custom
	  />
	  <Button variant="primary" className={styles.uploadButton}>Upload</Button>
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
