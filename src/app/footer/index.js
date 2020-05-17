import React from 'react';
import { Row, Col } from 'react-bootstrap'
import styles from './footer.scss'

function Footer() {
  return (
	<Row>
      <Col className={styles.footer} />
    </Row>
  );
}

export default Footer;
