import React, {useState, useEffect, useRef} from 'react';
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
  const {slug} = params
  const { state: backFormData } = location
  const dynamicFormFields = useRef({methods: {}})
  const tempMethod = useRef('')
  
  const initial = {	
	productFamily: {data: '', error: '', valid: false, errorMessage: 'Please select Product Family', key: null},
	productName: {data: '', error: '', valid: false, errorMessage: 'Please select Product Name', key: null},
	bankDivision : {data: '', error: '', valid: false, errorMessage: 'Please select Bank Division', key: null},
 	pricingMethodId: {data: '', error: '', valid: false, errorMessage: 'Please select Pricing Method', key: null},
	environment: {data: '', error: '', valid: false, errorMessage: 'Please enter Environment', key: null},
	customerDealSegmentId: {data: '', error: '', valid: false, errorMessage: 'Please select Customer Deal Segment', key: null},
    wsdlUrl: {data: '', error: '', valid: false, loader: false, disabled: true, message: '', errorMessage: 'Please enter URL', key: null}
  }
  const [state, setState] = useState(backFormData ? backFormData.formData : initial)
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
	  Service.get('/rbs/th/gp/businessAttributes')
	  .then((response) => {
		const { data } = response
		let attrs = {}
		data.map((item) => {
		  const key = item.refDataKey.slice(0,2)
		  if (attrs[key] === undefined) {
			attrs[key] = []
		  }
		  attrs[key].push(item)
		})
		setBusinessAttributes({data: attrs, loader: false})
	  })
	  .catch(() => {
		const data = [
		{
			"attributeId": 1,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": 'Y',
			"refDataDesc": "Generic Pricing Method",
			"refDataKey": "AP001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 18,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": 'Y',
			"refDataDesc": "Lombard",
			"refDataKey": "AP002",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"attributeId": 2,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": 'Y',
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
			"attributeId": 4,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Fixed Rate Loan",
			"refDataKey": "PR001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}, {
			"attributeId": 5,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Variable Rate Loan",
			"refDataKey": "PR001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		} , {
			"attributeId": 14,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Small Business Loan (Fixed)",
			"refDataKey": "PR001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}, {
			"attributeId": 6,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Overdraft",
			"refDataKey": "PF002",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}, {
			"attributeId": 7,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": {},
			"refDataDesc": "Overdraft Rate Loan",
			"refDataKey": "PR002",
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
			"refDataDesc": "AIR APR Method",
			"refDataKey": "MN001"
		}]
		let attrs = {}
		data.map((item) => {
		  const key = item.refDataKey.slice(0,2)
		  if (attrs[key] === undefined) {
			attrs[key] = []
		  }
		  attrs[key].push(item)
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
		},
		{
			"customerDealSegmentId": "CDS12",
			"customerDealSegmentName": "CPB Small Business",
			"isActive": "Y"
		},{
			"customerDealSegmentId": "CDS13",
			"customerDealSegmentName": "PBB Small Business",
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
	let fieldName = state.pricingMethodId.text.toLowerCase().replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1+p2.toUpperCase(); } )
	fieldName = fieldName.replace(/\s/g, '')
	fieldName = `${fieldName[0].toLowerCase() + fieldName.slice(1)}Id`
	if (!tempMethod.current || (tempMethod.current && fieldName !== tempMethod.current)) {
	  if (tempMethod.current) {
		delete state[tempMethod.current]
	  }
	  tempMethod.current = fieldName
	  let checkBackTempMethod = false
	  if (backFormData && backFormData.tempMethod) {
		  checkBackTempMethod = true;
	  }
      if (!checkBackTempMethod) {
		formData[fieldName] = {data: '', error: '', valid: false, errorMessage: `Please select ${state.pricingMethodId.text}`, text: state.pricingMethodId.text}
	  }
    }
	if (backFormData && backFormData.tempMethod) {
		dynamicFormFields.current = backFormData.dynamicFormFields
	    backFormData.tempMethod = null
	} else {
		dynamicFormFields.current = { methods: {[fieldName]: data} }
	}
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
		   {methodId: 'MM20', methodName: 'CPB Trad Small Comm PPFL Margin'},
		   {methodId: 'MM3', methodName: 'CPB Trad Busi Loans Margin'}
		  ]
		  createDynamicMethod(data)
	    })
	  }
  }, [state.customerDealSegmentId.data, state.pricingMethodId.data])
  
  function validation(forms) {
	let errors = ''
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
  
  function createApplicationIdentity() {
    let appIdentity = ''
	businessAttributes.data['AP'].forEach((item) => {
		const field = item.refDataDesc.replace(/\s/g, '-').toLowerCase()
		if (slug === field) {
			appIdentity = item.attributeId
		}
	})
	return appIdentity
  }
  
  function buildJSON(forms) {
	  const lists = {}
	  Object.keys(forms).map((item) => {
		const formData = forms[item].data
	    if (forms[item].disabled && item !== 'productFamily') {
			lists[item] = null;
			delete lists[item]
		}
		else if (forms[item].paramPropertyName) {
			if (forms[item].type === 'commaSeperated') {
				lists[forms[item].paramPropertyName] = forms[item].data.split(',').map(Number)
			} else {
				lists[forms[item].paramPropertyName] = forms[item].data
			}
		}
		else if (forms[item].type === 'commaSeperated') {
			lists[item] = forms[item].data.split(',').map(Number)
		}
		else if(!forms[item].type && formData % 1 === 0){
			lists[item] = Number(forms[item].data)
		} else {
			lists[item] = forms[item].data
		}
	  })
	  lists['userId'] = localStorage.getItem('logged');
	  lists['applicationIdentity'] = createApplicationIdentity()
	  Service.post('/rbs/th/gp/testdata', lists)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/generic-test-cases/test-data',
			state: {postData: data, formData: forms, dynamicFormFields: dynamicFormFields.current, tempMethod: true}
		})
	 })
	 .catch(() => {
		 const data = {
			"testSetId": 1169,
			"applicationIdentity": "Ulster",
			"bankDivision": "Commercial",
			"productFamily": "Loans",
			"productName": "Fixed Rate Loan",
			"totalRecord": 2,
			"environment": "NFT",
			"marginMethodId": "MM5",
			"marginMethodName": "CPB Trad Busi Loans",
			"customerDealSegmentId": "CDS6",
			"customerDealSegmentName": "CPB Trading Busi",
			"pricingMethodId": 8,
			"pricingMethodName": "Margin Method",
			"genericPricingTestCaseList": [
			{
				"testTransactionId": 22846,
				"testTransactionNo": "TH_001_001",
				"totalCustomerLimit": 100,
				"turnOver": null,
				"balanceSheetNetAsset": 1000,
				"termFactor": 11,
				"masterGradingScale": 10,
				"sector": "Agriculture",
				"securityCoverage": 55,
				"expectedMarginRate": 55.1,
				"actualMarginRate": 33.4
			},
			{
				"testTransactionId": 22846,
				"testTransactionNo": "TH_001_001",
				"totalCustomerLimit": 100,
				"turnOver": 1200,
				"balanceSheetNetAsset": 1000,
				"termFactor": 11,
				"masterGradingScale": 10,
				"sector": "Agriculture",
				"securityCoverage": 55,
				"expectedMarginRate": 55.1,
				"actualMarginRate": 33.4
			},
			{
				"testTransactionId": 22846,
				"testTransactionNo": "TH_001_001",
				"totalCustomerLimit": 100,
				"turnOver": 1200,
				"balanceSheetNetAsset": 1000,
				"termFactor": 11,
				"masterGradingScale": 10,
				"sector": "Agriculture",
				"securityCoverage": 55,
				"expectedMarginRate": 55.1,
				"actualMarginRate": 33.4
			}
			]
		  }
		  history.push({
			pathname: '/generic-test-cases/test-data',
			state: {postData: data, formData: forms, dynamicFormFields: dynamicFormFields.current, tempMethod: true}
		})
	 })
  }
  
  function handleReset() {
	  setState({...state, ...initial})
  }
  
  const onURLUpdated = (label) => (e) => {
	  setState({...state, [label]: {data: e.target.value, error: '', valid: false}})
  }
  
  const onTextUpdated = (label, min, max) => (e) => {
	  const data = e.target.value;
	  const checkCommas = data.split(',')
	  const totCommas = checkCommas.length
	  const eachData = checkCommas[totCommas-1]
	  const lastBeforeData = checkCommas[totCommas-2]
	  const regex = /^[\d\,]+$/g
	  let valid = ''
	  let validFlag = true
	  if (lastBeforeData && (Number(lastBeforeData) < min || (Number(lastBeforeData) > max && max))) {
		  valid = errorMsg
		  validFlag = false
	  }
	  if (data === '' || (data && regex.test(data) && checkCommas[0] !== "")) {
		if (data === '') {
			const maxValue = max ? ` and Max of ${max}` : ''
			valid = `Please check the value should be Min of ${min}${maxValue}`
		}
		setState({...state, [label]: {data: data, error: valid, valid: validFlag, type: 'commaSeperated'}})
	  }
  }
  
  const removeUnwantedComma = (label, min, max) => (e) => {
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
	  let valid = ''
	  let validFlag = true
	  if (eachData && (Number(eachData) < min || (Number(eachData) > max && max))) {
		  const maxValue = max ? ` and Max of ${max}` : ''
		  valid = `Please check the value should be Min of ${min}${maxValue}`
		  validFlag = false
	  }
	  if (valid) {
		  setState({...state, [label]: {
			  data: data, error: valid, valid: validFlag, type: 'commaSeperated'}})
	  }
	  if (isCommaLast && !valid) {
		  setState({...state, [label]: {data: data, error: '', valid: true, type: 'commaSeperated'}})
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
  
  const onSelectedSingleOptionChange = (label, key = null) => (e) => {
	const data = e.target.value
	if (data === '') {
		let formData = {
		  [label]: {...state[label], data: '', error: state[label].errorMessage, valid: false, key: key}
		}
		if (label === 'environment') {
		  formData['wsdlUrl'] = state.wsdlUrl
		}
		if (label === 'sector' && (state['sICCode'] || state['borrowingAmount'])) {
			formData['sICCode'] = {...state['sICCode'], data: ''}
			formData['borrowingAmount'] = {...state['borrowingAmount'], data: ''}
		}
		if (label === 'slottingCategory' && state['masterGradingScale']) {
			formData['masterGradingScale'] = {...state['masterGradingScale'], data: ''}
		}
		if (label === 'midTermFlag') {
			formData['borrowingAmount'] = {...state['borrowingAmount'], valid: true, disabled: true, data: ''}
			formData['increaseAmount'] = {...state['increaseAmount'], valid: true, disabled: true, data: ''}
		}
		setState({...state, ...formData})
	} else {
		const text = e.target.options[e.target.selectedIndex].text
		let formData = {
		  [label]: {...state[label], data: data, error: '', valid: true, key: key, text: text}
		}
		if (label === 'environment') {
		  formData['wsdlUrl'] = {...state.wsdlUrl, disabled: false, key: key}
		}
		if (label === 'productName') {
			formData['customerDealSegmentId'] = {...state['customerDealSegmentId'], data: '', valid: false}
			dynamicFormFields.current = {methods: {}}
			if (text === 'Small Business Loan (Fixed)') {
				const pricingMethodOption = businessAttributes.data['MN'].filter((item) => {
					return item.refDataDesc === 'AIR APR Method'
				})
				formData['pricingMethodId'] = {...state['pricingMethodId'], data: pricingMethodOption[0].attributeId, text: pricingMethodOption[0].refDataDesc, valid: true}
			} else {
				formData['pricingMethodId'] = {...state['pricingMethodId'], data: '', valid: false, text: ''}
			}
		}
		if (label === 'productFamily') {
		  let refKey = data.split('|')
		  const required = text === 'Overdraft' ? true: false
		  formData['productFamily'] = {...state[label], data: refKey[0], error: '', valid: true, key: refKey[1], disabled: required}
		  const productData = state.productFamily.data !== data ? '' : state['productName']
		  formData['productName'] = {...state['productName'], valid: required, data: productData}
		}
		if (label === 'midTermFlag') {
			let required = data === 'Yes' ? true : false
			formData['borrowingAmount'] = {...state['borrowingAmount'], valid: required, disabled: required, data: ''}
			formData['increaseAmount'] = {...state['increaseAmount'], valid: !required, disabled: !required, data: ''}
		}
		if (state.marginMethodId && state.marginMethodId.data !== 'MM20' && label === 'sector' && (state['sICCode'] || state['borrowingAmount'])) {
			let required = (data === 'Health' || data === 'Other') ? false : true
			if (state['sICCode']) {
				formData['sICCode'] = {...state['sICCode'], valid: required, disabled: required, data: (required ? '' : state['sICCode'].data)}
			}
			required = (data === 'Health' || data === 'Agriculture') ? true : false
			if (state['borrowingAmount']) {
				formData['borrowingAmount'] = {...state['borrowingAmount'], valid: required, disabled: required, data: (required ? '' : state['borrowingAmount'].data)}
			}
		}
		if (label === 'slottingCategory' && state['masterGradingScale']) {
			const required = data === 'Otherwise' ? false : true
			formData['masterGradingScale'] = {...state['masterGradingScale'], valid: required, disabled: required, data: (required ? '' : state['masterGradingScale'].data)}
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
		  const checkFormFieldsDisabled = {}
		  data.map((item) => {
			if (item.paramPropertyName === 'sector' || item.paramPropertyName === 'slottingCategory' || item.paramPropertyName === 'midTermFlag') {
				checkFormFieldsDisabled[item.paramPropertyName] = true
			}
		  })
		  data.map((item) => {
		    if (attrs[item.paramRefId] === undefined) {
			  attrs[item.paramRefId] = []
		    }
			if (item.paramRefId === null) {
				let field = item.paramName.replace(/\s/g, '')
				field = field[0].toLowerCase() + field.slice(1)
				const disabled = (
				  (checkFormFieldsDisabled['sector'] && item.paramPropertyName === 'sicCode') ||
				  (selectedData !== 'MM20' &&  checkFormFieldsDisabled['sector'] && item.paramPropertyName === 'borrowingAmount') ||
				  (checkFormFieldsDisabled['slottingCategory'] && item.paramPropertyName === 'masterGradingScale') ||
				  (checkFormFieldsDisabled['midTermFlag'] && (item.paramPropertyName === 'borrowingAmount' || item.paramPropertyName === 'increaseAmount'))
				) ? true: false
				item.paramFlag = item.paramFlag === null ? 'N': item.paramFlag 
				formData[field] = {data: '', error: '', valid: false, dynamicFields: true, disabled: disabled, errorMessage: `Please select ${item.paramName}`, paramPropertyName: item.paramPropertyName}
			}
		    attrs[item.paramRefId].push(item)
		  })
		  attrs['null'] = attrs['null'].sort((a,b) => {
			  if (a.paramFlag < b.paramFlag) {
				return 1;
			  }
			  if (a.paramFlag > b.paramFlag){
				return -1;
			  }
			  return 0;
		  })
		  dynamicFormFields.current = { ...dynamicFormFields.current, formfields: attrs }
		  formData[label] = {...state[label], data: selectedData, error: '', valid: true}
		  let newState = {}
		  for (const item in state) {
			if (!state[item].dynamicFields) {
			  newState[item] = state[item]
			}
		  }
		  setState({...newState, ...formData})
	    })
	    .catch((error) => {  
		  let data = []
		  if ((state.marginMethodId && state.marginMethodId.data === 'MM1') || (state.feeMethodId && state.feeMethodId.data === 'MM1')) {
			  data = [
			   {paramId: 'P12', paramRefId: null, paramName: 'Deposit %', paramFlag: null, paramPropertyName: 'depositPercentage', maxValue: null, minValue: 0, toolTipDesc: 'Please enter the value min of 500'},
			   {paramId: 'P2', paramRefId: null, paramName: 'SIC Code', paramFlag: 'Y', paramPropertyName: 'sicCode', maxValue: null, minValue: 500, toolTipDesc: 'Please enter the value min of 500'},
               {paramId: 'P92', paramRefId: 'P2', paramName: 'Sector', paramFlag: null, paramPropertyName: 'sector'},
			   {paramId: 'P19', paramRefId: null, paramName: 'Borrowing Amount', paramFlag: null, paramPropertyName: 'borrowingAmount', maxValue: null, minValue: 500, toolTipDesc: 'Please enter the value min of 500'},
			   {paramId: 'P5', paramRefId: null, paramName: 'Sector', paramFlag: 'Y', paramPropertyName: 'sector'},
			   {paramId: 'P6', paramRefId: 'P5', paramName: 'Health', paramFlag: null},
			   {paramId: 'P7', paramRefId: 'P5', paramName: 'Agriculture', paramFlag: null},
			   {paramId: 'P8', paramRefId: 'P5', paramName: 'Media', paramFlag: null},
			   {paramId: 'P9', paramRefId: 'P5', paramName: 'Other', paramFlag: null},
			   {paramId: 'P11', paramRefId: 'P10', paramName: 'Code', paramFlag: null},
			  ]
		  } else {
			  data = [
			   {paramId: 'P1', paramRefId: null, paramName: 'Increase Amount', paramFlag: null, paramPropertyName: 'increaseAmount', maxValue: null, minValue: 500, toolTipDesc: 'Please enter the value min of 500'},
			   {paramId: 'P19', paramRefId: null, paramName: 'Borrowing Amount', paramFlag: null, paramPropertyName: 'borrowingAmount', maxValue: null, minValue: 500, toolTipDesc: 'Please enter the value min of 500'},
			   {paramId: 'P4', paramRefId: null, paramName: 'Master Grading Scale', paramFlag: null, paramPropertyName: 'masterGradingScale', maxValue: 50000, minValue: 500, toolTipDesc: 'Please enter the value min of 500'},
			   {paramId: 'P5', paramRefId: null, paramName: 'Slotting Category', paramFlag: 'Y', paramPropertyName: 'slottingCategory'},
			   {paramId: 'P6', paramRefId: 'P5', paramName: 'Health', paramFlag: null},
			   {paramId: 'P7', paramRefId: 'P5', paramName: 'Otherwise', paramFlag: null},
			   {paramId: 'P8', paramRefId: null, paramName: 'Mid Term Flag', paramFlag: 'Y', paramPropertyName: 'midTermFlag'},
			   {paramId: 'P9', paramRefId: 'P8', paramName: 'Yes', paramFlag: null},
			   {paramId: 'P10', paramRefId: 'P8', paramName: 'No', paramFlag: null},
			  ]
		  }
		  let attrs = {}
		  let formData = {}
		  const checkFormFieldsDisabled = {}
		  data.map((item) => {
			if (item.paramPropertyName === 'sector' || item.paramPropertyName === 'slottingCategory' || item.paramPropertyName === 'midTermFlag') {
				checkFormFieldsDisabled[item.paramPropertyName] = true
			}
		  })
		  data.map((item) => {
		    if (attrs[item.paramRefId] === undefined) {
			  attrs[item.paramRefId] = []
		    }
			if (item.paramRefId === null) {
				let field = item.paramName.replace(/\s/g, '')
				field = field[0].toLowerCase() + field.slice(1)
				const disabled = (
				  (checkFormFieldsDisabled['sector'] && item.paramPropertyName === 'sicCode') ||
				  (selectedData !== 'MM20' && checkFormFieldsDisabled['sector'] && item.paramPropertyName === 'borrowingAmount') ||
				  (checkFormFieldsDisabled['slottingCategory'] && item.paramPropertyName === 'masterGradingScale') ||
				  (checkFormFieldsDisabled['midTermFlag'] && (item.paramPropertyName === 'borrowingAmount' || item.paramPropertyName === 'increaseAmount'))
				) ? true: false
				item.paramFlag = item.paramFlag === null ? 'N': item.paramFlag 
				formData[field] = {data: '', error: '', valid: false, dynamicFields: true, disabled: disabled, errorMessage: `Please select ${item.paramName}`, paramPropertyName: item.paramPropertyName}
			}
		    attrs[item.paramRefId].push(item)
		  })
		  attrs['null'] = attrs['null'].sort((a,b) => {
			  if (a.paramFlag < b.paramFlag) {
				return 1;
			  }
			  if (a.paramFlag > b.paramFlag){
				return -1;
			  }
			  return 0;
		  })
		  dynamicFormFields.current = { ...dynamicFormFields.current, formfields: attrs }
		  formData[label] = {...state[label], data: selectedData, error: '', valid: true}
		  let newState = {}
		  for (const item in state) {
			if (!state[item].dynamicFields) {
			  newState[item] = state[item]
			}
		  }
		  setState({...newState, ...formData})
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
		const refKey = state.productFamily.key.slice(2)
		return businessAttributes.data['PR'] && businessAttributes.data['PR'].map((item) => {
		  if (item.refDataKey === `PR${refKey}`) {
			return (<option value={item.attributeId}>{item.refDataDesc}</option>)
		  }
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
		  Service.post(`/rbs/th/gp/validateUrl/?url=${state.wsdlUrl.data}`)
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
		   let fieldName = field.paramName.replace(/\s/g, '')
		   fieldName = fieldName[0].toLowerCase() + fieldName.slice(1)
		   const fieldData = state[fieldName]
		   return (!fieldData.disabled ? <Col md="6">
			{field.paramRefId === null && field.paramFlag === 'N' ? 
			   <Form.Group as={Row} controlId={field.paramName}>
				<Form.Label column sm="5">{field.paramName} <span className={styles.mandatory}>*</span></Form.Label>
				 <Col sm="6">
				  <Form.Control type="text" isInvalid={fieldData.error} value={fieldData.data} autoComplete="off" onBlur={removeUnwantedComma(fieldName, field.minValue, field.maxValue)} onChange={onTextUpdated(fieldName, field.minValue, field.maxValue)} />
				  <Form.Control.Feedback type="invalid" tooltip>
                   {fieldData.error}
                  </Form.Control.Feedback>
				  <OverlayTrigger
					  placement="right"	
					  overlay={
						<Tooltip>{field.toolTipDesc}</Tooltip>
					  }
					>
					<div className={styles.tooltip}><div className={styles.qicon} /></div>
				  </OverlayTrigger>
				 </Col>
				</Form.Group>
				:
		       <Form.Group as={Row} controlId={field.paramName}>
			    <Form.Label column sm="5">{field.paramName} {!fieldData.disabled ? <span className={styles.mandatory}>*</span>: ''}</Form.Label>
			     <Col sm="6">
			      <Form.Control as="select" isInvalid={fieldData.error} disabled={fieldData.disabled} value={fieldData.data} onChange={onSelectedSingleOptionChange(fieldName)}>
				   <option value="">Please Select</option>
				   {dynamicFormFields.current.formfields[field.paramId].map((item) => {
				    return (<option value={item.paramName}>{item.paramName}</option>)
				   })}
			      </Form.Control>
				  <Form.Control.Feedback type="invalid" tooltip>
                    {fieldData.error}
                   </Form.Control.Feedback>
			     </Col>
			   </Form.Group>
			}
		 </Col>: '')})}
       </>)
    });
	return (
		<Row>
	      {formFields}
		</Row>
	)
  }
	
  function setPricingMethod() {
    let pricingMethod = state.pricingMethodId.text
    if (pricingMethod) {
	  pricingMethod = pricingMethod.toLowerCase().replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1+p2.toUpperCase(); } )
	  pricingMethod = pricingMethod.replace(/\s/g, '')
      pricingMethod = `${pricingMethod[0].toLowerCase() + pricingMethod.slice(1)}Id`
	  pricingMethod = state[pricingMethod] && state[pricingMethod].data
    }
    return pricingMethod
  }

  function setPricingMethodOption() {
	  let pricingMethod = state.pricingMethodId.text
	  if (pricingMethod === 'AIR APR Method') {
		const methodOption = businessAttributes.data['MN'] && businessAttributes.data['MN'].filter((item) => {
			return item.refDataDesc === 'Margin Method'
		})
		return methodOption[0].attributeId 
	  }
	  return state.pricingMethodId.data
  }
  
  function checkReferenceData() {
	 if (state.customerDealSegmentId.data !== '' && state.pricingMethodId.data != '' && setPricingMethod() != '') {
		return false
	 } else {
		return true
	 }
  }
  
  const viewReferenceData = (link) => () => {
	window.open(link,'_blank');
  }
 
  const handleCustomerDealSegment = () => {
	const customerDealSegmentOptions = customerDealSegmentId.data && customerDealSegmentId.data.map(item => {
		if (state.productName.text === "Small Business Loan (Fixed)" && (item.customerDealSegmentName === 'PBB Small Business' || item.customerDealSegmentName === 'CPB Small Business')) {
			return(<option value={item.customerDealSegmentId}>{item.customerDealSegmentName}</option>)
		}
		if (state.productName.text !== "Small Business Loan (Fixed)" && (item.customerDealSegmentName !== 'PBB Small Business' && item.customerDealSegmentName !== 'CPB Small Business')) {
			return(<option value={item.customerDealSegmentId}>{item.customerDealSegmentName}</option>)
		}
	})
	return customerDealSegmentOptions
  }
  
  const handlePricingMethod = () => {
    const pricingMethodOptions = businessAttributes.data['MN'] && businessAttributes.data['MN'].map((item) => {
	  if (state.productName.text === "Small Business Loan (Fixed)" && item.refDataDesc === 'AIR APR Method') {
		return(<option value={item.attributeId}>{item.refDataDesc}</option>)
	  }
	  if (state.productName.text !== "Small Business Loan (Fixed)") {
		return(<option value={item.attributeId}>{item.refDataDesc}</option>)
	  }
	})
	return pricingMethodOptions
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
					  {businessAttributes.data['BU'] && businessAttributes.data['BU'].map((item) => {
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
					  <Form.Control as="select" isInvalid={state.productFamily.error} value={`${state.productFamily.data}|${state.productFamily.key}`} onChange={onSelectedSingleOptionChange('productFamily')}>
						<option value="">Please Select</option>
						{businessAttributes.data['PF'] && businessAttributes.data['PF'].map((item) => {
						  return (<option value={`${item.attributeId}|${item.refDataKey}`}>{item.refDataDesc}</option>)
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
					<Form.Label column sm="5">Product Name {!state.productFamily.disabled ? <span className={styles.mandatory}>*</span>: ''}</Form.Label>
					<Col sm="6">
					  <Form.Control as="select" disabled={state.productFamily.disabled} isInvalid={state.productName.error} value={state.productName.data} onChange={onSelectedSingleOptionChange('productName')}>
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
				  <Form.Group as={Row} controlId="pricingMethodId">
					<Form.Label column sm="5">Pricing Method <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.pricingMethodId.error} value={state.pricingMethodId.data} onChange={customerDealSegementOptionChange('pricingMethodId')}>
						<option value="">Please Select</option>
						{handlePricingMethod()}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.pricingMethodId.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
				</Col>
			  </Row>
			  <Row>
			    <Col md="6">
				  <Form.Group as={Row} controlId="customerDealSegmentId">
					<Form.Label column sm="5">Customer Deal Segment <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.customerDealSegmentId.error} value={state.customerDealSegmentId.data} onChange={customerDealSegementOptionChange('customerDealSegmentId')}>
						<option value="">Please Select</option>
						{handleCustomerDealSegment()}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.customerDealSegmentId.error}
					  </Form.Control.Feedback>
					</Col>
				  </Form.Group>
				</Col>
				<Col sm="6">
				   {Object.keys(dynamicFormFields.current.methods).map((method) => {
					 return (<Form.Group as={Row} controlId={method}>
					   <Form.Label column sm="5">{state[method].text} <span className={styles.mandatory}>*</span></Form.Label>
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
				<Form.Control as="textarea" isInvalid={state.wsdlUrl.error} disabled={state.wsdlUrl.disabled} value={state.wsdlUrl.data} autoComplete="off" onChange={onURLUpdated('wsdlUrl')} rows="2"/>
				 {state.wsdlUrl.message && <div className={styles.tickIcon} />}
				 <Form.Control.Feedback type="invalid" tooltip>
				{state.wsdlUrl.error}
				</Form.Control.Feedback>
				<OverlayTrigger
				  placement="top"	
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
				</Col>
			   </Form.Group>
			   </Col>
			  </Row>
			  <div>
			   <Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
               <Button variant="primary" disabled={checkSubmitButton()} onClick={handleSubmit}>Next</Button>
			   <Button className={styles.referenceButton} variant="primary" disabled={checkReferenceData()} onClick={viewReferenceData(`${Service.getApiRoot()}/rbs/th/gp/generatelookup/${localStorage.getItem('logged')}/${state.customerDealSegmentId.data}/${setPricingMethodOption()}/${setPricingMethod()}`)}>View Reference Data</Button>
			   <div className={styles.urlForm}>
				 { state.wsdlUrl.loader ? 
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
