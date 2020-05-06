import React from 'react';
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import TestData from './components/test-data'
import ServiceRequest from './components/service-request'
import styles from './rules-processing.scss'

function RulesProcessing() {
  const location = useLocation()
  const { state } = location
  return (
    <Container className={styles.container}>
	 {state === 'test-data' &&
		<TestData />}
	  {state === 'service-request' &&
	  <ServiceRequest />}
    </Container>
  );
}

export default RulesProcessing
;
