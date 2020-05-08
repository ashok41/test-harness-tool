import React from 'react';
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import TestData from './components/test-data'
import ServiceRequest from './components/service-request'
import styles from './rules-processing.scss'

function RulesProcessing() {
  const params = useParams()
  const { slug } = params
  return (
    <Container className={styles.container}>
	 {slug === 'test-data' && <TestData />}
     {slug === 'service-request' && <ServiceRequest />}
    </Container>
  );
}

export default RulesProcessing
;
