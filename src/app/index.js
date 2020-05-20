import React from 'react';
import { render } from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Header from './header'
import Footer from './footer'
import Reports from '../test-harness-tool/reports'
import Dashboard from '../test-harness-tool/dashboard'
import PricingTool from '../test-harness-tool/pricing-tool'
import RulesProcessing from '../test-harness-tool/rules-processing'
import styles from '../test-harness-tool/common/common.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const  root = document.createElement('div');
root.style = "min-height: 100%;height:100%;"
render((
 <Router>
     <Container className={styles.container}>
       <Header />
	   <Switch>
	     <Route path="/reports" component={Reports}/>
		 <Route exact path="/" component={Dashboard}/>
	     <Route path="/pricing-tool" component={PricingTool}/>
	     <Route path="/rules-processing/:slug" component={RulesProcessing}/>
	   </Switch>
	   <Footer />
	 </Container>
 </Router>
), document.body.appendChild(root));
