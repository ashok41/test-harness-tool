import React, {useState} from 'react';
import { Row, Col, Breadcrumb, Spinner, Tabs, Tab } from 'react-bootstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import BusinessParameters from './components/business-parameters'
import UpdateReferenceData from './components/update-reference-data'
import ProcessSelectedTest from './components/process-selected-test'
import ProfileList from '../common/profile-list'
import styles from './pricing-tool.scss'
import common from '../common/common.scss'

function PricingTool() {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const { slug }  = params
  if (slug && slug !== 'product-finder') {
	  history.push('/#')
  }
  const [key, setKey] = useState('business-parameters');
  return (
   <div className={common.overlayContainer}>
      <Row className={styles.section}>
        <Col md="12" className={styles.pricingTabs}>
		  <Row>
		   <Col md="9">
		    <Breadcrumb>
		     <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		     <Breadcrumb.Item active>{slug ? 'Lending Finder Tool': 'Ulster'}</Breadcrumb.Item>
		    </Breadcrumb>
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>
		  </Row>
		  <Tabs activeKey={key}
			onSelect={(k) => setKey(k)}
			>
			<Tab eventKey="business-parameters" title="Business Parameters">
			 <BusinessParameters clear={key} />
			</Tab>
			<Tab eventKey="update-reference-data" title="Update Reference Data">
			 <UpdateReferenceData clear={key} />
			</Tab>
			<Tab eventKey="process-selected-test" title="Process Selective Scenarios">
			 <ProcessSelectedTest clear={key} />
			</Tab>
		  </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default PricingTool;
