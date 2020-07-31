import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Breadcrumb, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Service from '../../../common/service'
import axios from 'axios'
import ProfileList from '../../../common/profile-list'
import styles from './business-parameters.scss'
import common from '../../../common/common.scss'

function BusinessParameters(props) {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const { slug }  = params
  const { state: backFormData } = location
  const productMapDetails = { 3: [4], 7: [5,6] }
  const initial = {	
	  borrowingAmount: {data: '', error: '', valid: false, disabled: true},
	  riskBand:{data: '', error: '', valid: false, disabled: true},
	  term: {data: '', error: '', valid: false, disabled: true},
	  locationIdentity: {data: '', error: '', valid: false},
	  bankDivision : {data: '', error: '', valid: false},
	  productFamily: {data: '', error: '', valid: false},
	  productName: {data: '', error: '', valid: false},
	  environment: {data: '', error: '', valid: false},
	  purpose: {data: '', error: '', valid: (slug ? false : true)},
	  url: {data: '', error: '', valid: false, loader: false, disabled: true, message: ''}
  }
  const [state, setState] = useState(backFormData ? backFormData : initial)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [lookup, setLookup] = useState('')
  const [businessAttributes, setBusinessAttributes] = useState({data: {}, loader: false})
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
  
  const errorFormFields = {
	 'locationIdentity' : 'Please select Application Identity',
	 'bankDivision' : 'Please select Bank Division',
	 'purpose' : 'Please select Purpose',
	 'productFamily' : 'Please select Product Family',
	 'productName' : 'Please select Product Name',
	 'environment' : 'Please select Environment'
  }
  
  function validation(forms) {
	let errors = ''
	if (forms.locationIdentity.data === '') {
		errors = 'Please select Application Identity';
	} 
	if (errors === '' && forms.bankDivision.data === '') {
		errors = 'Please select Bank Division';
	}
	if (errors === '' && slug && forms.purpose.data === '') {
		errors = 'Please select Purpose';
	}
	if (errors === '' && !slug && forms.productFamily.data === '') {
		errors = 'Please select Product Family';
	}
	if (errors === '' && !slug && forms.productName.data === '') {
		errors = 'Please select Product Name';
	}
	if (errors === '' && forms.borrowingAmount.data === '') {
		errors = 'Please enter Borrowing Amount';
	} 
	if (errors === '' && !slug && forms.riskBand.data === '') {
		errors = 'Please enter Risk Band';
	}
	if (errors === '' && forms.term.data === '') {
		errors = 'Please enter Term (Months)';
	}
	if (errors === '' && forms.environment.data === '') {
		errors = 'Please select Environment';
	}
	if (errors === '' && forms.url.data === '') {
		errors = 'Please enter URL';
	}
	return errors
  }
  
  function buildJSON(forms) {
	  setLoading(true)
	  const borrowingAmount = forms.borrowingAmount.data.split(',').map(Number);
	  const riskBand = forms.riskBand.data.split(',').map(Number);
	  const term = forms.term.data.split(',').map(Number);
	  const lists = {}
	  lists['borrowingAmount'] = borrowingAmount;
	  lists['termFactor'] = term;
	  lists['applicationIdentity'] = Number(forms.locationIdentity.data);
	  lists['bankDivision'] = Number(forms.bankDivision.data);
	  if (slug) {
		lists['purpose'] = Number(forms.purpose.data);
	  } else {
		lists['riskFactor'] = riskBand;
		lists['productFamily'] = Number(forms.productFamily.data);
		lists['productName'] = Number(forms.productName.data);
	  }
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
		  setState({...state, [label]: {
			  data: data, error: valid, valid: validFlag}})
	  }
	  if (isCommaLast && !valid) {
		  setState({...state, [label]: {data: data, error: '', valid: true}})
	  }
  }
  
  const onSelectedProductNameOptionChange = (label) => (e) => {
	const data = e.target.value
	if (data === '') {
		let formData = {
		  [label]: {data: '', error: errorFormFields[label], valid: false}
		}
   	    formData['borrowingAmount'] = initial.borrowingAmount
		formData['riskBand'] = initial.riskBand
		formData['term'] = initial.term
		setState({...state, ...formData})
		setLookup('')
	} else {
		let formData = {
		  [label]: {data: data, error: '', valid: true}
		}
		formData['borrowingAmount'] = {...initial.borrowingAmount, disabled: false}
		formData['riskBand'] = {...initial.riskBand, disabled: false}
		formData['term'] = {...initial.term, disabled: false}
		setState({...state, ...formData})
		Service.get(`/rbs/th/generatelookup/onproduct/${data}`)
		.then((response) => {
			const {data} = response
			if (data !== 'OK') {
				setLookup(data)
			} else {
				setLookup('')
			}
		})
		.catch(() => {
			setLookup('Please Upload Reference data to get the Expected value')
		})
	}
  }
  
  const onSelectedSingleOptionChange = (label) => (e) => {
	const data = e.target.value
	if (data === '') {
		let formData = {
		  [label]: {data: '', error: errorFormFields[label], valid: false}
		}
		if (label === 'environment') {
		  formData['url'] = initial.url
		}
		if (label === 'productName') {
		  formData['borrowingAmount'] = initial.borrowingAmount
		  formData['riskBand'] = initial.riskBand
		  formData['term'] = initial.term
		}
		setState({...state, ...formData})
	} else {
		let formData = {
		  [label]: {data: data, error: '', valid: true}
		}
		if (label === 'environment') {
		  formData['url'] = {...initial.url, disabled: false}
		}
		if (label === 'productName') {
		  formData['borrowingAmount'] = {...initial.borrowingAmount, disabled: false}
		  formData['riskBand'] = {...initial.riskBand, disabled: false}
		  formData['term'] = {...initial.term, disabled: false}
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
  
  function checkReferenceData() {
	 if (state.productName.data !== '') {
		return false
	 } else {
		return true
	 }
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
  
  const viewReferenceData = (link) => () => {
	window.open(link,'_blank');
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
		    <div className={styles.mandatoryContainer}><span className={styles.mandatory}>*</span> Mandatory Fields</div>
            <Card.Body>
            <Form>
			  <Row>
			    <Col md="6">
			     <Form.Group as={Row} controlId="locationIdentity">
                   <Form.Label column sm="4">Application Identity <span className={styles.mandatory}>*</span></Form.Label>
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
                  <Form.Label column sm="3">Bank Division <span className={styles.mandatory}>*</span></Form.Label>
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
				  {!slug && <Form.Group as={Row} controlId="productFamily">
					<Form.Label column sm="4">Product Family <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.productFamily.error} value={state.productFamily.data} onChange={onSelectedSingleOptionChange('productFamily')}>
						<option value="">Please Select</option>
						{businessAttributes.data['PF001'] && businessAttributes.data['PF001'].map((item) => {
						  return (<option value={item.attributeId}>{item.refDataDesc}</option>)
						})}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.productFamily.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>}
				  {slug && <Form.Group as={Row} controlId="purpose">
					<Form.Label column sm="4">Purpose <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.productFamily.error} value={state.productFamily.data} onChange={onSelectedSingleOptionChange('purpose')}>
						<option value="">Please Select</option>
						{businessAttributes.data['PP001'] && businessAttributes.data['PP001'].map((item) => {
						  return (<option value={item.attributeId}>{item.refDataDesc}</option>)
						})}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.productFamily.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>}
				</Col>
				<Col md="6">
				  {!slug && <Form.Group as={Row} controlId="productName">
					<Form.Label column sm="3">Product Name <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.productName.error} value={state.productName.data} onChange={onSelectedProductNameOptionChange('productName')}>
						<option value="">Please Select</option>
						{createProductName()}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.productName.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>}
				  {slug && <Form.Group as={Row} controlId="environment">
					<Form.Label column sm="3">Environment <span className={styles.mandatory}>*</span></Form.Label>
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
				  </Form.Group>}
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
			      <Form.Group as={Row} controlId="borrowingAmount">
					<Form.Label column sm="4">Borrowing Amount <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6" className={styles.textform}>
					  <Form.Control type="text" isInvalid={state.borrowingAmount.error} disabled={state.borrowingAmount.disabled} value={state.borrowingAmount.data} autoComplete="off" onChange={onTextUpdated('borrowingAmount')} onBlur={removeUnwantedComma('borrowingAmount')} />
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
				  <Form.Group as={Row} controlId="term">
				    <Form.Label column sm="4">Term (Months) <span className={styles.mandatory}>*</span></Form.Label>
				    <Col sm="6" className={styles.textform}>
				     <Form.Control type="text" isInvalid={state.term.error} disabled={state.term.disabled} value={state.term.data} autoComplete="off" onChange={onTextUpdated('term')} onBlur={removeUnwantedComma('term')} />
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
			      {!slug && <Form.Group as={Row} controlId="riskBand">
				   <Form.Label column sm="4">Risk Band <span className={styles.mandatory}>*</span></Form.Label>
				   <Col sm="6" className={styles.textform}>
				     <Form.Control type="text" isInvalid={state.riskBand.error} disabled={state.riskBand.disabled} value={state.riskBand.data} autoComplete="off" onChange={onTextUpdated('riskBand')} onBlur={removeUnwantedComma('riskBand')} />
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
			      </Form.Group>}
			    </Col>
			    {!slug && <Col sm="6">
				<Row>
				<Col sm="12">
			     <Form.Group as={Row} controlId="environment">
					<Form.Label column sm="3">Environment <span className={styles.mandatory}>*</span></Form.Label>
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
					<Form.Label column sm="3">URL <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6" className={styles.urlBox}>
					  <Form.Control as="textarea" isInvalid={state.url.error} disabled={state.url.disabled} value={state.url.data} autoComplete="off" onChange={onURLUpdated('url')} rows="3" />
					  {state.url.message && <div className={styles.tickIcon} />}
					  <Form.Control.Feedback type="invalid" tooltip>
					    {state.url.error}
					  </Form.Control.Feedback>
					  <OverlayTrigger
						  placement="right"	
						  overlay={
							<Tooltip>
							  <div>NFT 11.158.4.85 9143</div>
							  <div>UAT 11.158.4.156 9543</div>
							  <div>DEV2 11.158.0.186 9443</div>
							</Tooltip>
						  }
						>
						<div className={styles.tooltip}><div className={styles.qicon} /></div>
					  </OverlayTrigger>
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
				</Col>}
			  </Row>
			  <Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
			  {loading ? 
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
			  : <Button variant="primary" disabled={checkSubmitButton()} onClick={handleSubmit}>Next</Button>
		      }
			  <Button className={styles.referenceButton} variant="primary" disabled={checkReferenceData()} onClick={viewReferenceData(`${Service.getApiRoot()}/rbs/th/generatelookup/${state.productName.data}`)}>View Reference Data</Button>
			  {lookup && <div className={styles.referenceMessage}>{lookup}</div>}
            </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default BusinessParameters;
