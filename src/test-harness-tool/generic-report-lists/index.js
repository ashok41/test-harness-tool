import React, {useState, useEffect, useRef} from 'react';
import { Row, Col, Card, Breadcrumb, ListGroup, Form, Button, Table, Pagination, Dropdown, DropdownButton, Alert, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import DatePicker from  'react-date-picker'
import ProfileList from '../common/profile-list'
import Service from '../common/service'
import common from '../common/common.scss'
import styles from './generic-report-lists.scss'
	

function ReportLists() {
  const date = new Date()
  const minDate = new Date(date.getFullYear(), 0, 1)
  const initial = {from: {data: date}, to: {data: date}, pricingMethodId: {data: '', text: ''}, customerDealSegmentId: {data: ''}, data: [], environment: {data: ''}}
  const [state, setState] = useState(initial)
  const [businessAttributes, setBusinessAttributes] = useState({data: {}, loader: false})
  const [customerDealSegmentId, setCustomerDealSegement] = useState({data: []})
  const [error, setError] = useState('')
  const [page, setPage] = useState(1);
  const tempMethod = useRef('')
  const dynamicFormFields = useRef({methods: {}})
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
    }
	dynamicFormFields.current = { methods: {[fieldName]: data} }
	formData[fieldName] = {data: '', text: state.pricingMethodId.text}
    setState({...state, ...formData})
  }


  function handleSubmit(e) {
	  let fieldName = state.pricingMethodId.text.toLowerCase().replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1+p2.toUpperCase(); } )
	  fieldName = fieldName.replace(/\s/g, '')
	  fieldName = `${fieldName[0].toLowerCase() + fieldName.slice(1)}Id`
	  const error = validation(state)
	  if (error === '') {
		setError('')
		Service.get(`/rbs/th/gp/testsets/${formatDate(state.from.data)}/${formatDate(state.to.data)}/${state.environment.data}/${state.pricingMethodId.data}/${state[fieldName].data}`)
		.then((response) => {
		  const { data } = response
	      setState({...state, data: data})
		})
		.catch((error) => {
			const data = [
			{
				"testSetId": 1171,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1172,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1173,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1174,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1175,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1176,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1177,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1178,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1179,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1180,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1181,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1182,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1183,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1184,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1185,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1186,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1187,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1188,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1189,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1190,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1191,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1192,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1193,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1194,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1195,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1196,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1197,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1198,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1199,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1100,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1101,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1102,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1203,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1204,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1205,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1206,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1207,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1208,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1209,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1210,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1211,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1212,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1213,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1214,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1215,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1216,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1217,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1218,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1219,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1220,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1221,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1222,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1223,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1224,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			},
			{
				"testSetId": 1225,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}, {
				"testSetId": 1226,
				"applicationIdentity": "Ulster",
				"bankDivision": "Business",
				"productFamily": "Overdraft",
				"productName": "Agri Facility",
				"riskBand": "5,3,9",
				"borrowingAmount": "10000",
				"termFactor": "12",
				"processedFlag": "Y"
			}]
		    setState({...state, data: data})
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
  
  const onSelectedSingleOptionChange = (label) => (e) => {
    const text = e.target.options[e.target.selectedIndex].text
	setState({...state, [label]: {...state[label], data: e.target.value, text: text}})
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
   return (
    <div className={common.overlayContainer}>
	{businessAttributes.loader && <Row className={common.overlayInner}>
     <div className={common.overlay}>
	  <Spinner animation="border" role="status">
	    <span className="sr-only">Loading...</span>
	  </Spinner>
	 </div>
	 </Row>}
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
				     <Form.Label column sm="5">From</Form.Label>
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
					  <Form.Label column sm="5">Environment</Form.Label>
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
					<Form.Group as={Row} controlId="pricingMethodId">
					 <Form.Label column sm="4">Pricing Method</Form.Label>
					 <Col sm="5">
					  <Form.Control as="select" value={state.pricingMethodId.data} onChange={onSelectedSingleOptionChange('pricingMethodId')}>
						<option value="">Please Select</option>
						{businessAttributes.data['MN'] && businessAttributes.data['MN'].map((item) => {
						  return (<option value={item.attributeId}>{item.refDataDesc}</option>)
					   })}
					  </Form.Control>
					 </Col>
				    </Form.Group>
				   </Col>
				   <Col md="6">
				    <Form.Group as={Row} controlId="customerDealSegmentId">
					  <Form.Label column sm="5">Customer Deal Segment</Form.Label>
					  <Col sm="5">
					   <Form.Control as="select" value={state.customerDealSegmentId.data} onChange={onSelectedSingleOptionChange('customerDealSegmentId')}>
						<option value="">Please Select</option>
						{customerDealSegmentId.data && customerDealSegmentId.data.map((item) => {
						  return (<option value={item.customerDealSegmentId}>{item.customerDealSegmentName}</option>)
					    })}
					   </Form.Control>
					  </Col>
				    </Form.Group>
				   </Col>
				   <Col md="6">
					{Object.keys(dynamicFormFields.current.methods).map((method) => {
					 return (<Form.Group as={Row} controlId={method}>
					   <Form.Label column sm="4">{state['pricingMethodId'].text}</Form.Label>
					   <Col sm="5">
						 <Form.Control as="select" value={state[method].data} onChange={onSelectedSingleOptionChange(method)}>
						   <option value="">Please Select</option>
						   {dynamicFormFields.current.methods[method].map((item) => {
							 return (<option value={item.methodId}>{item.methodName}</option>)
						   })}
						  </Form.Control>
						</Col>
						</Form.Group>)
				   })}
				   </Col>
				</Row>
				<Button variant="danger" onClick={handleReset}>Reset</Button>{' '}
                <Button variant="primary" onClick={handleSubmit}>Generate Report</Button>	
			  </Form>
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
