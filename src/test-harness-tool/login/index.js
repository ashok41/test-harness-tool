import React, {useState, useEffect} from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Service from '../common/service'
import common from '../common/common.scss'
import styles from './login.scss'
	

function Login() {
  const history = useHistory()
  const initial = {username: '', password:''}
  const [state, setState] = useState(initial)
  const [version, setVersion] = useState('')
  const [error, setError] = useState('')
  const date = new Date();

  function handleSubmit(e) {
	  e.preventDefault();
	  const error = validation(state)
	  if (error === '') {
		setError('')	
		localStorage.setItem('logged', state.username);
		localStorage.setItem('date', date.toLocaleString("en-US"));
		history.push({
			pathname: '/',
		})
	  } else {
		setError(error)	
	  }
	  
  }
  
  useEffect(() => {
	Service.get('/rbs/th/gp/version')
		.then((response) => {
		  const { data } = response
	      setVersion(data)
		})
		.catch((error) => {
			setVersion({versionNo: '1.1.0', versionDate: '2020-03-10'})
		})
  }, [])
  
  function validation(forms) {
	let errors = ''
	if (forms.username === '') {
		errors = 'Please enter username';
	} 
	if (errors === '' && forms.password === '') {
		errors = 'Please enter password';
	}
	return errors;
  }
	
  const onTextUpdated = (label) => (e) => {
	  const data = e.target.value;
	  setState({...state, [label]: data})
  }
  function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleString("en-US");
   }
  return (
    <>
      <Row className={styles.section}>
        <Col md="12">
		  {error &&
		    <Alert key="1" className={styles.alert} variant="danger">
			  {error}
		    </Alert>
		  }
		  <Card className={styles.cardWrapper}>
            <Card.Body className={styles.relative}>
			<div className={styles.release}>
			 <div><span>Release Version:</span> {version.versionNo}</div>
			 <div><span>Release Date:</span> {formatDate(version.versionDate)}</div>
			</div>
            <div className={styles.listWrapper}>
			 <Form className={styles.listGroup}>
			  <Form.Group controlId="formUsername">
				<Form.Label className={styles.labels}>Username</Form.Label>
				<Form.Control type="text" placeholder="Enter Username" onChange={onTextUpdated('username')} />
				
			  </Form.Group>
			  <Form.Group controlId="formPassword">
				<Form.Label className={styles.labels}>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" onChange={onTextUpdated('password')} />
			  </Form.Group>
			  <Button variant="primary" onClick={handleSubmit}>
				Login
			  </Button>
			 </Form>
			</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
