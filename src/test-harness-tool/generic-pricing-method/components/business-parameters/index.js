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
	applicationIdentity: {data: 1, error: '', valid: true, errorMessage: 'Please select Application Identity'},
	productFamily: {data: '', error: '', valid: false, errorMessage: 'Please select Product Family'},
	productName: {data: '', error: '', valid: false, errorMessage: 'Please select Product Name'},
	bankDivision : {data: '', error: '', valid: false, errorMessage: 'Please select Bank Division'},
	totalCustomerLimit: {data: '', error: '', valid: false, errorMessage: 'Please enter Total Customer Limit'},
	turnOver: {data: '', error: '', valid: false, errorMessage: 'Please enter Turnover'},
	balanceSheetNetAsset: {data: '', error: '', valid: false, errorMessage: 'Please enter Balance Sheet Net Assets'},
	pricingMethodId: {data: '', error: '', valid: false, errorMessage: 'Please select Pricing Method'},
	environment: {data: '', error: '', valid: false, errorMessage: 'Please enter Environment'},
	customerDealSegmentId: {data: '', error: '', valid: false, errorMessage: 'Please select Customer Deal Segment'},
    wsdlUrl: {data: '', error: '', valid: false, loader: false, disabled: true, message: '', errorMessage: 'Please enter URL'}
  }
  const [state, setState] = useState(backFormData ? backFormData : initial)
  const [error, setError] = useState('')
  const [businessAttributes, setBusinessAttributes] = useState({data: {}, loader: false})
  const [customerDealSegmentId, setCustomerDealSegement] = useState({data: []})
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
	 if (customerDealSegmentId.data.length === 0) {
		getCustomerDealSegement()
	 }
  }, [customerDealSegmentId.data])
  
  function createDynamicMethod(data) {
	let formData = {}
	let fieldName = state.pricingMethodId.text.replace(/\s/, '')
    fieldName = `${fieldName[0].toLowerCase() + fieldName.slice(1)}Id`
	if (!tempMethod.current || (tempMethod.current && fieldName !== tempMethod.current)) {
	  if (tempMethod.current) {
		delete state[tempMethod.current]
	  }
	  tempMethod.current = fieldName
    }
    formData[fieldName] = {data: '', error: '', valid: false, errorMessage: `Please select ${state.pricingMethodId.text}`}
   
    dynamicFormFields.current = { methods: {[fieldName]: data} }
    setState({...state, ...formData})
  }
  
  useEffect(() => {
	  if (state.customerDealSegmentId.data && state.pricingMethodId.data) {
		const method = state.pricingMethodId.text.replace(/\s/gi, '').toLowerCase()
		Service.get(`/rbs/th/gp/${method}/${state.customerDealSegmentId.data}`)
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
  }, [state.customerDealSegmentId.data, state.pricingMethodId.data])
  
  function validation(forms) {
	let errors = ''
	if (forms.applicationIdentity.data === '') {
		errors = initial.applicationIdentity.errorMessage;
	} 
	if (errors === '' && forms.bankDivision.data === '') {
		errors = initial.bankDivision.errorMessage;
	}
	if (errors === '' && forms.customerDealSegmentId.data === '') {
		errors = initial.customerDealSegmentId.errorMessage;
	}
	if (errors === '' && forms.pricingMethodId.data === '') {
		errors = initial.pricingMethodId.errorMessage;
	}
	if (errors === '' && forms.environment.data === '') {
		errors = initial.environment.errorMessage;
	}
	if (errors === '' && forms.wsdlUrl.data === '') {
		errors = initial.wsdlUrl.errorMessage;
	}
	return errors
  }
  
  function buildJSON(forms) {
	  const lists = {}
	  Object.keys(forms).map((item) => {
		const formData = forms[item].data
	    if(formData % 1 === 0){
			lists[item] = Number(forms[item].data)
		} else {
			lists[item] = forms[item].data
		}
	  })
	  lists['userId'] = localStorage.getItem('logged');
	  Service.post('/rbs/th/gp/testdata', lists)
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
			"testTransactionId": 22846,
			"testSetId": 1169,
			"testTransactionNo": "TH_001_001",
			"applicationIdentity": "Ulster",
			"bankDivision": "Commercial",
			"productFamily": "Loan",
			"productName": "Small Business Loan",
			"totalCustomerLimit": 100,
			"turnOver": 1200,
			"balanceSheetNetAsset": 1000,
			"marginMethodId": "MM5",
			"testTransactionFlag": {},
			"totalRecord": 2,
			"xmlDifference": "",
			"environment": "NFT"
	    },
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
	const data = e.target.value
	if (data === '') {
		let formData = {
		  [label]: {...state[label], data: '', error: state[label].errorMessage, valid: false}
		}
		setState({...state, ...formData})
	} else {
		let formData = {
		  [label]: {...state[label], data: data, error: '', valid: true}
		}
		setState({...state, ...formData})
	}
  }
  
  const donTextUpdated = (label) => (e) => {
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
		  formData['wsdlUrl'] = state.wsdlUrl
		}
		setState({...state, ...formData})
	} else {
		let formData = {
		  [label]: {...state[label], data: data, error: '', valid: true}
		}
		if (label === 'environment') {
		  formData['wsdlUrl'] = {...state.wsdlUrl, disabled: false}
		}
		setState({...state, ...formData})
	}
  }
  
  const onSelectedMethodChange = (label) => (e) => {
	const selectedData = e.target.value
	if (selectedData === '') {
	  let formData = {
		[label]: {...state[label], data: '', error: state[label].errorMessage, valid: false}
	  }
	  dynamicFormFields.current = {...dynamicFormFields.current, formfields: ''}
	  setState({...state, ...formData})
	} else {
	  Service.get(`/rbs/th/gp/parameters/${state.customerDealSegmentId.data}/${state.pricingMethodId.data}/${selectedData}`)
	    .then((response) => {
		  const { data } = response
		  let attrs = {}
		  let formData = {}
		  data.map((item) => {
		    if (attrs[item.paramRefId] === undefined) {
			  attrs[item.paramRefId] = []
		    }
			if (item.paramRefId === null) {
				let field = item.paramName.replace(/\s/, '')
				field = field[0].toLowerCase() + field.slice(1)
				formData[field] = {data: '', error: '', valid: false, errorMessage: `Please select ${item.paramName}`}
			}
		    attrs[item.paramRefId].push(item)
		  })
		  dynamicFormFields.current = { ...dynamicFormFields.current, formfields: attrs }
		  formData[label] = {...state[label], data: selectedData, error: '', valid: true}
		  setState({...state, ...formData})
	    })
	    .catch((error) => {  
		  const data = [
		   {paramId: 'P1', paramRefId: null, paramName: 'Term', paramFlag: null},
		   {paramId: 'P2', paramRefId: null, paramName: 'Borrowing Amount', paramFlag: null},
		   {paramId: 'P3', paramRefId: null, paramName: 'Risk Factor', paramFlag: null},
		   {paramId: 'P4', paramRefId: null, paramName: 'Risk Factor', paramFlag: null},
		   {paramId: 'P5', paramRefId: null, paramName: 'Risk Factor', paramFlag: 'Y'},
		   {paramId: 'P6', paramRefId: 'P5', paramName: 'Health', paramFlag: null},
		   {paramId: 'P7', paramRefId: 'P5', paramName: 'Agriculture', paramFlag: null},
		   {paramId: 'P8', paramRefId: 'P5', paramName: 'Media', paramFlag: null},
		   {paramId: 'P9', paramRefId: 'P5', paramName: 'Risk Factor', paramFlag: null},
		   {paramId: 'P10', paramRefId: 'P5', paramName: 'Risk Factor', paramFlag: null},
		   {paramId: 'P11', paramRefId: 'P5', paramName: 'Risk Factor', paramFlag: null}
			  ]
		  let attrs = {}
		  let formData = {}
		  data.map((item) => {
		    if (attrs[item.paramRefId] === undefined) {
			  attrs[item.paramRefId] = []
		    }
			if (item.paramRefId === null) {
				let field = item.paramName.replace(/\s/, '')
				field = field[0].toLowerCase() + field.slice(1)
				formData[field] = {data: '', error: '', valid: false, errorMessage: `Please select ${item.paramName}`}
			}
		    attrs[item.paramRefId].push(item)
		  })
		  dynamicFormFields.current = { ...dynamicFormFields.current, formfields: attrs }
		  formData[label] = {...state[label], data: selectedData, error: '', valid: true}
		  setState({...state, ...formData})
	  })
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
	if (state.environment.data && state.wsdlUrl.data === '') {
	  formData['wsdlUrl'] = {data: state.wsdlUrl.data, error: 'Please enter URL', valid: false}
	}
	if (state.environment.data === '') {
	  formData['environment'] = {data: state.environment.data, error: 'Please select Environment', valid: false }
	}
	if (Object.keys(formData).length > 0) {
	  setState({...state, ...formData})
	} else {
		  setState({...state, 'wsdlUrl': {data: state.wsdlUrl.data, error: '', valid: false, loader: true}})
		  Service.post(`/rbs/th/validateUrl/?url=${state.wsdlUrl.data}`)
		  .then((response) => {
			const { data } = response
			if (data === 'OK') {
				setState({...state, 'wsdlUrl': {data: state.wsdlUrl.data, error: '', valid: true, loader: false, message: 'ok'}})
			} else {
				setState({...state, 'wsdlUrl': {data: state.wsdlUrl.data, error: 'Please enter valid URL', valid: false, loader: false, message: ''}})
			}
		  })
		  .catch(() => {
			  setState({...state, 'wsdlUrl': {data: state.wsdlUrl.data, error: '', valid: true, loader: false, message: 'ok'}})
		  })
	  }
  }
  
  const renderDynamicFormFields = () => {
    let a = dynamicFormFields.current.formfields && dynamicFormFields.current.formfields['null'].reduce((acc, item, idx) => {
      let group = acc.pop();
      if (group.length == 2) {
        acc.push(group);
        group = [];
      }
      group.push(item);
      acc.push(group);
      return acc;
    }, [[]]);

    const formFields = a && a.map((item) => {
      return (
	    <>
		 {item.map((field) => {
		   let fieldName = field.paramName.replace(/\s/, '')
		   fieldName = fieldName[0].toLowerCase() + fieldName.slice(1)
		   const fieldData = state[fieldName]
		   return (<Col md="6">
			{field.paramRefId === null && field.paramFlag === null ? 
			   <Form.Group as={Row} controlId={field.paramName}>
				<Form.Label column sm="5">{field.paramName} <span className={styles.mandatory}>*</span></Form.Label>
				 <Col sm="6">
				  <Form.Control type="text" isInvalid={fieldData.error} value={fieldData.data} autoComplete="off" onChange={onTextUpdated(fieldName)} />
				  <Form.Control.Feedback type="invalid" tooltip>
                   {fieldData.error}
                  </Form.Control.Feedback>
				 </Col>
				</Form.Group>
				:
		       <Form.Group as={Row} controlId={field.paramName}>
			    <Form.Label column sm="5">{field.paramName} <span className={styles.mandatory}>*</span></Form.Label>
			     <Col sm="6">
			      <Form.Control as="select" isInvalid={fieldData.error} value={fieldData.data} onChange={onSelectedSingleOptionChange(fieldName)}>
				   <option value="">Please Select</option>
				   {dynamicFormFields.current.formfields[field.paramId].map((item) => {
				    return (<option value={item.paramId}>{item.paramName}</option>)
				   })}
			      </Form.Control>
				  <Form.Control.Feedback type="invalid" tooltip>
                    {fieldData.error}
                   </Form.Control.Feedback>
			     </Col>
			   </Form.Group>
			}
		 </Col>)})}
       </>)
    });
	return (
		<Row>
		 <Col sm="6">
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
	      {formFields}
		</Row>
	)
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
			     <Form.Group as={Row} controlId="bankDivision">
                  <Form.Label column sm="5">Bank Division <span className={styles.mandatory}>*</span></Form.Label>
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
				<Col md="6">
				  <Form.Group as={Row} controlId="productFamily">
					<Form.Label column sm="5">Product Family <span className={styles.mandatory}>*</span></Form.Label>
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
				  </Form.Group>
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
				  <Form.Group as={Row} controlId="productName">
					<Form.Label column sm="5">Product Name <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.productName.error} value={state.productName.data} onChange={onSelectedSingleOptionChange('productName')}>
						<option value="">Please Select</option>
						{createProductName()}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.productName.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
			    </Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="totalCustomerLimit">
					<Form.Label column sm="5">Total Customer Limit <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control type="text" isInvalid={state.totalCustomerLimit.error} value={state.totalCustomerLimit.data} autoComplete="off" onChange={onTextUpdated('totalCustomerLimit')} />
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.totalCustomerLimit.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
				  <Form.Group as={Row} controlId="turnOver">
					<Form.Label column sm="5">Turnover <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control type="text" isInvalid={state.turnOver.error} value={state.turnOver.data} autoComplete="off" onChange={onTextUpdated('turnOver')} />
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.turnOver.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
			    </Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="balanceSheetNetAsset">
					<Form.Label column sm="5">Balance Sheet Net Assets <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control type="text" isInvalid={state.balanceSheetNetAsset.error} value={state.balanceSheetNetAsset.data} autoComplete="off" onChange={onTextUpdated('balanceSheetNetAsset')} />
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.balanceSheetNetAsset.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
				  <Form.Group as={Row} controlId="pricingMethodId">
					<Form.Label column sm="5">Pricing Method <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.pricingMethodId.error} value={state.pricingMethodId.data} onChange={customerDealSegementOptionChange('pricingMethodId')}>
						<option value="">Please Select</option>
						{businessAttributes.data['MN001'] && businessAttributes.data['MN001'].map((item) => {
						  return (<option value={item.attributeId}>{item.refDataDesc}</option>)
					    })}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.pricingMethodId.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
				</Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="customerDealSegmentId">
					<Form.Label column sm="5">Customer Deal Segment <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.customerDealSegmentId.error} value={state.customerDealSegmentId.data} onChange={customerDealSegementOptionChange('customerDealSegmentId')}>
						<option value="">Please Select</option>
						{customerDealSegmentId.data.map((item) => {
						  return (<option value={item.customerDealSegmentId}>{item.customerDealSegmentName}</option>)
					    })}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.customerDealSegmentId.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
				</Col>
			  </Row>
		      {renderDynamicFormFields()}
			  <Row>
			  <Col md="6">
			  <Form.Group as={Row} controlId="environment">
			   <Form.Label column sm="5">Environment <span className={styles.mandatory}>*</span></Form.Label>
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
			  <Col md="6">
			  <Form.Group as={Row} controlId="wsdlUrl">
			   <Form.Label column sm="2">URL <span className={styles.mandatory}>*</span></Form.Label>
			   <Col sm="9" className={styles.urlBox}>
				<Form.Control as="textarea" isInvalid={state.wsdlUrl.error} disabled={state.wsdlUrl.disabled} value={state.wsdlUrl.data} autoComplete="off" onChange={onURLUpdated('wsdlUrl')} rows="1" />
				 {state.wsdlUrl.message && <div className={styles.tickIcon} />}
				 <Form.Control.Feedback type="invalid" tooltip>
				{state.wsdlUrl.error}
				</Form.Control.Feedback>
				<div className={styles.mandatory}>Please enter URL appropriate to the selected Environment</div>
				</Col>
			   </Form.Group>
			   </Col>
			  </Row>
			  <div>
			   <Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
               <Button variant="primary" disabled={checkSubmitButton()} onClick={handleSubmit}>Next</Button>
			   <Button className={styles.referenceButton} variant="primary" disabled="true">View Reference Data</Button>
			   <div className={styles.urlForm}>
				 {state.wsdlUrl.loader ? 
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
			  </div>
            </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default BusinessParameters;
