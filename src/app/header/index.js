import React from 'react';
import { Row, Col } from 'react-bootstrap'
import styles from './header.scss'

function Header() {
  return (
	<Row className={styles.header}>
      <Col xs="4">
          <img src="https://appaccess.mphasis.com/images/Mphasis_SSO.png" className={styles.logo} alt="mphasis logo" title="mphasis logo"/>
      </Col>
      <Col xs="6" className={styles.headerTxt}>Test Harness</Col>
	  <Col xs="2">
          <img src="https://media-assets-04.thedrum.com/cache/images/thedrum-prod/s3-news-tmp-10557-natwest--default--1225.jpg" className={styles.logo} alt="Natwest Group" title="Natwest Group"/>
      </Col>
    </Row>
  );
}

export default Header;
