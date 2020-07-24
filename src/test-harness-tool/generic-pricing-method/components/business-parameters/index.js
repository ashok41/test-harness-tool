import React, {useState, useEffect, useRef} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Breadcrumb, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import Service from '../../../common/service'
import axios from 'axios'
import ProfileList from '../../../common/profile-list'
import styles from './business-parameters.scss'
import common from '../../../common/common.scss'

function BusinessParameters(props) {
  const history = useHistory()
  const location = useLocation()
  const dynamicFormFields = useRef({methods: {}})
  const tempMethod = useRef('')
  const { state: backFormData } = location
  const productMapDetails = { 3: [4], 7: [5,6] }

  const initial = {	
	locationIdentity: {data: '', error: '', valid: false, errorMessage: 'Please select Application Identity'},
	bankDivision : {data: '', error: '', valid: false, errorMessage: 'Please select Bank Division'},
	pricingMethod: {data: '', error: '', valid: false, errorMessage: 'Please select Pricing Method'},
	environment: {data: '', error: '', valid: false, errorMessage: 'Please enter Environment'},
	customerDealSegement: {data: '', error: '', valid: false, errorMessage: 'Please select Customer Deal Segement'},
    url: {data: '', error: '', valid: false, loader: false, disabled: true, message: '', errorMessage: 'Please enter URL'}
  }
  const [state, setState] = useState(backFormData ? backFormData : initial)
  const [error, setError] = useState('')
  const [businessAttributes, setBusinessAttributes] = useState({data: {}, loader: false})
  const [customerDealSegement, setCustomerDealSegement] = useState({data: []})
  function handleSubmit(e) {
	  e.preventDefault();
	  const error = validation(state)
	  if (error === '') {
		setError('')
		buildJSON(state)
	  } else {
		setError(error)	
	  }
  }
  
  function getBusinessAttributes() {
	  setBusinessAttributes({...businessAttributes, loader: true})
	  Service.get('/rbs/th/businessAttributes')
	  .then((response) => {
		const { data } = response
		let attrs = {}
		data.map((item) => {
		  if (attrs[item.refDataKey] === undefined) {
			attrs[item.refDataKey] = []
		  }
		  attrs[item.refDataKey].push(item)
		})
		setBusinessAttributes({data: attrs, loader: false})
	  })
	  .catch(() => {
		const data = [
		{
			"attributeId": 1,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Ulster",
			"refDataKey": "AP001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 2,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Business",
			"refDataKey": "BU001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 3,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Loans",
			"refDataKey": "PF001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 6,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Agri Facility",
			"refDataKey": "PR001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 7,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Overdraft",
			"refDataKey": "PF001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 4,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Small Business Loan (Fixed)",
			"refDataKey": "PR001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}, {
			"attributeId": 5,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Overdraft",
			"refDataKey": "PR001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}, {
			"attributeId": 8,
			"refDataDesc": "Margin Method",
			"refDataKey": "MN001",
		}, {
			"attributeId": 9,
			"refDataDesc": "Fee Method",
			"refDataKey": "MN001"
		}, {
			"attributeId": 10,
			"refDataDesc": "Development Margin Method",
			"refDataKey": "MN001"
		}, {
			"attributeId": 11,
			"refDataDesc": "AIR Method",
			"refDataKey": "MN001"
		}, {
			"attributeId": 12,
			"refDataDesc": "APR Method",
			"refDataKey": "MN001"
		}]
		let attrs = {}
		data.map((item) => {
		  if (attrs[item.refDataKey] === undefined) {
			attrs[item.refDataKey] = []
		  }
		  attrs[item.refDataKey].push(item)
		})
		setBusinessAttributes({data: attrs, loader: false})
	  })
  }
  
  useEffect(() => {
	 const businessAttributesData = Object.keys(businessAttributes.data).length
	 if (businessAttributesData === 0) {
		getBusinessAttributes()
	 }
  }, [businessAttributes.data])
  
  function getCustomerDealSegement() {
	  Service.get('/rbs/th/gp/customerdealsegment')
	  .then((response) => {
		const { data } = response
		setCustomerDealSegement({data: data})
	  })
	  .catch(() => {
		const data = [
		{
			"customerDealSegmentId": "CDS1",
			"customerDealSegmentName": "CPB REF Business",
			"isActive": "Y"
		},
		{
			"customerDealSegmentId": "CDS2",
			"customerDealSegmentName": "CPB REF Corporate",
			"isActive": "Y"
		},
		{
			"customerDealSegmentId": "CDS3",
			"customerDealSegmentName": "CPB REF Large Commercial 1",
			"isActive": "Y"
		},
		{
			"customerDealSegmentId": "CDS4",
			"customerDealSegmentName": "CPB REF Large Commercial 2",
			"isActive": "Y"
		}]
		setCustomerDealSegement({data: data})
	  })
  }
  
  useEffect(() => {
	 if (customerDealSegement.data.length === 0) {
		getCustomerDealSegement()
	 }
  }, [customerDealSegement.data])
  
  function createDynamicMethod(data) {
	let formData = {}
	if (!tempMethod.current || (tempMethod.current && state.pricingMethod.text !== tempMethod.current)) {
	  if (tempMethod.current) {
		delete state[tempMethod.current]
	  }
	  tempMethod.current = state.pricingMethod.text
    }
    formData[state.pricingMethod.text] = {data: '', error: '', valid: false, errorMessage: `Please select ${state.pricingMethod.text}`}
   
    dynamicFormFields.current = { methods: {[state.pricingMethod.text]: data} }
    setState({...state, ...formData})
  }
  
  useEffect(() => {
	  if (state.customerDealSegement.data && state.pricingMethod.data) {
		Service.get(`/rbs/th/gb/marginmethod/${state.customerDealSegement.data}`)
	    .then((response) => {
		  const { data } = response
		  createDynamicMethod(data)
	    })
	    .catch((error) => {
		  const data = [
		   {methodId: 'MM1', methodName: 'CPB Trad Busi PPFL Margin'},
		   {methodId: 'MM2', methodName: 'CPB Trad Small Comm PPFL Margin'},
		   {methodId: 'MM3', methodName: 'CPB Trad Busi Loans Margin'}
		  ]
		  createDynamicMethod(data)
	    })
	  }
  }, [state.customerDealSegement.data, state.pricingMethod.data])
  
  function validation(forms) {
	let errors = ''
	if (forms.locationIdentity.data === '') {
		errors = initial.locationIdentity.errorMessage;
	} 
	if (errors === '' && forms.bankDivision.data === '') {
		errors = initial.bankDivision.errorMessage;
	}
	if (errors === '' && forms.customerDealSegement.data === '') {
		errors = initial.customerDealSegement.errorMessage;
	}
	if (errors === '' && forms.pricingMethod.data === '') {
		errors = initial.pricingMethod.errorMessage;
	}
	if (errors === '' && forms.environment.data === '') {
		errors = initial.environment.errorMessage;
	}
	if (errors === '' && forms.url.data === '') {
		errors = initial.url.errorMessage;
	}
	return errors
  }
  
  function buildJSON(forms) {
	  const borrowingAmount = forms.borrowingAmount.data.split(',').map(Number);
	  const riskBand = forms.riskBand.data.split(',').map(Number);
	  const term = forms.term.data.split(',').map(Number);
	  const lists = {}
	  lists['customerDealSegement'] = forms.customerDealSegement.data;
	  lists['applicationIdentity'] = Number(forms.locationIdentity.data);
	  lists['bankDivision'] = Number(forms.bankDivision.data);
	  lists['userId'] = localStorage.getItem('logged');
	  lists['environment'] = forms.environment.data;
	  lists['wsdlUrl'] = forms.url.data;
	  Service.post('/rbs/th/testdata', lists)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/rules-processing/test-data',
			state: {postData: data, formData: forms}
		})
	 })
	 .catch(() => {
		 const data = [
        {
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 10,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 2,
			"termFactor": 1,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 1,
			"testTransactionNo": "TH_001_001",
			"totalRecord": 2,
			"xmlDifference": "",
			"environment": "NFT"
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    },
		{
			"actualAir": 0,
			"actualApr": 0,
			"applicationIdentity": "Ulster",
			"bankDivision": "Business",
			"borrowingAmount": 20,
			"expectetAir": 0,
			"expectetApr": 0,
			"productFamily": "Small Business Loan",
			"productName": "Loan",
			"riskBand": 3,
			"termFactor": 2,
			"testSetId": 1,
			"testTransactionFlag": {},
			"testTransactionId": 2,
			"testTransactionNo": "TH_001_002",
			"totalRecord": 2,
			"xmlDifference": ""
	    }	
		]
		  history.push({
			pathname: '/rules-processing/test-data',
			state: {postData: data, formData: forms}
		})
	 })
  }
  
  function handleReset() {
	  setState({...state, ...initial})
  }
  
  const formFieldsInfo = { 
    '4': { // small business loan (fixed)
	  'borrowingAmount': {
		min: 1000, max: 50000, upto: 15, errorMsg: 'Please check the value should be Min of 1000 and Max of 50000',
		tooltip: 'Min: 1000, Max: 50000 Delimiter [0-9,]', emptyMsg: 'Please enter Borrowing Amount'
	  },
	  'term': {
		min: 12, max: 120, upto: 10, errorMsg: 'Please check the value should be Min of 12 and Max of 120',
		tooltip: 'Min: 12, Max: 120 Delimiter [0-9,]', emptyMsg: 'Please enter Term (Months)'
	  },
	  'riskBand': {
		min: 1, max: 10, upto: 10, errorMsg: 'Please check the value should be Min of 1 and Max of 10',
		tooltip: 'Min: 1, Max: 10 Delimiter [0-9,]', emptyMsg: 'Please enter Risk Band'
	  }
    },
    '6': { // agri facility validation
	  'borrowingAmount': {
		min: 1000, max: 50000, upto: 15, errorMsg: 'Please check the value should be Min of 1000 and Max of 50000',
		tooltip: 'Min: 1000, Max: 50000 Delimiter [0-9,]'
	  },
	  'term': {
		min: 1, max: 120, upto: 10, errorMsg: 'Please check the value should be Min of 1 and Max of 120',
		tooltip: 'Min: 1, Max: 120 Delimiter [0-9,]'
	  },
	  'riskBand': {
		min: 1, max: 10, upto: 10, errorMsg: 'Please check the value should be Min of 1 and Max of 10',
		tooltip: 'Min: 1, Max: 10 Delimiter [0-9,]'
	  }
    },
    '5': { // overdraft validation
	  'borrowingAmount': {
		min: 1000, max: 50000, upto: 15, errorMsg: 'Please check the value should be Min of 1000 and Max of 50000',
		tooltip: 'Min: 1000, Max: 50000 Delimiter [0-9,]'
	  },
	  'term': {
		min: 1, max: 12, upto: 10, errorMsg: 'Please check the value should be Min of 1 and Max of 12',
		tooltip: 'Min: 1, Max: 12 Delimiter [0-9,]'
	  },
	  'riskBand': {
		min: 1, max: 10, upto: 10, errorMsg: 'Please check the value should be Min of 1 and Max of 10',
		tooltip: 'Min: 1, Max: 10 Delimiter [0-9,]'
	  }
    }
  }
  
  const onURLUpdated = (label) => (e) => {
	  setState({...state, [label]: {data: e.target.value, error: '', valid: false}})
  }
  
  const onTextUpdated = (label) => (e) => {
	  const data = e.target.value;
	  const checkCommas = data.split(',')
	  const totCommas = checkCommas.length
	  const eachData = checkCommas[totCommas-1]
	  const lastBeforeData = checkCommas[totCommas-2]
	  const regex = /^[\d\,]+$/g
	  let valid = ''
	  let validFlag = true
	  const {min, max, upto, errorMsg, emptyMsg} = formFieldsInfo[state.productName.data][label]
	  if (label === "borrowingAmount" && lastBeforeData && (Number(lastBeforeData) < min || Number(lastBeforeData) > max)) {
		  valid = errorMsg
		  validFlag = false
	  }
	  if (label === "term" && lastBeforeData && (Number(lastBeforeData) < min || Number(lastBeforeData) > max)) {
		  valid = errorMsg
		  validFlag = false
	  }
	  if (label === "riskBand" && lastBeforeData && (Number(lastBeforeData) < min || Number(lastBeforeData) > max)) {
		  valid = errorMsg
		  validFlag = false
	  }
	  if (data === '' || (data && regex.test(data) && totCommas <= upto && eachData !== "0" && checkCommas[0] !== "")) {
		if (data === '') {
			valid = emptyMsg
		}
		setState({...state, [label]: {data: data, error: valid, valid: validFlag}})
	  }
  }
  
  const removeUnwantedComma = (label) => (e) => {
	  let data = e.target.value;
	  const regex = /,\s*$/
	  let isCommaLast = 0
	  if (regex.test(data)) {
		  isCommaLast = 1
		  data = data.replace(regex, "")
	  }
	  const checkCommas = data.split(',')
	  const totCommas = checkCommas.length
	  const eachData = Number(checkCommas[totCommas-1])
	  const {min, max, upto, errorMsg} = formFieldsInfo[state.productName.data][label]
	  let valid = ''
	  let validFlag = true
	  if (label === "borrowingAmount" && eachData && (Number(eachData) < min || Number(eachData) > max)) {
		  valid = errorMsg
		  validFlag = false
	  }
	  if (label === "term" && eachData && (Number(eachData) < min || Number(eachData) > max)) {
		  valid = errorMsg
		  validFlag = false
	  }
	  if (label === "riskBand" && eachData && (Number(eachData) < min || Number(eachData) > max)) {
		  valid = errorMsg
		  validFlag = false
	  }
	  if (valid) {
		  setState({...state, [label]: {data: data, error: valid, valid: validFlag}})
	  }
	  if (isCommaLast && !valid) {
		  setState({...state, [label]: {data: data, error: '', valid: true}})
	  }
  }
  
  const customerDealSegementOptionChange = (label) => (e) => {
	const data = e.target.value
	const text = e.target.options[e.target.selectedIndex].text
	let formData = {}
	if (data === '') {
		formData[label] = {...state[label], data: '', error: state[label].errorMessage, valid: false}
		dynamicFormFields.current = {methods: {}}
	}
	if (state.customerDealSegement.data === '') {
		formData['customerDealSegement'] = {...state['customerDealSegement'], data: '', error: state['customerDealSegement'].errorMessage, valid: false}
		dynamicFormFields.current = {methods: {}}
	}
	if (state.pricingMethod.data === '') {
		formData['pricingMethod'] = {...state['pricingMethod'], data: '', error: state['pricingMethod'].errorMessage, valid: false}
		dynamicFormFields.current = {methods: {}}
	}
	if (data) {
		formData[label] = {...state[label], data: data, error: '', valid: true, text: text}
	}
	setState({...state, ...formData})
  }
  
  const onSelectedSingleOptionChange = (label) => (e) => {
	const data = e.target.value
	if (data === '') {
		let formData = {
		  [label]: {...state[label], data: '', error: state[label].errorMessage, valid: false}
		}
		if (label === 'environment') {
		  formData['url'] = state.url
		}
		setState({...state, ...formData})
	} else {
		let formData = {
		  [label]: {...state[label], data: data, error: '', valid: true}
		}
		if (label === 'environment') {
		  formData['url'] = {...state.url, disabled: false}
		}
		setState({...state, ...formData})
	}
  }
  
  const onSelectedMethodChange = (label) => (e) => {
	const data = e.target.value
	if (data === '') {
		let formData = {
		  [label]: {...state[label], data: '', error: state[label].errorMessage, valid: false}
		}
		if (label === 'environment') {
		  formData['url'] = state.url
		}
		setState({...state, ...formData})
	} else {
		let formData = {
		  [label]: {...state[label], data: data, error: '', valid: true}
		}
		if (label === 'environment') {
		  formData['url'] = {...state.url, disabled: false}
		}
		setState({...state, ...formData})
	}
  }
  
  function checkSubmitButton() {
	  let valid = 0;
	  Object.keys(state).forEach((item) => {
		  if (state[item].valid === false) {
			  valid++
		  }
	  })
	  return valid
  }
  
  function createProductName() {
	if (state.productFamily.data) {
		return productMapDetails[state.productFamily.data].map((familyItem) => {
			return businessAttributes.data['PR001'] && businessAttributes.data['PR001'].map((item) => {
			  if (familyItem === item.attributeId) {
				return (<option value={item.attributeId}>{item.refDataDesc}</option>)
			  }
			})
		})
	}
	return []
  }
  
  function validate() {
	let formData = {}
	if (state.environment.data && state.url.data === '') {
	  formData['url'] = {data: state.url.data, error: 'Please enter URL', valid: false}
	}
	if (state.environment.data === '') {
	  formData['environment'] = {data: state.environment.data, error: 'Please select Environment', valid: false }
	}
	if (Object.keys(formData).length > 0) {
	  setState({...state, ...formData})
	} else {
		  setState({...state, 'url': {data: state.url.data, error: '', valid: false, loader: true}})
		  Service.post(`/rbs/th/validateUrl/?url=${state.url.data}`)
		  .then((response) => {
			const { data } = response
			if (data === 'OK') {
				setState({...state, 'url': {data: state.url.data, error: '', valid: true, loader: false, message: 'ok'}})
			} else {
				setState({...state, 'url': {data: state.url.data, error: 'Please enter valid URL', valid: false, loader: false, message: ''}})
			}
		  })
		  .catch(() => {
			  setState({...state, 'url': {data: state.url.data, error: '', valid: true, loader: false, message: 'ok'}})
		  })
	  }
  }
  
  return (
   <div className={common.overlayContainer}>
      <Row>
        <Col md="12">
          <Card>
		    {error &&
				<Alert key="1" className={styles.alert} variant="danger">
				  {error}
				</Alert>
			}
            <Card.Header className={styles.headerContainer}>
			 <div></div>
			 <div><span className={styles.mandatory}>*</span> Mandatory Fields</div>
			</Card.Header>
            <Card.Body className={styles.bodyContainer}>
            <Form>
			  <Row>
			    <Col md="6">
			     <Form.Group as={Row} controlId="locationIdentity">
                   <Form.Label column sm="5">Application Identity <span className={styles.mandatory}>*</span></Form.Label>
                   <Col sm="6">
				     <Form.Control as="select" isInvalid={state.locationIdentity.error} value={state.locationIdentity.data} onChange={onSelectedSingleOptionChange('locationIdentity')}>
                      <option value="">Please Select</option>
					  {businessAttributes.data['AP001'] && businessAttributes.data['AP001'].map((item) => {
						return (<option value={item.attributeId}>{item.refDataDesc}</option>)
					  })}
                     </Form.Control>
					 <Form.Control.Feedback type="invalid" tooltip>
					   {state.locationIdentity.error}
					  </Form.Control.Feedback>
				   </Col>
                 </Form.Group>
			    </Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="bankDivision">
                  <Form.Label column sm="4">Bank Division <span className={styles.mandatory}>*</span></Form.Label>
                  <Col sm="6">
				    <Form.Control as="select" isInvalid={state.bankDivision.error} value={state.bankDivision.data} onChange={onSelectedSingleOptionChange('bankDivision')}>
                      <option value="">Please Select</option>
					  {businessAttributes.data['BU001'] && businessAttributes.data['BU001'].map((item) => {
						return (<option value={item.attributeId}>{item.refDataDesc}</option>)
					  })}
                    </Form.Control>
					<Form.Control.Feedback type="invalid" tooltip>
					   {state.bankDivision.error}
					</Form.Control.Feedback>
				   </Col>
                  </Form.Group>
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
				  <Form.Group as={Row} controlId="customerDealSegement">
					<Form.Label column sm="5">Customer Deal Segement <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.customerDealSegement.error} value={state.customerDealSegement.data} onChange={customerDealSegementOptionChange('customerDealSegement')}>
						<option value="">Please Select</option>
						{customerDealSegement.data.map((item) => {
						  return (<option value={item.customerDealSegmentId}>{item.customerDealSegmentName}</option>)
					    })}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.customerDealSegement.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
				</Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="pricingMethod">
					<Form.Label column sm="4">Pricing Method <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.pricingMethod.error} value={state.pricingMethod.data} onChange={customerDealSegementOptionChange('pricingMethod')}>
						<option value="">Please Select</option>
						{businessAttributes.data['MN001'] && businessAttributes.data['MN001'].map((item) => {
						  return (<option value={item.attributeId}>{item.refDataDesc}</option>)
					    })}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.pricingMethod.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
				 {Object.keys(dynamicFormFields.current.methods).map((method) => {
				   return (<Form.Group as={Row} controlId={method}>
					<Form.Label column sm="5">{method} <span className={styles.mandatory}>*</span></Form.Label>
					 <Col sm="6">
					  <Form.Control as="select" isInvalid={state[method].error} value={state[method].data} onChange={onSelectedMethodChange(method)}>
						<option value="">Please Select</option>
						{dynamicFormFields.current.methods[method].map((item) => {
						  return (<option value={item.methodId}>{item.methodName}</option>)
						})}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state[method].error}
					  </Form.Control.Feedback>
					 </Col>
				    </Form.Group>)
				 })}
			    </Col>
			    <Col sm="6">
				  <Row>  
				    <Col sm="12">
			          <Form.Group as={Row} controlId="environment">
					   <Form.Label column sm="4">Environment <span className={styles.mandatory}>*</span></Form.Label>
					   <Col sm="6">
					    <Form.Control as="select" isInvalid={state.environment.error} value={state.environment.data} onChange={onSelectedSingleOptionChange('environment')}>
						 <option value="">Please Select</option>
						 <option value="NFT">NFT</option>
						 <option value="UAT">UAT</option>
						 <option value="Dev">Dev</option>
					    </Form.Control>
					    <Form.Control.Feedback type="invalid" tooltip>
                         {state.environment.error}
                        </Form.Control.Feedback>
					    <OverlayTrigger
						  placement="right"	
						  overlay={
							<Tooltip>Choose environment to run test cases</Tooltip>
						  }
						>
						 <div className={styles.tooltip}><div className={styles.qicon} /></div>
					    </OverlayTrigger>
					   </Col>
				      </Form.Group>
				    </Col>
				    <Col sm="12">
			          <Form.Group as={Row} controlId="url">
					   <Form.Label column sm="4">URL <span className={styles.mandatory}>*</span></Form.Label>
					   <Col sm="6" className={styles.urlBox}>
					    <Form.Control as="textarea" isInvalid={state.url.error} disabled={state.url.disabled} value={state.url.data} autoComplete="off" onChange={onURLUpdated('url')} rows="3" />
					     {state.url.message && <div className={styles.tickIcon} />}
					     <Form.Control.Feedback type="invalid" tooltip>
					    {state.url.error}
					    </Form.Control.Feedback>
					    <div className={styles.mandatory}>Please enter URL appropriate to the selected Environment</div>
					    <div className={styles.urlForm}>
					     {state.url.loader ? 
						 <Button variant="primary" disabled>
						  <Spinner
						   as="span"
						   animation="grow"
						   size="sm"
						   role="status"
						   aria-hidden="true"
						  />
						   Inprogress...
						 </Button>
						 : <Button variant="primary" onClick={validate}>Validate</Button>
					     }
					    </div>
					   </Col>
				      </Form.Group>
				    </Col>
				  </Row>
				</Col>
			  </Row>
			  <Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
              <Button variant="primary" disabled={checkSubmitButton()} onClick={handleSubmit}>Next</Button>
            </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default BusinessParameters;
