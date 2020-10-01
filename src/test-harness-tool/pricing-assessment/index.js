import React, {useState} from 'react';
import { Row, Col, Breadcrumb, Spinner, Tabs, Tab } from 'react-bootstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import BusinessParameters from './components/business-parameters'
import UpdateReferenceData from './components/update-reference-data'
import ProcessSelectedTest from './components/process-selected-test'
import ProfileList from '../common/profile-list'
import styles from './generic-pricing-method.scss'
import common from '../common/common.scss'

function GenericPricingMethod() {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const {slug} = params
  const [key, setKey] = useState('business-parameters');
  let breadCrumb = slug.replace(/(\-)/g, ' ')
  breadCrumb = breadCrumb.replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1+p2.toUpperCase(); } )
  return (
   <div className={common.overlayContainer}>
      <Row className={styles.section}>
        <Col md="12" className={styles.pricingTabs}>
		  <Row>
		   <Col md="9">
		    <Breadcrumb>
		     <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		     <Breadcrumb.Item active>{breadCrumb === "Generic Pricing Method" ? 'RM and Digital Method' : breadCrumb}</Breadcrumb.Item>
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

export default GenericPricingMethod;
