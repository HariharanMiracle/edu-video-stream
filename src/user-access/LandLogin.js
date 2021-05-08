import React, { useState } from 'react';
import axios from 'axios';

function LandLogin(){
    const [studentUsername, setStudentUsername] = React.useState("");
    const [studentPassword, setStudentPassword] = React.useState("");
    const [teacherUsername, setTeacherUsername] = React.useState("");
    const [teacherPassword, setTeacherPassword] = React.useState("");
    const [studentLoginErrMsg, setStudentLoginErrMsg] = React.useState("");
    const [teacherLoginErrMsg, setTeacherLoginErrMsg] = React.useState("");

    function updStudentUsername(e){
        setStudentUsername(studentUsername => e.target.value);
    }

    function updStudentPassword(e){
        setStudentPassword(studentPassword => e.target.value);
    }

    function updTeacherUsername(e){
        setTeacherUsername(teacherUsername => e.target.value);
    }

    function updTeacherPassword(e){
        setTeacherPassword(teacherPassword => e.target.value);
    }

    function studentLogin() {
        if(studentUsername==="" || studentPassword===""){
            setStudentLoginErrMsg(studentLoginErrMsg => "Username or Password cannot be empty !!!");
        }
        else{
            const axios = require('axios');
            axios.get('http://proctoringg.herokuapp.com/user/' + studentUsername)
            .then(e => {
                console.log(e.data);
                if(e.data.user != null && e.data.user.type===1){
                    if(e.data.user.password === studentPassword){
                        console.log("1");
                        setStudentLoginErrMsg(studentLoginErrMsg => "");

                        localStorage.setItem('user_id', e.data.user.id);

                        window.location.replace("http://localhost:3000/student/welcome")
                    }
                    else{
                        console.log("2" + e.data.user.password);
                        setStudentLoginErrMsg(studentLoginErrMsg => "Incorrect Username or Password !!!");
                    }
                }
                else{
                    console.log("3");
                    setStudentLoginErrMsg(studentLoginErrMsg => "Incorrect Username or Password !!!");
                }
            })
        }
    }

    function teacherLogin() {
        if(teacherUsername==="" || teacherPassword===""){
            setTeacherLoginErrMsg(teacherLoginErrMsg => "Username or Password cannot be empty !!!");
        }
        else{
            const axios = require('axios');
            axios.get('http://proctoringg.herokuapp.com/user/' + teacherUsername)
            .then(e => {
                console.log(e.data);
                if(e.data.user != null){
                    if(e.data.user.password === teacherPassword){
                        console.log("1");
                        setTeacherLoginErrMsg(teacherLoginErrMsg => "");
                        
                        localStorage.setItem('user_id', e.data.user.id);

                        window.location.replace("http://localhost:3000/teacher/welcome")
                    }
                    else{
                        console.log("2" + e.data.user.password);
                        setTeacherLoginErrMsg(teacherLoginErrMsg => "Incorrect Username or Password !!!");
                    }
                }
                else{
                    console.log("3");
                    setTeacherLoginErrMsg(teacherLoginErrMsg => "Incorrect Username or Password !!!");
                }
            })
        }
    }

    function StudentLoginError(){
        if(studentLoginErrMsg==="")
            return <div></div>;
        else{
            return(
                <div className="bg-danger p-1 text-center" style={{borderRadius: "10px"}}>
                     <p className="text-white mt-2">Error: {studentLoginErrMsg}</p>
                 </div>
             );
        }
    }

    function TeacherLoginError(){
        if(teacherLoginErrMsg===""){
           return <div></div>;
        }
        else{
            return(
                <div className="bg-danger p-1 text-center" style={{borderRadius: "10px"}}>
                    <p className="text-white mt-2">Error: {teacherLoginErrMsg}</p>
                </div>
            );
        }
    }

    return(
      <div>
            <nav className="navbar navbar-dark" style={{backgroundColor: "#6551b8"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><b>Engagement</b> Detection   </a>
                </div>
            </nav>

            <br/>
            <br/>
            <br/>

            <div className="row">
                <div className="col-md-6 p-5">
                    <div style={{height: "400px", backgroundColor: "#e9e6f7", borderRadius: "10px", border: "3px solid #c6c3d4"}}>
                        <div className="text-center p-5">
                            <h4>Student Login</h4><br/>
                            <input type="text" class="form-control" id="studentUsername" placeholder="Username" value={studentUsername} onChange={updStudentUsername}/><br/>
                            <input type="password" class="form-control" id="studentPassword" placeholder="Password" value={studentPassword} onChange={updStudentPassword}/><br/>
                            <button className="btn btn-info" onClick={studentLogin}>Login</button>
                        </div>
                        <StudentLoginError />
                    </div>
                </div>
                <div className="col-md-6 p-5">
                    <div style={{height: "400px", backgroundColor: "#e9e6f7", borderRadius: "10px", border: "3px solid #c6c3d4"}}>
                        <div className="text-center p-5">
                            <h4>Lecture Login</h4><br/>
                            <input type="text" class="form-control" id="teacherUsername" placeholder="Username" value={teacherUsername} onChange={updTeacherUsername}/><br/>
                            <input type="password" class="form-control" id="teacherPassword" placeholder="Password" value={teacherPassword} onChange={updTeacherPassword}/><br/>
                            <button className="btn btn-info" onClick={teacherLogin}>Login</button>
                        </div>
                        <TeacherLoginError />
                    </div>
                </div>
            </div>
      </div>
    );
}

export default LandLogin;