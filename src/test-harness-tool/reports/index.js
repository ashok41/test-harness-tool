import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import TestLog from './components/testlog'
import styles from './reports.scss'

function Reports() {
  const reportsRef = useRef()
  useEffect(() => {
	axios.get('reports.json').then((response) => {
	  const { data } = response
	  reportsRef.current = data
	})
  }, [])
  console.log('reportsRef', reportsRef)
  return (
    <div className={styles.containerBlock}>
      <b>Test Execution Summary</b>
      <TestLog />
    </div>
  );
}

export default Reports
;
