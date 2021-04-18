import React, { useEffect } from 'react';

function Question(){
    
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
                                    <input type="text" className="form-control correctAnswer" placeholder="Correct Answer" required/><br/>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" className="form-control answer1" placeholder="Answer 1" required/><br/>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" className="form-control answer2" placeholder="Answer 2" required/><br/>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" className="form-control answer3" placeholder="Answer 3" required/><br/>
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
            <h3>Create New Examination</h3>
            <hr/>
            <div className="container">
                <input type="text" className="form-control" placeholder="Examination Name" value={newExamName} onChange={updateNewExamName}/><br/>
                <Exams />
                <br/>
                <button className="btn btn-success" style={{borderRadius:"50%", height:"50px", width:"50px"}}><h1 style={{marginTop:"-10px", marginLeft:"-2px"}} onClick={() => createExam()}>+</h1></button>
                <button className="btn btn-info ml-2" onClick={() => alert("create exam")}>Create Exam</button>
            </div>
        </div>
    );
  }
  
  export default Question;