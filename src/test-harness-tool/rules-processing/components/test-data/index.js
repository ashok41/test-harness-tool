import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Table, Pagination, Card } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import ProfileList from '../../../common/profile-list'
import RowEditable from './row-editable'
import styles from './test-data.scss'
import common from '../../../common/common.scss'

function TestData() {
  const history = useHistory()
  const location = useLocation()
  //const {state: {postData, formData}} = location;
  const formData = {}
  const postData = [
        {
            "id": "012005210000001",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 1,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000002",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 1,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000003",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 1,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000004",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 2,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000005",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 2,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000006",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 2,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000007",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 3,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "N",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000008",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 3,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000009",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 3,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000010",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 1,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000011",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 1,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000012",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 1,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000013",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 2,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000014",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 2,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "N",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000015",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 2,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000016",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 3,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000017",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 3,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000018",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 3,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000019",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 1,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000020",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 1,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000021",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 1,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "N",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000022",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 2,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000023",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 2,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000024",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 2,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000025",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 3,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000026",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 3,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000027",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 3,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        }
		]
  const [dataLists, setDataLists] = useState(postData);
  const [sort, setSort] = useState({})
  
  const [page, setPage] = useState(1)
  
  function handleSubmit() {
	  axios.post('http://localhost:8081/expectedScenarios', dataLists)
	  .then((response) => {
		  const { data } = response
		  history.push({
			pathname: '/rules-processing/service-request',
			state: data
		})
	 })
	 .catch(() => {
		 const data = [
        {
            "id": "012005210000001",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 1,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000002",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 1,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000003",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 1,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000004",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 2,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000005",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 2,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000006",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 2,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000007",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 3,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "N",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000008",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 3,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000009",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 18,
            "riskFactor": 3,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000010",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 1,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000011",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 1,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000012",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 1,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000013",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 2,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000014",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 2,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "N",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000015",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 2,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000016",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 3,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000017",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 3,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000018",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 6,
            "riskFactor": 3,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000019",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 1,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000020",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 1,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000021",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 1,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "N",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000022",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 2,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000023",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 2,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000024",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 2,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        },
        {
            "id": "012005210000025",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 3,
            "allInRate": 6.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 6.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 10000
        },
        {
            "id": "012005210000026",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 3,
            "allInRate": 7.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 7.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 20000
        },
        {
            "id": "012005210000027",
            "applicationIdentity": "Pricing",
            "bankDivision": "Ulster",
            "productFamily": "Lending",
            "productName": "Small Business",
            "termFactor": 12,
            "riskFactor": 3,
            "allInRate": 8.95,
            "annualPercentageRate": 0.0,
            "expectedAllInRate": 8.95,
            "expectedAnnualPercentageRate": 0.0,
            "status": "Y",
            "barrowAmount": 30000
        }
		]
		  history.push({
			pathname: '/rules-processing/service-request',
			state: data
		})
	 })
  }
  function rowEdit(data, idx) {
	  const obj = {...dataLists[idx], ...data}
	  setDataLists([...dataLists.slice(0, idx), data, ...dataLists.slice(idx + 1)])
  }
  
  const setPageItem = (number) => () => {
	  setPage(number)
  }
  
  let items = [];
  const total = Math.ceil(dataLists.length/10)
  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={setPageItem(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  
  const indexOfLastTodo = page * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;
  const paginationData = dataLists.slice(indexOfFirstTodo, indexOfLastTodo);
  const columns = [{
	  name: 'ID',
	  key: 'id'
  }, {
	  name: 'Application Identity',
	  key: 'applicationIdentity',
	  sortable: true,
	  direction: 'asc'
  }, {
	  name: 'Bank Division',
	  key: 'bankDivision'
  }, {
	  name: 'Product Family',
	  key: 'productFamily'
  }, {
	  name: 'Product Name',
	  key: 'productName'
  }, {
	  name: 'Borrowing Amount(GBP)',
	  key: 'barrowAmount',
	  sortable: true,
	  direction: 'asc'
  }, {
	  name: 'Term (Months)',
	  key: 'termFactor'
  }, {
	  name: 'Risk Band',
	  key: 'riskFactor'
  }, {
	  name: 'Actions'
  }]
  
  const sortable = (sortKey, direction, isSortable) => () => {
    if (isSortable) {
	  let newDirection = direction
	  if (sort[sortKey]) {
		  newDirection = sort[sortKey] === 'asc' ? 'desc' : 'asc'
	  }
	  if (newDirection === 'asc') {
		dataLists.sort((a,b) => a[sortKey] - b[sortKey])
	  }
	  if (newDirection === 'desc') {
		dataLists.sort((a,b) => b[sortKey] - a[sortKey])
	  }
	  setDataLists([...dataLists])
	  setSort({[sortKey]: newDirection})
	}
  }
  const getSortDirection = (key) => {
	  return !sort[key] ? '' : (sort[key] === 'desc' ? styles.arrowDown : styles.arrowUp);
  }
  return (
    <Card>
	  <Row className={styles.wrapper}>
	    <Col md="12">
		 <Row>
		   <Col md="9">
		   </Col>
		   <Col md="3">
		    <ProfileList />
		   </Col>
		  </Row>
		  <Table responsive striped bordered hover size="md">
			  <thead>
				<tr>
				{columns.map((item) => {
					return <th className={styles.sortHeader} onClick={sortable(item.key, item.direction, item.sortable)}>
					  <span>{item.name}</span>
					  {item.sortable ? <span className={styles.arrow}><div className={getSortDirection(item.key)} /></span> : ''}
					</th>
				})}
				</tr>
			  </thead>
			  <tbody>
				{paginationData.map((item, index) => (
				  <RowEditable data={item} key={index} rowIndex={index} rowEdit={rowEdit} />
				))}
			  </tbody>
		  </Table>
		  {dataLists.length > 10 && <div>
		    <Pagination>{items}</Pagination>
	      </div>}
		  <div>
		    <Button variant="primary" onClick={() => history.push({
			pathname: '/pricing-tool',
			state: formData
		})}>Back</Button>{' '}
		    <Button variant="primary" onClick={handleSubmit}>Next</Button>
		  </div>
		</Col>
	  </Row>
    </Card>
  );
}

export default TestData;
