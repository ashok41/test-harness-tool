import React, {useState, useEffect, useRef} from 'react';
import { Row, Col, Card, Breadcrumb, ListGroup, Form, Button, Table, Pagination, Dropdown, DropdownButton, Alert, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import DatePicker from  'react-date-picker'
import ProfileList from '../common/profile-list'
import Service from '../common/service'
import common from '../common/common.scss'
import styles from './lending-report-lists.scss'
	

function ReportLists() {
  const date = new Date()
  const minDate = new Date(date.getFullYear(), 0, 1)
  const initial = {
	  from: {data: date},
	  to: {data: date},
	  rulePackageId : {data: ''},
      subRulePackageId: {data: ''},
	  data: [],
	  noRecords: -1,
	  environment: {data: ''}
  }
  const [state, setState] = useState(initial)
  const [rulePackageState, setRulePackage] = useState([])
  const [subRulePackageState, setSubRulePackage] = useState([])
  const [error, setError] = useState('')
  const [page, setPage] = useState(1);
  const tempMethod = useRef('')
  const dynamicFormFields = useRef({methods: {}, nonMethods: {}})
  const setPageItem = (number) => () => {
	  setPage(number)
  }
  
  let items = [];
  const total = Math.ceil(state.data.length/10)
  if (page > 1 && total > 5) {
    let prev = page
	items.push(<Pagination.Item onClick={setPageItem(1)} className={common.paginationArrowStartEnd}>&lt;&lt;</Pagination.Item>)
	items.push(<Pagination.Item onClick={setPageItem(--prev)} className={common.paginationArrow}>&lt;</Pagination.Item>)
  }
  let start = page > 5 ? page - 4 : 1
  const totalItems = page > 5 ? page : 5
  for (let number = start; number <= totalItems; number++) {
	if (number > total ) {
	  continue;
	}
	items.push(
      <Pagination.Item key={number} active={number === page} onClick={setPageItem(number)}>
        {number}
      </Pagination.Item>
    );
  }
  if (total > 5 && page < total) {
	let next = page
	items.push(<Pagination.Item onClick={setPageItem(++next)} className={common.paginationArrow}>&gt;</Pagination.Item>)
	items.push(<Pagination.Item onClick={setPageItem(total)} className={common.paginationArrowStartEnd}>&gt;&gt;</Pagination.Item>)
  }
  
  const indexOfLastTodo = page * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;
  const paginationData = state.data.slice(indexOfFirstTodo, indexOfLastTodo);
  
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
			"subRulePackageId": "SRP1,SRP2",
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
			"subRulePackageId": "SRP3,SRP4",
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
  
  function getSubRulePackage() {
	  Service.get('/rbs/th/lf/sub-rulepackage')
	  .then((response) => {
		const { data } = response
		let attrs = {}
		data.map((item) => {
		  const key = item.subRulePackageRefId
		  if (attrs[key] === undefined) {
			attrs[key] = []
		  }
		  attrs[key].push(item)
		})
		setSubRulePackage(attrs)
	  })
	  .catch(() => {
		const data = [
		{
			"subRulePackageId": "SRP1",
			"subRulePackageName": "Business Banking",
			"subRulePackageRefId": null,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"subRulePackageFlag": 'Y',
			"refDataDesc": "Generic Pricing Method",
			"refDataKey": "AP001",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"subRulePackageId": "SRP2",
			"subRulePackageName": "Commercial Banking",
			"subRulePackageRefId": null,
			"subRulePackageFlag": 'Y',
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"refDataDesc": "Lombard",
			"refDataKey": "AP002",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"subRulePackageId": "SRP3",
			"subRulePackageName": "Ulster",
			"subRulePackageRefId": null,
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"refDataDesc": "Lombard",
			"refDataKey": "AP002",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"subRulePackageId": "SRP4",
			"subRulePackageName": "Universal",
			"subRulePackageRefId": "SRP1",
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"refDataDesc": "Lombard",
			"refDataKey": "AP002",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		},
		{
			"subRulePackageId": "SRP5",
			"subRulePackageName": "Restricted",
			"subRulePackageRefId": "SRP2",
			"createdBy": "R123",
			"createdTs": "2020-06-09T04:38:41.688Z",
			"refDataDesc": "Lombard",
			"refDataKey": "AP002",
			"updatedBy": "R123",
			"updatedTs": "2020-06-09T04:38:41.688Z"
		}]
		let attrs = {}
		data.map((item) => {
		  const key = item.subRulePackageRefId
		  if (attrs[key] === undefined) {
			attrs[key] = []
		  }
		  attrs[key].push(item)
		})
		setSubRulePackage(attrs)
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

  function loadSubRulePackage() {
	if (state.rulePackageId.data) {
		const subRuleData = state.rulePackageId.active.split(',')
		return subRulePackageState && subRulePackageState['null'].map((item) => {
		  if (item.subRulePackageRefId === null && subRuleData.indexOf(item.subRulePackageId) !== -1) {
			return (<option value={`${item.subRulePackageId}|${item.subRulePackageFlag}`}>{item.subRulePackageName}</option>)
		  }
		})
	}
	return []
  }
  
  function loadMethodName() {
	const subRulePackage = state.subRulePackageId2 && state.subRulePackageId2.data ? state.subRulePackageId2.data : state.subRulePackageId.data
    Service.get(`/rbs/th/lf/parameter-mappings/${state.rulePackageId.data}/${subRulePackage}`)
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
  
  useEffect(() => {
	 if (state.subRulePackageId.data && state.subRulePackageId.active !== 'Y') {
		loadMethodName()
	 }
	 if (state.subRulePackageId.data && state.subRulePackageId.active === 'Y') {
		const data = subRulePackageState[state.subRulePackageId.data]
		const formData = {}
		const fieldLabel = 'Sub Rule Package2'
		const fieldName = 'subRulePackageId2'
		formData[fieldName] = {data: '', error: '', valid: false, errorMessage: `Please select ${fieldLabel}`, text: fieldLabel}
		dynamicFormFields.current = {...dynamicFormFields.current, ['methods']: {}, ['nonMethods']: {[fieldName]: data}, formfields: '', noRecords: data.length }
		setState({...state, ...formData})
	 }
  }, [state.subRulePackageId.data])
  
  useEffect(() => {
	 if (state.subRulePackageId2 && state.subRulePackageId2.data) {
		loadMethodName()
	 }
  }, [state.subRulePackageId2 && state.subRulePackageId2.data])
  
  function createDynamicMethod(data, type1, type2) {
	let formData = {}
	let fieldName = data[0].paramName.toLowerCase().replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1+p2.toUpperCase(); } )
    fieldName = fieldName.replace(/\s/g, '')
    fieldName = `${fieldName[0].toLowerCase() + fieldName.slice(1)}`
	formData[fieldName] = {data: '', error: '', valid: false, errorMessage: `Please select ${data[0].paramName}`, text: data[0].paramName}
	dynamicFormFields.current = {...dynamicFormFields.current, [type1]: {[fieldName]: data}, formfields: '', noRecords: data.length }
    setState({...state, ...formData})
  }
  
  const onSelectedMethodChange = (label) => (e) => {
	const selectedData = e.target.value
	if (selectedData === '') {
	  const formData = {
		[label]: {...state[label], data: ''}
	  }
	  dynamicFormFields.current = {...dynamicFormFields.current, formfields: ''}
	  setState({...state, ...formData})
	} else {
	  const formData = {}
	  formData[label] = {...state[label], data: selectedData}
	  setState({...state, ...formData})
	}
  }


  function handleSubmit(e) {
	  const methodName = Object.keys(dynamicFormFields.current.methods)[0]
	  const subRulePackage = state.subRulePackageId2 && state.subRulePackageId2.data ? state.subRulePackageId2.data : state.subRulePackageId.data
	  const error = validation(state)
	  if (error === '') {
		setError('')
		Service.get(`/rbs/th/lf/testsets/${formatDate(state.from.data)}/${formatDate(state.to.data)}/${state.environment.data}/${state.rulePackageId.data}/${state.subRulePackageId.data}/${subRulePackage}/${state[methodName].data}`)
		.then((response) => {
		  const { data } = response
	      setState({...state, data: data, noRecords: 0})
		})
		.catch((error) => {
			const data = []
		    setState({...state, data: [], noRecords: 1})
		})
	  } else {
		setError(error)		
	  }
  }
  
  function validation(forms) {
	let errors = ''
	if (forms.environment.data === '') {
		errors = 'Please select Environment';
	} 
	if (errors === '' && forms.from.data === null) {
		errors = 'Please enter valid from date';
	} 
	if (errors === '' && forms.to.data === null) {
		errors = 'Please enter valid to date';
	}
	return errors
  }
  
  function handleReset() {
	  setState({...state, ...initial})
  }
  
  const rulePackageOptionChange = (label) => (e) => {
	const data = e.target.value
	let formData = {}
	if (data === '') {
		formData[label] = {...state[label], data: '', error: state[label].errorMessage, valid: false}
	} else {
      formData[label] = {...state[label], data: data, error: '', valid: true}
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
		if (label === 'rulePackageId' || label === 'subRulePackageId') {
			if (state['subRulePackageId2']) {
				delete state['subRulePackageId2']
		    }
			if (label === 'rulePackageId') {
				formData['subRulePackageId'] = {...state['subRulePackageId'], data: '', error: '', valid: false}
			}
			dynamicFormFields.current = {...dynamicFormFields.current, nonMethods: {}, methods: {}, formfields:''}
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
		if (label === 'subRulePackageId') {
			const refKey = data.split('|')
			formData[label] = {...state[label], data: refKey[0], error: '', valid: true, active: refKey[1] }
		    if (state['subRulePackageId2'] && refKey[1] !== 'Y') {
				delete state['subRulePackageId2']
				dynamicFormFields.current = {...dynamicFormFields.current, nonMethods: {}}
		    }
		}
		else if(label === 'rulePackageId') {
			const refKey = data.split('|')
			formData[label] = {...state[label], data: refKey[0], error: '', valid: true, active: refKey[1] }
			formData['subRulePackageId'] = {...state['subRulePackageId'], data: '', error: '', valid: false}
			if (state['subRulePackageId2']) {
				delete state['subRulePackageId2']
		    }
			dynamicFormFields.current = {...dynamicFormFields.current, nonMethods: {}, methods: {}, formfields:''}
	    } 
		setState({...state, ...formData})
	}
  }
  
  const onTextUpdated = (label) => (e) => {
	setState({...state, [label]: {...state[label], data: e}})
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
   }
   const firstColumns = []
   if (paginationData[0]) {
	   Object.keys(paginationData[0]).forEach((item) => {
		let name = item.replace(/([A-Z])/g, ' $1')
		name = name[0].toUpperCase() + name.slice(1)
		if (paginationData[0][item] !== null) {
			if (item === 'testSetId') {
				name = 'ID'
			}
			firstColumns.push({
			  name: name,
			  key: item
			})
		}
	   })
   }
   
   const renderDynamicFormFields = () => {
    return (
		<>
			{Object.keys(dynamicFormFields.current.nonMethods).map((method) => {
			  return (<Col sm="6"><Form.Group as={Row} controlId={method}>
			   <Form.Label column sm="4">{state[method].text}</Form.Label>
			   <Col sm="5">
				 <Form.Control as="select" isInvalid={state[method].error} value={state[method].data} onChange={rulePackageOptionChange(method)}>
				   <option value="">Please Select</option>
				   {dynamicFormFields.current.nonMethods[method].map((item) => {
					 return (<option value={item.subRulePackageId}>{item.subRulePackageName}</option>)
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
			   <Form.Label column sm="4">{state[method].text}</Form.Label>
			   <Col sm="5">
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
		</>
	)
  }

   return (
    <div className={common.overlayContainer}>
      <Row className={styles.section}>
        <Col md="12">
		  <Row>
		   <Col md="9">
		    <Breadcrumb>
		     <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
		     <Breadcrumb.Item active>RM and Digital Report</Breadcrumb.Item>
		    </Breadcrumb>
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>
		  </Row>
		  <Row>
		   <Col md="12">
		   {error &&
		    <Alert key="1" className={styles.alert} variant="danger">
			  {error}
		    </Alert>
		   }
		    <Card>
             <Card.Body>
              <Form>
			    <Row>
				  <Col md="6">
				    <Form.Group as={Row} controlId="from">
				     <Form.Label column sm="4">From</Form.Label>
				     <Col sm="5">
				      <DatePicker
					  onChange={onTextUpdated('from')}
					  locale='en-US'
					  value={state.from.data}
					  className={styles.dateRangePicker}
					  maxDate={date}
					  minDate={minDate}
					 />
				     </Col>
		            </Form.Group>
				   </Col>
				   <Col md="6">
				    <Form.Group as={Row} controlId="to">
				     <Form.Label column sm="4">To</Form.Label>
				     <Col sm="5">
				      <DatePicker
					  onChange={onTextUpdated('to')}
					  locale='en-US'
					  value={state.to.data}
					  maxDate={date}
				      minDate={minDate}
				     />
				     </Col>
		            </Form.Group>
				   </Col>
				   <Col md="6">
				    <Form.Group as={Row} controlId="environment">
					  <Form.Label column sm="4">Environment</Form.Label>
					  <Col sm="5">
					    <Form.Control as="select" value={state.environment.data} onChange={onSelectedSingleOptionChange('environment')}>
						 <option value="">Please Select</option>
						 <option value="NFT">NFT</option>
						 <option value="UAT">UAT</option>
						 <option value="Dev">Dev</option>
					    </Form.Control>
					  </Col>
				    </Form.Group>
				   </Col>
				   <Col md="6">
					<Form.Group as={Row} controlId="rulePackage">
					  <Form.Label column sm="4">Rule Package</Form.Label>
					  <Col sm="5">
						<Form.Control as="select" isInvalid={state.rulePackageId.error} value={`${state.rulePackageId.data}|${state.rulePackageId.active}`} onChange={onSelectedSingleOptionChange('rulePackageId')}>
						  <option value="">Please Select</option>
						  {rulePackageState && rulePackageState.map((item) => {
							return (<option value={`${item.rulePackageId}|${item.subRulePackageId}`}>{item.rulePackageName}</option>)
						  })}
						</Form.Control>
					  </Col>
				    </Form.Group>
				   </Col>
				   <Col md="6">
				   <Form.Group as={Row} controlId="subRulePackage">
					<Form.Label column sm="4">Sub Rule Package</Form.Label>
					<Col sm="5">
					  <Form.Control as="select" isInvalid={state.subRulePackageId.error} value={`${state.subRulePackageId.data}|${state.subRulePackageId.active}`} onChange={onSelectedSingleOptionChange('subRulePackageId')}>
						<option value="">Please Select</option>
						{loadSubRulePackage()}
					  </Form.Control>
					</Col>
				    </Form.Group>
				   </Col>
				   {renderDynamicFormFields()}
				</Row>
				<Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
                <Button variant="primary" onClick={handleSubmit}>Generate Report</Button>	
			  </Form>
			  {state.noRecords === 1 && <div className={styles.noRecords}>No records to display</div>}
			  {state.data.length >0 && <div className={styles.tableWrapper}>
			   <Table responsive striped bordered hover size="md" className={styles.tableContainer}>
			    <thead>
				 <tr>
				  {firstColumns.map((item) => {
					return <th>
					  <span>{item.name}</span>
					</th>
				  })}
				 </tr>
			    </thead>
			    <tbody>
			     {paginationData.map((item, index) => {
				  return (<tr>
				  {firstColumns.map((data) => {
					const list = item[data.key]
					return (<td>{
						data.name === 'ID' ? 
						<a href={`#generic-reports/${item.testSetId}/${state.environment.data}`}>{item.testSetId}</a> :
						list}</td>)
				  })}
				  </tr>)
				  })}
			    </tbody>
			   </Table>
			   {state.data.length > 10 && <div>
				<Pagination>{items}</Pagination>
			  </div>}
			  </div>}
             </Card.Body>
            </Card>
		   </Col>
          </Row>		   	
        </Col>
      </Row>
    </div>
  );
}

export default ReportLists;
