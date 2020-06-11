import React from 'react';
import { Row, Col } from 'react-bootstrap'
import logo from '../../../assets/images/Mphasis_SSO.png';
import natwest from '../../../assets/images/natwest.jpg';
import styles from './header.scss'

function Header() {
  return (
	<Row className={styles.header}>
      <Col xs="5">
          <img src={logo} className={styles.logo} alt="mphasis logo" title="mphasis logo"/>
      </Col>
      <Col xs="6" className={styles.headerTxt}>Test Harness</Col>
	  <Col xs="1">
          <img src={natwest} alt="Natwest Group" title="Natwest Group"/>
      </Col>
    </Row>
  );
}

export default Header;
