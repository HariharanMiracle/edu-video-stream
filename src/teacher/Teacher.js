import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../templates/Header.js';
import MenuBar from '../templates/MenuBarTeacher.js';

import ActivityMain from './ActivityMain.js';

function Teacher(){

    function Main(){
        return(
            <div className="container p-4">
                <h1>Welcome to the portal!</h1>
                <ul>
                    <li><p>Hello teachers! This portal will help you to do several activities: They are:</p></li>
                    <li><p>Help you to make examinations or tasks.</p></li>
                    <li><p>Check and add student marks, comments and result.</p></li>
                    <li><p>Chat related to student's academics.</p></li>
                    <li><p>You will be able to chat with your group members and organize work.</p></li>
                    <li><p>Several other activities to support student's academics.</p></li>
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
                        <Route path="/teacher/welcome" component={Main}/>
                        <Route path="/teacher/activitymain" component={ActivityMain}/>
                        {/* <Route path="/teacher/chatmain" component={ChatMain}/> */}
                        {/* <Route path="/teacher/groupsmain" component={GroupsMain}/> */}
                        {/* <Route path="/teacher/statusmain" component={StatusMain}/> */}
                    </Switch>
                    
                </div>
            </div>
        </Router>
    );
  }
  
  export default Teacher;