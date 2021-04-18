import React from 'react';
import Question from './Question.js'

function ActivityMain(){
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

    const [currentExamId, setCurrentExamId] = React.useState(0);
    const [currentExamName, setCurrentExamName] = React.useState("");
    const [tabName, setTabName] = React.useState("activity");
    const [exams, setExams] = React.useState([
        {
            "id":101,
            "name":"Programming Test 1",
            "teacher":"Harish"
        },
        {
            "id":102,
            "name":"Programming Test 2",
            "teacher":"Minoj"
        },
        {
            "id":103,
            "name":"Programming Test 3",
            "teacher":"Harish"
        },
        {
            "id":104,
            "name":"Programming Test 4",
            "teacher":"Minoj"
        }
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
                                </div>
                                <div className="col-md-5 text-center bg-light p-5 ml-2" style={{borderRadius: "10px", border: "2px solid #b0b2b8"}}>
                                    <button className="btn btn-info" onClick={() => {
                                        setTabName(tabName => "viewtest");
                                        setCurrentExamId(currentExamId => e.id);
                                        setCurrentExamName(currentExamName => e.name);
                                    }}>View Test</button>
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
        else if(props.val === "viewtest"){
            return(<div>
                <div className="row text-center">
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "activity")}>Examination</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "viewtest")}>View Test</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "result")}>Result</button>
                    </div>
                </div>
                <br/>
                <div className="row pl-3">
                    <div style={tab2StyleOvr} className="col-md-12">
                        <h3>#{currentExamId} - {currentExamName} - Quiz</h3>
                    </div>
                </div>
                
            </div>);
        }
        else if(props.val === "createnewtest"){
            return(
                <div>
                    <div className="row text-center">
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "activity")}>Examination</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "viewtest")}>View Test</button>
                    </div>
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
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "activity")}>Examination</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "viewtest")}>View Test</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-link" onClick={() => setTabName(tabName => "result")}>Result</button>
                    </div>
                </div>
                <br/>
                <div className="row pl-3">
                    <div style={tab2StyleOvr} className="col-md-12">
                        <h3>#{currentExamId} - {currentExamName} - Result</h3>
                    </div>
                </div>
                
            </div>);
        }
    }

    return(
        <div className="col-md-11 p-4">
            <h1>Activities</h1>
            <button className="btn btn-info mb-3" onClick={() => setTabName(tabName => "createnewtest")}>Create New Examination</button>
            <Tab val={tabName}/>
        </div>
    );
  }
  
  export default ActivityMain;