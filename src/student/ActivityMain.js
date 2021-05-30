import React from 'react';
import Webcam from "react-webcam";
import { useEffect, useRef } from 'react';
import axios from 'axios';
import DonutChart from 'react-donut-chart';

function ActivityMain(){

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    
    const styleOvr = {
        height: "480px",
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

    const [currentExamId, setCurrentExamId] = React.useState(0);
    const [currentExamName, setCurrentExamName] = React.useState("");
    const [tabName, setTabName] = React.useState("activity");
    const [camResult, setCamResult] = React.useState("");
    const [exams, setExams] = React.useState([
    ]);

    const dot = {
        height: "30px",
        width: "30px",
        backgroundColor: "#bbb",
        borderRadius: "50%",
        display: "inline-block",
      }
    const [donutOnFocus, setDonutOnFocus] = React.useState(100);
    const [donutOutFocus, setDonutOutFocus] = React.useState(0);

    const MINUTE_MS = 8000;

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
                var blob = null;
                console.log(webcamRef);
                const imageSrc = webcamRef.current.getScreenshot();
    
                if(imageSrc === "data:,"){
                    // alert("empty");
                }
                else{
                    // Post Image to Server
                    fetch(imageSrc).then(res => blob = res.blob());
        
                    const formData = new FormData();
                    formData.append('image', imageSrc);

                    // alert("imageSrc: " + imageSrc)
        
                    // Post the form, just make sure to set the 'Content-Type' header
                    // axios.post('http://proctoringg.herokuapp.com/predict',formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(
                    //     res => {
                    //         alert(res.data);
                    //         console.log(res.data);
                    //         setCamResult(res.data.result);
                    //     }
                    // )
                    // alert("predict");

                    console.log("Post the form, just make sure to set the 'Content-Type' header");
                }
        },
        [webcamRef]
    );






















    function DisplayDonut(){
        // alert("*" + donutOnFocus + "--" + donutOutFocus);
        return(
            <DonutChart
                        height="300"
                        width="300"
                        data={[{
                            label: 'On Focus',
                            value: donutOnFocus
                        },
                        {
                            label: 'Out Focus',
                            value: donutOutFocus,
                        }]}/>
        )
    }

    function QuestionList(props){
        const [focusObject, setFocusObject] = React.useState({
                "result": true,
                "total_lvl": 0,
                "low_focus": 0,
                "ratio": 0
            });
        

        const [count, setCount] = React.useState(0);
        const [focus, setFocus] = React.useState(5);

        const [questionInProgress, setQuestionInProgress] = React.useState(false);
        const [questionCount, setQuestionCount] = React.useState(0);

        const [question, setQuestion] = React.useState({
                "id": 0,
                "lecture_id": 0,
                "question": "",
                "answer1": "",
                "answer2": "",
                "answer3": "",
                "correct": 0,
                "created_on": "",
                "updated_on": null
        });

        const [user_id, setUser_id] = React.useState(
            localStorage.getItem('user_id') || ''
        );

        

        // useEffect(() => {
        //     // http://proctoringg.herokuapp.com/focus/student/student_id/lecture_id
        //     alert("Get focus details")
        //     const axios = require('axios');
        //     axios.get('http://proctoringg.herokuapp.com/focus/student/' + user_id + "/" + currentExamId)
        //     .then(e => {
        //         var obj = {
        //             "result": e.data.result,
        //             "total_lvl": e.data.total_lvl,
        //             "low_focus": e.data.low_focus,
        //             "ratio": e.data.ratio
        //         }
        //     })
        //   }, []);

        useInterval(() => {
            // Your custom logic here
            // http://proctoringg.herokuapp.com/focus/student/student_id/lecture_id
            const axios = require('axios');
            axios.get('http://proctoringg.herokuapp.com/focus/student/' + user_id + "/" + currentExamId)
            .then(e => {
                var obj = {
                    "result": e.data.result,
                    "total_lvl": e.data.total_lvl,
                    "low_focus": e.data.low_focus,
                    "ratio": e.data.ratio
                }
                setFocusObject(focusObject => obj);

                if(obj.low_focus != 0){
                    var percentage = (obj.low_focus / obj.total_lvl) * 100;
                    var percentage1 = 100 - percentage;

                    setDonutOnFocus(donutOnFocus => percentage);
                    setDonutOutFocus(donutOutFocus => percentage1);
                }
                else{
                    setDonutOnFocus(donutOnFocus => 99);
                    setDonutOutFocus(donutOutFocus => 1);
                    DisplayDonut();
                }
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

        function submitQuestion(){
            var correctVar = document.getElementById("correct").value;
            if(document.getElementById('answer'+correctVar).checked) {
                //button is checked
                alert("Good: Answer is correct");
            }else{
                //button is not checked
                alert("Bad: Correct answer is option " + correctVar);
            }
            setQuestionInProgress(questionInProgress => false);
            setQuestion({
                "id": 0,
                "lecture_id": 0,
                "question": "",
                "answer1": "",
                "answer2": "",
                "answer3": "",
                "correct": 0,
                "created_on": "",
                "updated_on": null
            })
            document.getElementById("answer1").checked = false;
            document.getElementById("answer2").checked = false;
            document.getElementById("answer3").checked = false;
        }

        function loadLecture(){
            const axios = require('axios');
            axios.get('http://proctoringg.herokuapp.com/lecture/' + props.id)
            .then(e => {
                console.log(e.data);
                if(e.data.lecture.questions[questionCount] == null){
                    setLectures(lectures => e.data);
                    setQuestion(question => e.data.lecture.questions[0]);
                    setQuestionCount(questionCount => 0);
                }
                else{
                    setLectures(lectures => e.data);
                    setQuestion(question => e.data.lecture.questions[questionCount]);
                    setQuestionCount(questionCount => questionCount + 1);
                }
            })
        }

        useInterval(() => {
            // Your custom logic here
            setCount(count + 1);
            if(count % 2 == 0){
                setFocus(focus => 1);
            }
            else{
                setFocus(focus => 5);
            }

            if(focus == 1 && questionInProgress == false){
                setQuestionInProgress(questionInProgress => true);
                loadLecture();
                // setQuestion(lectures.lecture.questions[0]);
            }
          }, 5000);

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

        const [lectures, setLectures] = React.useState({
            "result": true,
            "lecture": {
                "id": 1,
                "name": "",
                "teacher": "",
                "start_time": "",
                "end_time": "",
                "created_on": "",
                "updated_on": null,
                "questions": [
                    {
                        "id": 18,
                        "lecture_id": 1,
                        "question": "",
                        "answer1": "",
                        "answer2": "",
                        "answer3": "",
                        "correct": 1,
                        "created_on": "",
                        "updated_on": null
                    }
                ]
            }
        })

        return(
            <div>
                <p>{question.question}</p>
                <div className="row">
                    <div className="col-md-3"><input type="radio" name="answer1" id="answer1" /> <p>{question.answer1}</p></div>
                    <div className="col-md-3"><input type="radio" name="answer2" id="answer2" /> <p>{question.answer2}</p></div>
                    <div className="col-md-3"><input type="radio" name="answer3" id="answer3" /> <p>{question.answer3}</p></div>
                    <input type="hidden" name="correct" id="correct" value={question.correct} />
                    <div className="col-md-3"><button className="btn btn-info" onClick={() => submitQuestion}>Submit</button></div>
                </div>
            </div>
        );
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
                        alert(vara)
                        setTabName(tabName => "taketest");
                        alert(tabName)
                        setCurrentExamId(currentExamId => varb);
                        setCurrentExamName(currentExamName => varc); 
                    }
                    else{
                        alert("Lecture has not started yet!");
                    }
                }
            }
        }

                        setTabName(tabName => "taketest");
                        setCurrentExamId(currentExamId => varb);
                        setCurrentExamName(currentExamName => varc); 

        
    }










    useEffect(() => {
        const interval = setInterval(() => {
            // alert("capture");
          console.log('Logs every two seconds');
          capture();
        }, MINUTE_MS );
      
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      }, [])

    useEffect(() => {
        const axios = require('axios');
		axios.get('http://proctoringg.herokuapp.com/lectures')
		.then(e => {
			console.log(e.data);
            
            var i;
            var exmarr = [];
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

    















    function Tab(props){
        if(props.val === "activity"){
            return(<div className="container">
                <h1>Activities</h1>
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
                                <Webcam
                                    audio={false}
                                    height='0%'
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width='0%'
                                    videoConstraints={videoConstraints}
                                />
                            </div>
                        )
                    }
                </div>
            </div>);
        }
        else if(props.val === "taketest"){
            return(<div>
                <div className="row" style={{height:"75px", backgroundColor:"#333333"}}>
                    <div className="col-md-9">
                        <p id="demo" className="mt-4 ml-4 text-white"></p>
                    </div>
                    <div className="col-md-3 mt-3">
                        <span className="text-white">
                            <span className="ml-4" style={dot}></span>
                            <span className="ml-2" style={dot}></span>
                            <span className="ml-2" style={dot}></span>
                            <button className="ml-3 btn btn-danger" onClick={() => setTabName(tabName => "activity")}>Leave</button>
                        </span>
                    </div>
                </div>
                <div className="row">
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
                    <div style={{height: "500px"}} className="col-md-9 bg-dark p-2 text-white">
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
                    <div style={{height: "500px"}} className="col-md-3 bg-dark p-2 text-white">
                        <br/>
                        <br/>
                        <br/>
                        <DisplayDonut/>

                    </div>
                    <div className="col-md-12 bg-light p-2" style={{height: "100px"}}>
                        <QuestionList id={currentExamId} />
                    </div>
                </div>
                
            </div>);
        }
        else{
            return(<div>
                <div className="row text-center">
                    <h1>Activities</h1>
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "activity")}>Lecture</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "taketest")}>Join Lecture</button>
                    </div>
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
                                <Webcam
                                    audio={false}
                                    height='0%'
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width='0%'
                                    videoConstraints={videoConstraints}
                                />
                
            </div>);
        }
    }

    return(
        <div className="col-md-11">
            <Tab val={tabName}/>
        </div>
    );
  }
  
  export default ActivityMain;