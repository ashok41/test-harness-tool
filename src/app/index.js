import React from 'react';
import { render } from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Reports from '../test-harness-tool/reports'
import Dashboard from '../test-harness-tool/dashboard'

import 'bootstrap/dist/css/bootstrap.min.css';

render((
 <Router>
   <div>
	 <Switch>
	   <Route path="/reports" component={Reports}/>
	   <Route exact path="/" component={Dashboard}/>
	 </Switch>
   </div>
 </Router>
), document.body.appendChild(document.createElement('div')));
