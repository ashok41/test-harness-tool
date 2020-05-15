import React from 'react';
import { Row, Col } from 'react-bootstrap'
import styles from './footer.scss'

function Footer() {
  return (
	<Row>
      <Col className={styles.footer}>&copy; {new Date().getFullYear()} Mphasis. All rights reserved</Col>
    </Row>
  );
}

export default Footer;
