import React from 'react';
import { render } from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Header from './header'
import Footer from './footer'
import Reports from '../test-harness-tool/reports'
import ReportLists from '../test-harness-tool/report-lists'
import Dashboard from '../test-harness-tool/dashboard'
import Login from '../test-harness-tool/login'
import PricingTool from '../test-harness-tool/pricing-tool'
import GenericPricingMethod from '../test-harness-tool/generic-pricing-method'
import RulesProcessing from '../test-harness-tool/rules-processing'
import GenericTestCases from '../test-harness-tool/generic-test-cases'
import styles from '../test-harness-tool/common/common.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({ component: Component , ...rest}) => (
  <Route 
    {...rest}
    render={props =>
      localStorage.getItem('logged') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const  root = document.getElementById('root');
//root.style = "min-height: 100%;height:100%;"
render((
 <Router>
     <Container className={styles.container}>
       <Header />
	   <div className={styles.contentBlock}>
	    <Switch>
	     <Route path="/login" component={Login}/>
		 <PrivateRoute path="/report-lists" component={ReportLists}/>
	     <PrivateRoute path="/reports/:slug?/:slug1?" component={Reports}/>
		 <PrivateRoute exact path="/" component={Dashboard}/>
	     <PrivateRoute path="/pricing-tool/:slug?" component={PricingTool}/>
		 <PrivateRoute path="/generic-pricing-method" component={GenericPricingMethod}/>
	     <PrivateRoute path="/rules-processing/:slug" component={RulesProcessing}/>
		 <PrivateRoute path="/generic-test-cases/:slug?" component={GenericTestCases}/>
	    </Switch>
	   </div>
	   <Footer />
	 </Container>
 </Router>
), root);
