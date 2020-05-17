import React from 'react';
import { Row, Col } from 'react-bootstrap'
import styles from './header.scss'

function Header() {
  return (
	<Row className={styles.header}>
      <Col xs="4">
          <img src="https://appaccess.mphasis.com/images/Mphasis_SSO.png" className={styles.logo} alt="mphasis logo" title="mphasis logo"/>
      </Col>
      <Col xs="6" className={styles.headerTxt}>Loan Pricing Validator</Col>
	  <Col xs="2">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTVXgAS--oNIFnqS4Z4Z8TcxgrNtXC_GOhp_f8ZEE3rYsZ8LcZX&usqp=CAU" className={styles.logo} alt="Natwest Group" title="Natwest Group"/>
      </Col>
    </Row>
  );
}

export default Header;
