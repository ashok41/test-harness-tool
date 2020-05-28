import React, {useState} from 'react';
import { Row, Col, Card, Dropdown, DropdownButton } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import common from '../common/common.scss'
import styles from './dashboard.scss'
	

function Dashboard() {
  const history = useHistory();
  
  function logout() {
	  localStorage.removeItem('logged');
	  localStorage.removeItem('date');
	  history.push({
		pathname: '/login',
	  })
  }
  
  return (
    <>
      <Row className={styles.section}>
        <Col md="12">
		  <Card className={styles.cardWrapper}>
            <Card.Body className={styles.relative}>
			<div className={styles.profileList}>
				<div><span>Welcome,</span> <i>Rob</i> <span className={styles.logout} href="#" onClick={logout}>(Logout)</span></div>
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
