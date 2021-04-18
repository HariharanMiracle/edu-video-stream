import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../templates/Header.js';
import MenuBar from '../templates/MenuBar.js';

import ActivityMain from './ActivityMain.js';
import ChatMain from './ChatMain.js'
import GroupsMain from './GroupsMain.js'
import StatusMain from './StatusMain.js'

function Student(){
    function Main(){
        return(
            <div className="container p-4">
                <h1>Welcome to the portal!</h1>
                <ul>
                    <li><p>Hello students! This portal will help you to do several activities: They are:</p></li>
                    <li><p>Help you to take up examinations or tasks.</p></li>
                    <li><p>Check your marks, comments and result.</p></li>
                    <li><p>Chat related to your academics.</p></li>
                    <li><p>You will be able to chat with your group members and organize work.</p></li>
                    <li><p>Several other activities to support your academics.</p></li>
                </ul>
            </div>
        );
    }
    return(
        <Router>
            <div>
                <Header />
                <div className="row" style={{backgroundColor: "#e3e3e6"}}>
                    <MenuBar />
                    <Switch>
                        <Route path="/student/welcome" component={Main}/>
                        <Route path="/student/activitymain" component={ActivityMain}/>
                        <Route path="/student/chatmain" component={ChatMain}/>
                        <Route path="/student/groupsmain" component={GroupsMain}/>
                        <Route path="/student/statusmain" component={StatusMain}/>
                    </Switch>
                    
                </div>
            </div>
        </Router>
    );
  }
  
  export default Student;