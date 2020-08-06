import React from 'react';
import { Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import TestData from './components/test-data'
import ServiceRequest from './components/service-request'
import styles from './generic-test-cases.scss'

function RulesProcessing() {
  const params = useParams()
  const { slug } = params
  return (
    <div className={styles.container}>
	 {slug === 'test-data' && <TestData />}
     {slug === 'service-request' && <ServiceRequest />}
    </div>
  );
}

export default RulesProcessing;
