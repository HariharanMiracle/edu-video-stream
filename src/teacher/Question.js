import React, { useEffect } from 'react';
import axios from 'axios';

function Question(){
    
    function submitExam(){
        var startTime = document.getElementById("startTime").value;
        var startTimeRes = startTime.split("T");
        var startTime =  startTimeRes[0] + " " + startTimeRes[1];
    
        var endTime = document.getElementById("endTime").value;
        var endTimeRes = endTime.split("T");
        var endTime =  endTimeRes[0] + " " + endTimeRes[1];
    
        var newExamNameStr = document.getElementById("newExamName").value;
        var teacher = document.getElementById("teacher").value;

        var postJson = {
            "name":newExamNameStr,
            "teacher":teacher,
            "start_time":startTime,
            "end_time":endTime,
            "questions":[]
        }

        for(var i = 0; i < exam.length; i++){
            postJson.questions.push({
                "questionName":exam[i].question,
                "answer1":exam[i].answer1,
                "answer2":exam[i].answer2,
                "answer3":exam[i].answer3,
                "correct":exam[i].correct
            });
        }

        const axios = require('axios');
            axios.post('http://proctoringg.herokuapp.com/lecture', postJson)
            .then(e => {
                console.log(e.data);
                if(e.data.result === true){
                    alert("Exam created: successfully!");
                    
                }
                else{
                    alert("Exam created: failed!");
                }
            })
    }

    const [examIndex, setExamIndex] = React.useState(0);
    const [newExamName, setNewExamName] = React.useState("");
    const [exam, setExam] = React.useState([
        {
            "id":0,
            "question": "",
            "correct": "",
            "answer1": "",
            "answer2": "",
            "answer3": ""
        }
    ]);

    useEffect(() => {
        for(var i = 0; i < exam.length; i++){
            if(document.getElementById("question_" + exam[i].id) != null){
                document.getElementById("question_" + exam[i].id).value = exam[i].question;
                document.getElementById("correctAnswer_" + exam[i].id).value = exam[i].correct;
                document.getElementById("answer1_" + exam[i].id).value = exam[i].answer1;
                document.getElementById("answer2_" + exam[i].id).value = exam[i].answer2;
                document.getElementById("answer3_" + exam[i].id).value = exam[i].answer3;
            }
        }
    });

    function updateNewExamName(e){
        setNewExamName(newExamName => e.target.value);
    }

    function updateQuestion(id, val){
        var examArr = exam;
        for(var i = 0; i < examArr.length; i++){
            if(examArr[i].id == id){
                examArr[i].question = val;
            }
        }
        setExam(exam => examArr);
    }

    function updateCorrectAnswer(id, val){
        var examArr = exam;
        for(var i = 0; i < examArr.length; i++){
            if(examArr[i].id == id){
                examArr[i].correct = val;
            }
        }
        setExam(exam => examArr);
    }

    function updateAnswer1(id, val){
        var examArr = exam;
        for(var i = 0; i < examArr.length; i++){
            if(examArr[i].id == id){
                examArr[i].answer1 = val;
            }
        }
        setExam(exam => examArr);
    }

    function updateAnswer2(id, val){
        var examArr = exam;
        for(var i = 0; i < examArr.length; i++){
            if(examArr[i].id == id){
                examArr[i].answer2 = val;
            }
        }
        setExam(exam => examArr);
    }

    function updateAnswer3(id, val){
        var examArr = exam;
        for(var i = 0; i < examArr.length; i++){
            if(examArr[i].id == id){
                examArr[i].answer3 = val;
            }
        }
        setExam(exam => examArr);
    }

    

    function createExam(){
        var next = examIndex + 1;
        setExamIndex(examIndex => next);
        var examArr = exam;
        examArr.push({
            "id":next,
            "question": "",
            "correct": "",
            "answer1": "",
            "answer2": "",
            "answer3": ""
        });
        setExam(exam => examArr);
    }

    function deleteQuestion(id){
        var newExamArr = [];
        var examArr = exam;
        for(var i = 0; i < examArr.length; i++){
            if(examArr[i].id != id){
                newExamArr.push(examArr[i]);
            }
        }
        setExam(exam => newExamArr);
    }

    function Exams(){
        return(
            <div>
                {
                    exam.map(e => 
                        <div className="row bg-info p-5 mt-4" id={'question_div_' + e.id} style={{borderRadius:"10px"}}>
                            <input type="text" className="form-control question" placeholder="Question" id={'question_' + e.id} onChange={y => updateQuestion(e.id, y.target.value)} required/>
                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <input type="text" className="form-control answer1" placeholder="Answer 1" id={'answer1_' + e.id} onChange={y => updateAnswer1(e.id, y.target.value)} required/><br/>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" className="form-control answer2" placeholder="Answer 2" id={'answer2_' + e.id} onChange={y => updateAnswer2(e.id, y.target.value)} required/><br/>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" className="form-control answer3" placeholder="Answer 3" id={'answer3_' + e.id} onChange={y => updateAnswer3(e.id, y.target.value)} required/><br/>
                                </div>
                                <div className="col-md-3">
                                    <input type="number" className="form-control correctAnswer" id={'correctAnswer_' + e.id} placeholder="Correct Answer" onChange={y => updateCorrectAnswer(e.id, y.target.value)} required/><br/>
                                </div>
                                <button className="btn btn-danger ml-5" style={{borderRadius:"50%", height:"50px", width:"50px"}}><h1 style={{marginTop:"-10px", marginLeft:"-2px"}} onClick={() => deleteQuestion(e.id)}>-</h1></button>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

    return(
        <div className="p-4">
            <h3>Create New Questions</h3>
            <hr/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>Start Time: </h5>
                        <input type="datetime-local" className="form-control" placeholder="Start Time" id="startTime"/><br/>
                    </div>
                    <div className="col-md-6">
                        <h5>End Time: </h5>
                        <input type="datetime-local" className="form-control" placeholder="End Time" id="endTime"/><br/>
                    </div>
                </div>
                <input type="text" className="form-control" placeholder="Name" id="newExamName" value={newExamName} onChange={updateNewExamName}/><br/>
                <input type="text" className="form-control" placeholder="Teacher Name" id="teacher"/><br/>
                <Exams />
                <br/>
                <button className="btn btn-success" style={{borderRadius:"50%", height:"50px", width:"50px"}}><h1 style={{marginTop:"-10px", marginLeft:"-2px"}} onClick={() => createExam()}>+</h1></button>
                <button className="btn btn-info ml-2" onClick={submitExam}>Create</button>
            </div>
        </div>
    );
  }
  
  export default Question;