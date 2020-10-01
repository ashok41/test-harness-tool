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
  const dynamicFormFields = useRef({methods: {}, nonMethods: {}})
  const tempMethod = useRef('')
  
  const initial = {	
	subRulePackage: {data: '', error: '', valid: false, errorMessage: 'Please select Sub Rule Package', key: null},
	rulePackage : {data: '', error: '', valid: false, errorMessage: 'Please select Rule Package', key: null},
	environment: {data: '', error: '', valid: false, errorMessage: 'Please enter Environment', key: null},
    wsdlUrl: {data: '', error: '', valid: false, loader: false, disabled: true, message: '', errorMessage: 'Please enter URL', key: null}
  }
  const [state, setState] = useState(backFormData ? backFormData.formData : initial)
  const [error, setError] = useState('')
  const [rulePackageState, setRulePackage] = useState([])
  const [subRulePackageState, setSubRulePackage] = useState([])
  const [methodNameState, setMethodName] = useState([])
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
  
  function getRulePackage() {
	  Service.get('/rbs/th/lf/rulepackage')
	  .then((response) => {
		const { data } = response
		setRulePackage(data)
	  })
	  .catch(() => {
		const data = [
		{
			"rulePackageId": "RP1",
			"rulePackageName": "Asset Purchase",
			"subRulePackageId": 1,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": 'Y',
			"refDataDesc": "Generic Pricing Method",
			"refDataKey": "AP001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"rulePackageId": "RP2",
			"rulePackageName": "Cash Release",
			"subRulePackageId": 1,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": 'Y',
			"refDataDesc": "Lombard",
			"refDataKey": "AP002",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}]
		setRulePackage(data)
	  })
  }
  
  function getMethodName() {
	const subRule = state.subRulePackage.data.split('|')
	Service.get(`/rbs/th/lf/parameter-mappings/${state.rulePackage.data}/${subRule[0]}`)
	  .then((response) => {
		const { data } = response
		setMethodName(data)
	  })
	  .catch(() => {
		const data = [
		{
			"subRulePackageId": "RP1",
			"packageName": "Method Name",
			"subRulePackageId": 1,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"isActive": 'Y',
			"refDataDesc": "Generic Pricing Method",
			"refDataKey": "AP001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"subRulePackageId": "RP2",
			"packageName": "Asset Purchase",
			"subRulePackageId": 1,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"refDataDesc": "Lombard",
			"refDataKey": "AP002",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}]
		setMethodName(data)
	  })  
  }
  
  function getSubRulePackage() {
	  Service.get('/rbs/th/lf/sub-rulepackage')
	  .then((response) => {
		const { data } = response
		setSubRulePackage(data)
	  })
	  .catch(() => {
		const data = [
		{
			"subRulePackageId": "RP1",
			"subRulePackageName": "Business Banking",
			"subRulePackageId": 1,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"subRulePackageFlag": 'Y',
			"refDataDesc": "Generic Pricing Method",
			"refDataKey": "AP001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"subRulePackageId": "RP2",
			"subRulePackageName": "Commercial Banking",
			"subRulePackageId": 1,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"refDataDesc": "Lombard",
			"refDataKey": "AP002",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}]
		setSubRulePackage(data)
	  })
  }
  
  useEffect(() => {
	 const rulePackageData = rulePackage.length
	 if (rulePackageData !== 0) {
		getRulePackage()
	 }
  }, [rulePackageState.data])
  
  useEffect(() => {
	 if (subRulePackage.length !== 0) {
		getSubRulePackage()
	 }
  }, [subRulePackageState.data])
  
  useEffect(() => {
	 if (state.subPackageNameId && state.subPackageNameId.data) {
		Service.get(`/rbs/th/lf/parameter-mappings/${state.rulePackage.data}/${state.subPackageNameId.data}`)
		  .then((response) => {
			const { data } = response
			createDynamicMethod(data, 'methods')
		  })
		  .catch(() => {
			const data = [
			{
				"paramId": "P25",
				"paramName": "Method Name",
				"createdBy": "R123",
				"createdTs": "2020-06-09T04:38:41.688Z",
				"isActive": 'Y',
				"refDataDesc": "Generic Pricing Method",
				"refDataKey": "AP001",
				"updatedBy": "R123",
				"updatedTs": "2020-06-09T04:38:41.688Z"
			},
			{
				"paramId": "P26",
				"paramName": "For Asset Purchase",
				"createdBy": "R123",
				"createdTs": "2020-06-09T04:38:41.688Z",
				"refDataDesc": "Lombard",
				"refDataKey": "AP002",
				"updatedBy": "R123",
				"updatedTs": "2020-06-09T04:38:41.688Z"
			},
			{
				"paramId": "P27",
				"paramName": "For a Vehicle",
				"createdBy": "R123",
				"createdTs": "2020-06-09T04:38:41.688Z",
				"refDataDesc": "Lombard",
				"refDataKey": "AP002",
				"updatedBy": "R123",
				"updatedTs": "2020-06-09T04:38:41.688Z"
			}]
			createDynamicMethod(data, 'methods')
		  })
	 }
  }, [state.subPackageNameId && state.subPackageNameId.data])
  
  useEffect(() => {
	 const subRule = state.subRulePackage.data.split('|')
	 if (subRule[0] && subRule[1] !== 'Y') {
		Service.get(`/rbs/th/lf/parameter-mappings/${state.rulePackage.data}/${subRule[0]}`)
		  .then((response) => {
			const { data } = response
			createDynamicMethod(data, 'methods', 'nonMethods')
		  })
		  .catch(() => {
			const data = [
			{
				"paramId": "P25",
				"paramName": "Method Name",
				"createdBy": "R123",
				"createdTs": "2020-06-09T04:38:41.688Z",
				"isActive": 'Y',
				"refDataDesc": "Generic Pricing Method",
				"refDataKey": "AP001",
				"updatedBy": "R123",
				"updatedTs": "2020-06-09T04:38:41.688Z"
			},
			{
				"paramId": "P26",
				"paramName": "For Asset Purchase",
				"createdBy": "R123",
				"createdTs": "2020-06-09T04:38:41.688Z",
				"refDataDesc": "Lombard",
				"refDataKey": "AP002",
				"updatedBy": "R123",
				"updatedTs": "2020-06-09T04:38:41.688Z"
			},
			{
				"paramId": "P27",
				"paramName": "For a Vehicle",
				"createdBy": "R123",
				"createdTs": "2020-06-09T04:38:41.688Z",
				"refDataDesc": "Lombard",
				"refDataKey": "AP002",
				"updatedBy": "R123",
				"updatedTs": "2020-06-09T04:38:41.688Z"
			}]
			createDynamicMethod(data, 'methods', 'nonMethods')
		  })
	 }
	 if (subRule[0] && subRule[1] === 'Y') {
		Service.get(`/rbs/th/lf/parameter-mappings/${state.rulePackage.data}/${subRule[0]}`)
		  .then((response) => {
			const { data } = response
			createDynamicMethod(data, 'nonMethods', 'methods')
		  })
		  .catch(() => {
			const data = [
			{
				"paramId": "P25",
				"paramName": "Sub Package Name Id",
				"createdBy": "R123",
				"createdTs": "2020-06-09T04:38:41.688Z",
				"isActive": 'Y',
				"refDataDesc": "Generic Pricing Method",
				"refDataKey": "AP001",
				"updatedBy": "R123",
				"updatedTs": "2020-06-09T04:38:41.688Z"
			},
			{
				"paramId": "P26",
				"paramName": "For Asset Purchase",
				"createdBy": "R123",
				"createdTs": "2020-06-09T04:38:41.688Z",
				"refDataDesc": "Lombard",
				"refDataKey": "AP002",
				"updatedBy": "R123",
				"updatedTs": "2020-06-09T04:38:41.688Z"
			},
			{
				"paramId": "P27",
				"paramName": "For a Vehicle",
				"createdBy": "R123",
				"createdTs": "2020-06-09T04:38:41.688Z",
				"refDataDesc": "Lombard",
				"refDataKey": "AP002",
				"updatedBy": "R123",
				"updatedTs": "2020-06-09T04:38:41.688Z"
			}]
			createDynamicMethod(data, 'nonMethods', 'methods')
		  })
	 }
  }, [state.subRulePackage.data])
  

  function createDynamicMethod(data, type1, type2) {
	let formData = {}
	let fieldName = data[0].paramName.toLowerCase().replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1+p2.toUpperCase(); } )
    fieldName = fieldName.replace(/\s/g, '')
    fieldName = `${fieldName[0].toLowerCase() + fieldName.slice(1)}`
	formData[fieldName] = {data: '', error: '', valid: false, errorMessage: `Please select ${data[0].paramName}`, text: data[0].paramName}
	dynamicFormFields.current = {...dynamicFormFields.current, [type2]: {}, [type1]: {[fieldName]: data}, formfields: '', noRecords: data.length }
    setState({...state, ...formData})
  }
  
  function validation(forms) {
	let errors = ''
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
	    if (((forms[item].disabled && item !== 'productFamily') || (forms[item].validField && forms[item].data === ''))) {
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
	  Service.post('/rbs/th/gp/testdata', lists)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/generic-test-cases/test-data',
			state: {postData: data, formData: forms, dynamicFormFields: dynamicFormFields.current, tempMethod: true}
		})
	 })
	 .catch(() => {
		history.push({
			pathname: '/error'
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
	  const regex = /^[\d\,\.]+$/g
	  let valid = ''
	  let validFlag = true
	  if (lastBeforeData && (Number(lastBeforeData) < min || (Number(lastBeforeData) > max && max))) {
		  valid = errorMsg
		  validFlag = false
	  }
	  if (data === '' || (data && regex.test(data) && totCommas <= 10 && checkCommas[0] !== "")) {
		if (data === '') {
			const maxValue = max ? ` and Max of ${max}` : ''
			valid = `Please check the value should be Min of ${min}${maxValue}`
		}
	    const dotSeperated = eachData.split('.')
		const dotregex = /\./
		const paramLists = ['proposedMarginRate', 'proposedOneOffFeeRate', 'proposedOutFeeRate', 'proposedYield', 'guidelineMarginRate',
		'guidelineOneOffFeeRate', 'guidelineOutFeeRate', 'guidelineYield']
		if ((dotregex.test(eachData) && dotSeperated.length < 3 && dotSeperated[1].length <= 15 && paramLists.indexOf(label) !== -1) || !dotregex.test(eachData)) {
			setState({...state, [label]: {data: data, error: valid, valid: validFlag, type: 'commaSeperated'}})
		}
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
	  const eachData = checkCommas[totCommas-1]
	  let valid = ''
	  let validFlag = true
	  if (eachData !== '' && (Number(eachData) < min || (Number(eachData) > max && max))) {
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
  
  
  const rulePackageOptionChange = (label) => (e) => {
	const data = e.target.value
	let formData = {}
	if (data === '') {
		formData[label] = {...state[label], data: '', error: state[label].errorMessage, valid: false}
	} else {
	  if (label === 'subRulePackage') {
	    const refKey = data.split('|')
		formData[label] = {...state[label], data: refKey[0], error: '', valid: true, active: refKey[1] }
	  } else {
		formData[label] = {...state[label], data: data, error: '', valid: true}
	  }
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
		setState({...state, ...formData})
	} else {
		const text = e.target.options[e.target.selectedIndex].text
		let formData = {
		  [label]: {...state[label], data: data, error: '', valid: true, key: key, text: text}
		}
		if (label === 'environment') {
		  formData['wsdlUrl'] = {...state.wsdlUrl, disabled: false, key: key}
		}
		if (label === 'subRulePackage') {
			const refKey = data.split('|')
		    if (state['subPackageNameId'] && refKey[1] !== 'Y') {
				delete state['subPackageNameId']
				dynamicFormFields.current = {...dynamicFormFields.current, nonMethods: {}}
		    }
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
	  const subRule = state.subRulePackage.data.split('|')
	  Service.get(`/rbs/th/lf/parameter-mappings/${state.rulePackage.data}/${subRule[0]}/${state.methodName.data}`)
	    .then((response) => {
		  const { data } = response
		  let attrs = {}
		  let formData = {}
		  const checkFormFieldsDisabled = {}
		  data.map((item) => {
			if (item.paramPropertyName === 'sector') {
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
				  (checkFormFieldsDisabled['sector'] && item.paramPropertyName === 'sicCode')
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
		  let attrs = {}
		  let formData = {}
		  const checkFormFieldsDisabled = {}
		  data.map((item) => {
			if (item.paramPropertyName === 'sector') {
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
				  (checkFormFieldsDisabled['sector'] && item.paramPropertyName === 'sicCode')
				) ? true: false
				item.paramFlag = item.paramFlag === null ? 'N': item.paramFlag 
				item.validField = ((item.paramPropertyName === 'proposedFeeAmount' || item.paramPropertyName === 'dealRegulated')  ? true: false)
				formData[field] = {data: '', error: '', valid: item.validField, validField: item.validField, dynamicFields: true, disabled: disabled, errorMessage: `Please select ${item.paramName}`, paramPropertyName: item.paramPropertyName}
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
				<Form.Label column sm="5">{field.paramName} {!field.validField ? <span className={styles.mandatory}>*</span> : ''}</Form.Label>
				 <Col sm="6">
				  <Form.Control type="text" isInvalid={fieldData.error} value={fieldData.data} autoComplete="off" onBlur={removeUnwantedComma(fieldName, field.minValue, field.maxValue)} onChange={onTextUpdated(fieldName, field.minValue, field.maxValue)} />
				  <Form.Control.Feedback type="invalid" tooltip>
                   {fieldData.error}
                  </Form.Control.Feedback>
				  <OverlayTrigger
					  placement="top"	
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
			    <Form.Label column sm="5">{field.paramName} {(!fieldData.disabled || !field.validField) ? <span className={styles.mandatory}>*</span>: ''}</Form.Label>
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
			{Object.keys(dynamicFormFields.current.nonMethods).map((method) => {
			  return (<Col sm="6"><Form.Group as={Row} controlId={method}>
			   <Form.Label column sm="5">{state[method].text} <span className={styles.mandatory}>*</span></Form.Label>
			   <Col sm="6">
				 <Form.Control as="select" isInvalid={state[method].error} value={state[method].data} onChange={rulePackageOptionChange(method)}>
				   <option value="">Please Select</option>
				   {dynamicFormFields.current.nonMethods[method].slice(1).map((item) => {
					 return (<option value={item.paramId}>{item.paramName}</option>)
				   })}
				  </Form.Control>
				  <Form.Control.Feedback type="invalid" tooltip>
				   {state[method].error}
				  </Form.Control.Feedback>
				</Col>
			   </Form.Group></Col>)
		    })}
			{Object.keys(dynamicFormFields.current.methods).map((method) => {
			  return (<Col sm="6"><Form.Group as={Row} controlId={method}>
			   <Form.Label column sm="5">{state[method].text} <span className={styles.mandatory}>*</span></Form.Label>
			   <Col sm="6">
				 <Form.Control as="select" isInvalid={state[method].error} value={state[method].data} onChange={onSelectedMethodChange(method)}>
				   <option value="">Please Select</option>
				   {dynamicFormFields.current.methods[method].slice(1).map((item) => {
					 return (<option value={item.paramId}>{item.paramName}</option>)
				   })}
				  </Form.Control>
				  <Form.Control.Feedback type="invalid" tooltip>
				   {state[method].error}
				  </Form.Control.Feedback>
				</Col>
			   </Form.Group></Col>)
		    })}
	      {formFields}
		</Row>
	)
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
			     <Form.Group as={Row} controlId="rulePackage">
                  <Form.Label column sm="5">Rule Package <span className={styles.mandatory}>*</span></Form.Label>
                  <Col sm="6">
				    <Form.Control as="select" isInvalid={state.rulePackage.error} value={state.rulePackage.data} onChange={onSelectedSingleOptionChange('rulePackage')}>
                      <option value="">Please Select</option>
					  {rulePackageState && rulePackageState.map((item) => {
						return (<option value={item.rulePackageId}>{item.rulePackageName}</option>)
					  })}
                    </Form.Control>
					<Form.Control.Feedback type="invalid" tooltip>
					   {state.rulePackage.error}
					</Form.Control.Feedback>
				   </Col>
                  </Form.Group>
			    </Col>
				<Col md="6">
				  <Form.Group as={Row} controlId="subRulePackage">
					<Form.Label column sm="5">Sub Rule Package <span className={styles.mandatory}>*</span></Form.Label>
					<Col sm="6">
					  <Form.Control as="select" isInvalid={state.subRulePackage.error} value={`${state.subRulePackage.data}`} onChange={onSelectedSingleOptionChange('subRulePackage')}>
						<option value="">Please Select</option>
						{subRulePackageState && subRulePackageState.map((item) => {
						  return (<option value={`${item.subRulePackageId}|${item.subRulePackageFlag}`}>{item.subRulePackageName}</option>)
						})}
					  </Form.Control>
					  <Form.Control.Feedback type="invalid" tooltip>
					   {state.subRulePackage.error}
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
				  placement="top"	
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
			   <Button className={styles.referenceButton} variant="primary">View Reference Data</Button>
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
