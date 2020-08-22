import React from 'react';
import { Row, Col, Card, Breadcrumb } from 'react-bootstrap'
import ProfileList from '../common/profile-list'
import styles from './error.scss'
import common from '../common/common.scss';

	
function Error() {
  return (
   <Row className={styles.section}>
	<Col md="12">
	 <Row>
	   <Col md="9" className={common.listContainer}>
		<Breadcrumb>
		 <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		 <Breadcrumb.Item active>Error</Breadcrumb.Item>
		</Breadcrumb>
	   </Col>
	   <Col md="3">
		<ProfileList />
	   </Col>	
	 </Row>
	 <Card>
	 <Card.Body>
	 Unable to process your request. Please try again to give valid input.
	 </Card.Body>
	 </Card>
	</Col>
   </Row>  
  );
}

export default Error;
