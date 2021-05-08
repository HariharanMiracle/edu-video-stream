import React from 'react';
import Question from './Question.js'
import axios from 'axios';
import Webcam from "react-webcam";
import { useEffect, useRef } from 'react';
import DonutChart from 'react-donut-chart';

function ActivityMain(){
    const [currentExamId, setCurrentExamId] = React.useState(0);

    useInterval(() => {
        // Your custom logic here
        // http://proctoringg.herokuapp.com/focus/student/student_id/lecture_id
        const axios = require('axios');
		axios.get('http://proctoringg.herokuapp.com/focus/lecture/'+currentExamId)
		.then(e => {
			console.log(e.data);
            var onfocusval = e.data.ratio * 100;
            var offfocusval = 100 - onfocusval;

            var obj = {
                "on_focus":onfocusval,
                "off_focus":offfocusval
            }

            setMainDonut(mainDonut => obj);
		})
      }, 10000);

      function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest function.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

      useInterval(() => {
        // Your custom logic here
        // http://proctoringg.herokuapp.com/focus/student/student_id/lecture_id
        const axios = require('axios');
		axios.get('http://proctoringg.herokuapp.com/focus/lectures/'+currentExamId)
		.then(e => {
			console.log(e.data);
            var objList = [];
            for(var i = 0; i < e.data.result.length; i++){
                var onfocusval = e.data.result[i].ratio * 100;
                var offfocusval = 100 - onfocusval;
                var obj = {
                    "name":e.data.result[i].name,
                    "on_focus":onfocusval,
                    "off_focus":offfocusval
                }

                objList.push(obj);
            }

            setDonutList(donutList => objList);
		})
      }, 10000);

      function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest function.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }
      


    const [donutList, setDonutList] = React.useState([
        // {
        //     "name":"student 1",
        //     "on_focus":70,
        //     "off_focus":30
        // },
        // {
        //     "name":"student 2",
        //     "on_focus":70,
        //     "off_focus":30
        // },
        // {
        //     "name":"student 3",
        //     "on_focus":70,
        //     "off_focus":30
        // }
    ]);

    const [mainDonut, setMainDonut] = React.useState({
        // "on_focus":60,
        // "off_focus":40
    });

    function DonutList(){
        return(
            <div>
                    <div>
                        <h5 className="text-white"><u>Overall Focus Level</u></h5>
                        <DonutChart
                                    height="300"
                                    width="300"
                                    data={[{
                                        label: 'On Focus',
                                        value: mainDonut.on_focus
                                    },
                                    {
                                        label: 'Out Focus',
                                        value: mainDonut.off_focus,
                                    }]}/>
                                <hr/>
                    </div>
                    <h5 className="text-white"><u>Student focus level</u></h5>
                {

                    donutList.map(e => 
                            <div>
                                <h5 className="text-white">{e.name}</h5>
                                <DonutChart
                                    height="300"
                                    width="300"
                                    data={[{
                                        label: 'On Focus',
                                        value: e.on_focus
                                    },
                                    {
                                        label: 'Out Focus',
                                        value: e.off_focus,
                                    }]}/>
                                <hr/>
                            </div>
                        )
                }
            </div>
        )
    }

    function joinLecture(vara, varb, varc, vard, vare){

        var d = new Date();
        var strD = d + "";
        console.log("date " + strD);

        var var_now_time = strD.split(" ");
        var var_1_time = vard.split(" ");
        var var_2_time = vare.split(" ");

        if(var_now_time[3] === var_1_time[3] && var_now_time[3] === var_2_time[3] ){
            if(var_now_time[1] === var_1_time[2] && var_now_time[1] === var_2_time[2]){
                if(var_now_time[2] === var_1_time[1] && var_now_time[2] === var_2_time[1]){
                    var n = d.getHours();
                    var m =  d.getMinutes();

                    var currentSecs = ( n * 60 * 60 ) + ( m * 60 );

                    var vard_time = vard.split(":")
                    var vare_time = vare.split(":")

                    var b4secs = ( vard_time[0] * 60 * 60 ) + ( vard_time[1] * 60 );
                    var aftrSecs = ( vare_time[0] * 60 * 60 ) + ( vare_time[1] * 60 );

                    if(currentSecs >= b4secs && currentSecs <= aftrSecs){
                        // can join

                        alert("Welcome to the lecture!");
                        setTabName(tabName => vara);
                        setCurrentExamId(currentExamId => varb);
                        setCurrentExamName(currentExamName => varc); 
                    }
                    else{
                        alert("Lecture has not started yet!");
                    }
                }
            }
        }

                        setTabName(tabName => vara);
                        setCurrentExamId(currentExamId => varb);
                        setCurrentExamName(currentExamName => varc); 

        
    }

    const MINUTE_MS = 8000;

    useEffect(() => {
        const interval = setInterval(() => {
          console.log('Logs every two seconds');
          capture();
        }, MINUTE_MS );
      
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      }, [])

      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            if(tabName === "taketest"){
                var blob = null;
                console.log(webcamRef);
                const imageSrc = webcamRef.current.getScreenshot();
    
                // Post Image to Server
                fetch(imageSrc).then(res => blob = res.blob());
    
                const formData = new FormData();
                formData.append('image', imageSrc);
    
                // Post the form, just make sure to set the 'Content-Type' header
                // axios.post('http://localhost:8080/predict',formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(
                //     res => {
                //         console.log(res.data);
                //         setCamResult(res.data.result);
                //     }
                // )
                console.log("Post the form, just make sure to set the 'Content-Type' header");
            }
        },
        [webcamRef]
    );









    useEffect(() => {
        var exmarr = [];

        const axios = require('axios');
		axios.get('http://proctoringg.herokuapp.com/lectures')
		.then(e => {
			console.log(e.data);
            
            var i;
            for (i = 0; i < e.data.lectures.length; i++) {
                var exmObj = { 
                    id:e.data.lectures[i].id,
                    name:e.data.lectures[i].name,
                    teacher:e.data.lectures[i].teacher,
                    start_time:e.data.lectures[i].start_time,
                    end_time:e.data.lectures[i].end_time
                }
                exmarr.push(exmObj);                
            }
            setExams(exmarr);

		})	
    }, [])

    const styleOvr = {
        height: "470px",
        width: "100%",
        overflow: "auto",
        float: "left",
        position: "relative",
        marginLeft: "-5px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "3px",
        border: "2px solid #b8b8b8"
    }

    const tab2StyleOvr = {
        height: "460px",
        overflow: "auto",
        float: "left",
        position: "relative",
        marginLeft: "-5px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "3px",
        border: "2px solid #b8b8b8"
    }

    const tab2StyleOvr1 = {
        height: "485px",
        overflow: "auto",
        float: "left",
        position: "relative",
        backgroundColor: "white",
        padding: "20px",
    }

    const [currentExamName, setCurrentExamName] = React.useState("");
    const [tabName, setTabName] = React.useState("activity");
    const [camResult, setCamResult] = React.useState("");
    const [exams, setExams] = React.useState([
        // {
        //     "id":101,
        //     "name":"Programming Test 1",
        //     "teacher":"Harish"
        // },
        // {
        //     "id":102,
        //     "name":"Programming Test 2",
        //     "teacher":"Minoj"
        // },
        // {
        //     "id":103,
        //     "name":"Programming Test 3",
        //     "teacher":"Harish"
        // },
        // {
        //     "id":104,
        //     "name":"Programming Test 4",
        //     "teacher":"Minoj"
        // }
    ]);

    function Tab(props){
        if(props.val === "activity"){
            return(<div className="container">
                <div style={styleOvr}>
                    {
                        exams.map(e => 
                            <div className="row p-4">
                                <div className="col-md-6 text-center bg-light p-5" style={{borderRadius: "10px", border: "2px solid #b0b2b8"}}>
                                    <h5>{e.name}</h5>
                                    <h6><i>Prepared By: {e.teacher}</i></h6>
                                    <div className="row">
                                        <div className="col-md-6">Start Time: {e.start_time}</div>
                                        <div className="col-md-6">End Time: {e.end_time}</div>
                                    </div>
                                </div>
                                <div className="col-md-5 text-center bg-light p-5 ml-2" style={{borderRadius: "10px", border: "2px solid #b0b2b8"}}>
                                    <button className="btn btn-info" onClick={() => joinLecture("taketest", e.id, e.name, e.start_time, e.end_time)}>Join Lecture</button>
                                    &nbsp;
                                    <button className="btn btn-info" onClick={() => {
                                        setTabName(tabName => "result");
                                        setCurrentExamId(currentExamId => e.id);
                                        setCurrentExamName(currentExamName => e.name);
                                    }}>Result</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>);
        }
        else if(props.val === "taketest"){
            return(<div>
                <div className="row text-center">
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "activity")}>Lecture</button>
                    </div>
                    {/* <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "taketest")}>Join Lecture</button>
                    </div> */}
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "result")}>Result</button>
                    </div>
                </div>
                <br/>
                <div className="row pl-3">
                    {/* <div style={tab2StyleOvr} className="col-md-6">
                        <h3>#{currentExamId} - {currentExamName} - Quiz</h3>
                        <br />
                        {currentExamId == 101 && questions != null && questions.content != null ?
                        <>
                            {questions.content[0].question}
                            
                        </>
                        : null}
                        <h4>Question 01</h4>
                        <div class="form-check"><input type="checkbox" name="q1" id="q1" class="form-check-input"/> <label class="form-check-label">Option 01</label></div>
                        <div class="form-check"><input type="checkbox" name="q1" id="q1" class="form-check-input"/> <label class="form-check-label">Option 01</label></div>
                        <div class="form-check"><input type="checkbox" name="q1" id="q1" class="form-check-input"/> <label class="form-check-label">Option 01</label></div>
                        <div class="form-check"><input type="checkbox" name="q1" id="q1" class="form-check-input"/> <label class="form-check-label">Option 01</label></div>

                        <button type="button" class="btn btn-primary">Next Question</button>
                    </div> */}
                    <div style={{height: "485px"}} className="col-md-8 bg-dark p-2 text-white">
                        <Webcam
                            audio={false}
                            height='100%'
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width='100%'
                            videoConstraints={videoConstraints}
                        />
                        <br />
                        <center><h4 style={{color: '#000'}}>{camResult != "" ? camResult : null}</h4></center>
                        
                    </div>
                    <div style={tab2StyleOvr1} className="col-md-4 bg-dark p-2 text-white">
                        
                        <div className="text-white">
                            <DonutList />
                        </div>

                    </div>
                </div>
                
            </div>);
        }
        else if(props.val === "createnewtest"){
            return(
                <div>
                    <div className="row text-center">
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "activity")}>Lecture</button>
                    </div>
                    {/* <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "viewtest")}>Join Lecture</button>
                    </div> */}
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "result")}>Result</button>
                    </div>
                </div>
                <br/>
                <div className="row pl-3">
                    <div style={tab2StyleOvr} className="col-md-12">

                        <Question />

                    </div>
                </div>
                </div>
            );
        }
        else{
            return(<div>
                <div className="row text-center">
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "activity")}>Lecture</button>
                    </div>
                    {/* <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "taketest")}>Join Lecture</button>
                    </div> */}
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "result")}>Result</button>
                    </div>
                </div>
                <br/>
                <div className="row pl-3">
                    <div style={styleOvr} className="col-md-12">
                        <h3>#{currentExamId} - {currentExamName} - Result</h3>
                    </div>
                </div>
                
            </div>);
        }
    }

    return(
        <div className="col-md-11 p-4">
            <h1>Activities</h1>
            <button className="btn btn-info mb-3" onClick={() => setTabName(tabName => "createnewtest")}>Create New Lecture</button>
            <Tab val={tabName}/>
        </div>
    );
  }
  
  export default ActivityMain;