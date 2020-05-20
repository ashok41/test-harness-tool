import React, {useState} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, List } from 'react-bootstrap'
import common from '../common/common.scss'
import styles from './dashboard.scss'
	

function Dashboard() {
  return (
    <>
      <Row className={styles.section}>
        <Col md="12">
		  <Card className={styles.cardWrapper}>
            <Card.Body>
            <ListGroup className={styles.listGroup}>
			  <ListGroup.Item action href="#pricing-tool">
			    Pricing Tool
			  </ListGroup.Item>
			  <ListGroup.Item action href="#link2" disabled>
			    Product Finder
			  </ListGroup.Item>
			  <ListGroup.Item action href="#link2" disabled>
			    Audit Reports
			  </ListGroup.Item>
			  <ListGroup.Item action href="#link2" disabled>
			    Option 4(to be finalized)
			  </ListGroup.Item>
			</ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
