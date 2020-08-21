import React from 'react';
import styles from './error.scss'
	
function Error() {
  return (
    <div className={styles.section}>
	  Unable to process your request. Please try again to give valid input.
    </div>
  );
}

export default Error;
