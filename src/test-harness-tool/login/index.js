import React, {useState} from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import common from '../common/common.scss'
import styles from './login.scss'
	

function Login() {
  const history = useHistory()
  const initial = {username: '', password:''}
  const [state, setState] = useState(initial)
  const [error, setError] = useState('')
  const date = new Date();

  function handleSubmit(e) {
	  e.preventDefault();
	  const error = validation(state)
	  if (error === '') {
		setError('')	
		localStorage.setItem('logged', true);
		localStorage.setItem('date', date.toLocaleString("en-US"));
		history.push({
			pathname: '/',
		})
	  } else {
		setError(error)	
	  }
	  
  }
  
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
