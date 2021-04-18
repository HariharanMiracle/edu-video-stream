import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandLogin from './user-access/LandLogin';

import Student from './student/Student';
import Teacher from './teacher/Teacher';


// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
// bootstrap js
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Route path="/login" component={LandLogin}/>
      <Route path="/student/welcome" component={Student}/>
      <Route path="/teacher/welcome" component={Teacher}/>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
