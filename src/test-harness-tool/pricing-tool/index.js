import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Breadcrumb, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import Service from '../common/service'
import axios from 'axios'
import ProfileList from '../common/profile-list'
import styles from './pricing-tool.scss'
import common from '../common/common.scss'

function Dashboard() {
  const history = useHistory()
  const location = useLocation()
  const { state: backFormData } = location
  const productMapDetails = { 3: [4], 7: [5,6] }
  const initial = {
	  borrowingAmount: {data: '', error: ''},
	  riskBand:{data: '', error: ''},
	  term: {data: '', error: ''},
	  locationIdentity: {data: '', error: ''},
	  bankDivision : {data: '', error: ''},
	  productFamily: {data: '', error: ''},
	  productName: {data: '', error: ''},
	  environment: {data: '', error: ''},
  }
  const [state, setState] = useState(backFormData ? backFormData : initial)
  const [error, setError] = useState('')
  const [businessAttributes, setBusinessAttributes] = useState({})
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
		setBusinessAttributes(attrs)
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
		}]
		let attrs = {}
		data.map((item) => {
		  if (attrs[item.refDataKey] === undefined) {
			attrs[item.refDataKey] = []
		  }
		  attrs[item.refDataKey].push(item)
		})
		setBusinessAttributes(attrs)
	  })
  }
  
  useEffect(() => {
	 const businessAttributesData = Object.keys(businessAttributes).length
	 if (businessAttributesData === 0) {
		getBusinessAttributes()
	 }
  }, [businessAttributes])
  
  function validation(forms) {
	let errors = ''
	if (forms.locationIdentity.data === '') {
		errors = 'Please enter Application Identity';
	} 
	if (errors === '' && forms.bankDivision.data === '') {
		errors = 'Please enter Bank Division';
	}
	if (errors === '' && forms.productFamily.data === '') {
		errors = 'Please enter Product Family';
	}
	if (errors === '' && forms.productName.data === '') {
		errors = 'Please enter Product Name';
	}
	if (errors === '' && forms.borrowingAmount.data === '') {
		errors = 'Please enter Borrowing Amount';
	} 
	if (errors === '' && forms.environment.data === '') {
		errors = 'Please enter Environment';
	}
	if (errors === '' && forms.riskBand.data === '') {
		errors = 'Please enter Risk Band';
	}
	if (errors === '' && forms.term.data === '') {
		errors = 'Please enter Term (Months)';
	}
	return errors
  }
  
  function buildJSON(forms) {
	  const borrowingAmount = forms.borrowingAmount.data.split(',').map(Number);
	  const riskBand = forms.riskBand.data.split(',').map(Number);
	  const term = forms.term.data.split(',').map(Number);
	  const lists = {}
	  lists['borrowingAmount'] = borrowingAmount;
	  lists['riskFactor'] = riskBand;
	  lists['termFactor'] = term;
	  lists['applicationIdentity'] = Number(forms.locationIdentity.data);
	  lists['bankDivision'] = Number(forms.bankDivision.data);
	  lists['productFamily'] = Number(forms.productFamily.data);
	  lists['productName'] = Number(forms.productName.data);
	  lists['userId'] = "R123";
	  lists['environment'] = forms.environment.data;
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
    '4': { 
	  'borrowingAmount': {
		min: 1000, max: 50000, upto: 15, errorMsg: 'Please check the value should be Min of 1000 and Max of 50000',
		tooltip: 'Min: 1000, Max: 50000 Delimiter [0-9,]'
	  },
	  'term': {
		min: 12, max: 120, upto: 4, errorMsg: 'Please check the value should be Min of 12 and Max of 120',
		tooltip: 'Min: 12, Max: 120 Delimiter [0-9,]'
	  },
	  'riskBand': {
		min: 1, max: 10, upto: 10, errorMsg: 'Please check the value should be Min of 1 and Max of 10',
		tooltip: 'Min: 1, Max: 10 Delimiter [0-9,]'
	  }
    },
    '6': { 
	  'borrowingAmount': {
		min: 15000, max: 15000, upto: 15, errorMsg: 'Please check the value should be Min of 15000 and Max of 15000',
		tooltip: 'Min: 15000, Max: 15000 Delimiter [0-9,]'
	  },
	  'term': {
		min: 1, max: 12, upto: 4, errorMsg: 'Please check the value should be Min of 1 and Max of 12',
		tooltip: 'Min: 1, Max: 12 Delimiter [0-9,]'
	  },
	  'riskBand': {
		min: 1, max: 10, upto: 10, errorMsg: 'Please check the value should be Min of 1 and Max of 10',
		tooltip: 'Min: 1, Max: 10 Delimiter [0-9,]'
	  }
    },
    '5': { 
	  'borrowingAmount': {
		min: 15000, max: 15000, upto: 15, errorMsg: 'Please check the value should be Min of 15000 and Max of 15000',
		tooltip: 'Min: 15000, Max: 15000 Delimiter [0-9,]'
	  },
	  'term': {
		min: 24, max: 24, upto: 4, errorMsg: 'Please check the value should be Min of 24 and Max of 24',
		tooltip: 'Min: 24, Max: 24 Delimiter [0-9,]'
	  },
	  'riskBand': {
		min: 1, max: 10, upto: 10, errorMsg: 'Please check the value should be Min of 1 and Max of 10',
		tooltip: 'Min: 1, Max: 10 Delimiter [0-9,]'
	  }
    }
  }
  
  const onTextUpdated = (label) => (e) => {
	  const data = e.target.value;
	  const checkCommas = data.split(',')
	  const totCommas = checkCommas.length
	  const eachData = checkCommas[totCommas-1]
	  const lastBeforeData = checkCommas[totCommas-2]
	  const regex = /^[\d\,]+$/g
	  let valid = ''
	  const {min, max, upto, errorMsg} = formFieldsInfo[state.productName.data][label]
	  if (label === "borrowingAmount" && lastBeforeData && (Number(lastBeforeData) < min || Number(lastBeforeData) > max)) {
		  valid = errorMsg
	  }
	  if (label === "term" && lastBeforeData && (Number(lastBeforeData) < min || Number(lastBeforeData) > max)) {
		  valid = errorMsg
	  }
	  if (label === "riskBand" && lastBeforeData && (Number(lastBeforeData) < min || Number(lastBeforeData) > max)) {
		  valid = errorMsg
	  }
	  if (data === '' || (data && regex.test(data) && totCommas <= upto && eachData !== "0" && checkCommas[0] !== "")) {
		setState({...state, [label]: {data: data, error: valid}})
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
	  if (label === "borrowingAmount" && eachData && (Number(eachData) < min || Number(eachData) > max)) {
		  valid = errorMsg
	  }
	  if (label === "term" && eachData && (Number(eachData) < min || Number(eachData) > max)) {
		  valid = errorMsg
	  }
	  if (label === "riskBand" && eachData && (Number(eachData) < min || Number(eachData) > max)) {
		  valid = errorMsg
	  }
	  if (valid) {
		  setState({...state, [label]: {data: data, error: valid}})
	  }
	  if (isCommaLast && !valid) {
		  setState({...state, [label]: {data: data, error: ''}})
	  }
  }
  
  const onSelectedSingleOptionChange = (label) => (e) => {
	setState({...state, [label]: {data: e.target.value, error: ''}})
  }
  
  function checkSubmitButton() {
	  let valid = 0;
	  Object.keys(state).forEach((item) => {
		  if (state[item].error != "") {
			  valid++
		  }
	  })
	  return valid
  }
  
  function createProductName() {
	if (state.productFamily.data) {
		return productMapDetails[state.productFamily.data].map((familyItem) => {
			return businessAttributes['PR001'].map((item) => {
			  if (familyItem === item.attributeId) {
				return (<option value={item.attributeId}>{item.refDataDesc}</option>)
			  }
			})
		})
	}
	return []
  }
  
  return (
    <>
      <Row className={styles.section}>
        <Col md="12">
		  <Row>
		   <Col md="9">
		    <Breadcrumb>
		     <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		     <Breadcrumb.Item active>Pricing Tool</Breadcrumb.Item>
		    </Breadcrumb>
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>
		  </Row>
		  {error &&
		    <Alert key="1" className={styles.alert} variant="danger">
			  {error}
		    </Alert>
		  }
          <Card>
            <Card.Header className={styles.headerContainer}>
			 <div>Pricing Business Parameters</div>
			 <div><span className={styles.mandatory}>*</span> Mandatory Fields</div>
			</Card.Header>
            <Card.Body>
            <Form>
			  <Row>
			    <Col md="6">
			     <Form.Group as={Row} controlId="locationIdentity">
                   <Form.Label column sm="4">Application Identity <span className={styles.mandatory}>*</span></Form.Label>
                   <Col sm="6">
				     <Form.Control as="select" value={state.locationIdentity.data} onChange={onSelectedSingleOptionChange('locationIdentity')}>
                      <option value="">Please Select</option>
					  {businessAttributes['AP001'] && businessAttributes['AP001'].map((item) => {
						return (<option value={item.attributeId}>{item.refDataDesc}</option>)
					  })}
                     </Form.Control>
				   </Col>
                 </Form.Group>
			    </Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="bankDivision">
                  <Form.Label column sm="3">Bank Division <span className={styles.mandatory}>*</span></Form.Label>
                  <Col sm="6">
				    <Form.Control as="select" value={state.bankDivision.data} onChange={onSelectedSingleOptionChange('bankDivision')}>
                      <option value="">Please Select</option>
					  {businessAttributes['BU001'] && businessAttributes['BU001'].map((item) => {
						return (<option value={item.attributeId}>{item.refDataDesc}</option>)
					  })}
                    </Form.Control>
				   </Col>
                  </Form.Group>
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
				  <Form.Group as={Row} controlId="productFamily">
					<Form.Label column sm="4">Product Family <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" value={state.productFamily.data} onChange={onSelectedSingleOptionChange('productFamily')}>
						<option value="">Please Select</option>
						{businessAttributes['PF001'] && businessAttributes['PF001'].map((item) => {
						  return (<option value={item.attributeId}>{item.refDataDesc}</option>)
						})}
					  </Form.Control>
					</Col>
				  </Form.Group>
				</Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="productName">
					<Form.Label column sm="3">Product Name <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" value={state.productName.data} onChange={onSelectedSingleOptionChange('productName')}>
						<option value="">Please Select</option>
						{createProductName()}
					  </Form.Control>
					</Col>
				  </Form.Group>
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
				  <Form.Group as={Row} controlId="borrowingAmount">
					<Form.Label column sm="4">Borrowing Amount <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6" className={styles.textform}>
					  <Form.Control type="text" isInvalid={state.borrowingAmount.error} value={state.borrowingAmount.data} autoComplete="off" onChange={onTextUpdated('borrowingAmount')} onBlur={removeUnwantedComma('borrowingAmount')} />
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.borrowingAmount.error}
					  </Form.Control.Feedback>
					  {formFieldsInfo[state.productName.data] &&
					  <OverlayTrigger
						  placement="right"	
						  overlay={
							<Tooltip>{formFieldsInfo[state.productName.data]['borrowingAmount']['tooltip']}</Tooltip>
						  }
						>
						<div className={styles.tooltip}><div className={styles.qicon} /></div>
					  </OverlayTrigger>}
					</Col>
				  </Form.Group>
				</Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="environment">
					<Form.Label column sm="3">Environment <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" value={state.environment.data} onChange={onSelectedSingleOptionChange('environment')}>
						<option value="">Please Select</option>
						<option value="NFT">NFT</option>
						<option value="UAT">UAT</option>
						<option value="Dev">Dev</option>
					  </Form.Control>
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
			  </Row>
			  <Form.Group as={Row} controlId="term">
				<Form.Label column sm="2">Term (Months) <span className={styles.mandatory}>*</span></Form.Label>
				<Col sm="3" className={styles.textform}>
				  <Form.Control type="text" isInvalid={state.term.error} value={state.term.data} autoComplete="off" onChange={onTextUpdated('term')} onBlur={removeUnwantedComma('term')} />
				  <Form.Control.Feedback type="invalid" tooltip>
                   {state.term.error}
                  </Form.Control.Feedback>
				  {formFieldsInfo[state.productName.data] &&
				  <OverlayTrigger
					  placement="right"	
					  overlay={
						<Tooltip>{formFieldsInfo[state.productName.data]['term']['tooltip']}</Tooltip>
					  }
					>
					<div className={styles.tooltip}><div className={styles.qicon} /></div>
                  </OverlayTrigger>}
				</Col>
			  </Form.Group>
			  <Form.Group as={Row} controlId="riskBand">
				<Form.Label column sm="2">Risk Band <span className={styles.mandatory}>*</span></Form.Label>
				<Col sm="3" className={styles.textform}>
				  <Form.Control type="text" isInvalid={state.riskBand.error} value={state.riskBand.data} autoComplete="off" onChange={onTextUpdated('riskBand')} onBlur={removeUnwantedComma('riskBand')} />
				  <Form.Control.Feedback type="invalid" tooltip>
                   {state.riskBand.error}
                  </Form.Control.Feedback>
				  {formFieldsInfo[state.productName.data] &&
				  <OverlayTrigger
					  placement="right"	
					  overlay={
						<Tooltip>{formFieldsInfo[state.productName.data]['riskBand']['tooltip']}</Tooltip>
					  }
					>
					<div className={styles.tooltip}><div className={styles.qicon} /></div>
                  </OverlayTrigger>}
				</Col>
			  </Form.Group>
			  <Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
              <Button variant="primary" disabled={checkSubmitButton()} onClick={handleSubmit}>Next</Button>
            </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
