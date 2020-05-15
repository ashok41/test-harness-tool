import React from 'react';
import { Row, Col } from 'react-bootstrap'
import styles from './header.scss'

function Header() {
  return (
	<Row className={styles.header}>
      <Col xs="4">
          <img src="https://appaccess.mphasis.com/images/Mphasis_SSO.png" className={styles.logo} alt="mphasis logo" title="mphasis logo"/>
        </Col>
      <Col xs="8" className={styles.headerTxt}>Pricing Risk Calculator</Col>
    </Row>
  );
}

export default Header;
