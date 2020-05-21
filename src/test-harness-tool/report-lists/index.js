import React, {useState} from 'react';
import { Row, Col, Card, Breadcrumb } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import common from '../common/common.scss'
import styles from './report-lists.scss'
	

function ReportLists() {
  return (
    <>
      <Row className={styles.section}>
        <Col md="12">
		  <Breadcrumb>
		   <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		   <Breadcrumb.Item active>Report</Breadcrumb.Item>
		  </Breadcrumb>
		  <Card className={styles.cardWrapper}>
            <Card.Body className={styles.relative}>
            <div className={styles.listWrapper}>
			 <ul className={styles.listGroup}>
			  <li>
			    <i /><span><a href="#pricing-tool">Date Range</a></span>
			  </li>
			  <li>
			    <i /><span><a href="#">Current Date Range</a></span>
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

export default ReportLists;
