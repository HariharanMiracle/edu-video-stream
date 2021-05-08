import React from 'react';


function ChatMain(){
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

    const [tabName, setTabName] = React.useState("initial");
    // initial, chat, files, report

    const [sendMessage, setSendMessage] = React.useState("");
    const [currentChat, setCurrentChat] = React.useState(0);
    const [currentChatName, setCurrentChatName] = React.useState("");
    const [chat, setChat] = React.useState([
        {
            "id":1,
            "message":"Hello",
            "sender":"user",
            "senderName":"Hariharan",
            "time":"05:28 PM"
        },
        {
            "id":2,
            "message":"Hi, How are you guys?",
            "sender":"channel",
            "senderName":"Yasikaran",
            "time":"05:29 PM"
        },
        {    "id":3,
            "message":"Hey, we are very fine, how about you",
            "sender":"user",
            "senderName":"Hariharan",
            "time":"05:30 PM"
        },
        {
            "id":4,
            "message":"Doing good, so what are you doing these days?",
            "sender":"channel",
            "senderName":"Minoj",
            "time":"05:31 PM"
        },
        {
            "id":5,
            "message":"I am currently working on some project based on JAVA",
            "sender":"user",
            "senderName":"Hariharan",
            "time":"05:31 PM"
        }
    ]);
    const [groups, setGorups] = React.useState([
                                                {
                                                    "id":101,
                                                    "name":"OOP",
                                                    "image":"null",
                                                    "channel":[{"id":201, "name":"General"}, {"id":202, "name":"Channel A"}]
                                                },
                                                {
                                                    "id":102,
                                                    "name":"SE",
                                                    "image":"null",
                                                    "channel":[{"id":203, "name":"General"}, {"id":204, "name":"Channel A"}]
                                                }
                                            ]);

    function updSendMessage(e){
        setSendMessage(sendMessage => e.target.value);
    }     
    
    function send(){
        var msg = document.getElementById("sendMessage").value;
        console.log("message sent: " + msg);
        document.getElementById("sendMessage").value = "";
        // console.log("message sent: " + sendMessage);
        // setSendMessage(sendMessage => "");
    }

    function loadChat(channelId, channelName) {
        setCurrentChat(currentChat => channelId);
        setCurrentChatName(currentChatName => channelName);
        setTabName(tabName => "chat");
        
        var all = document.getElementsByClassName("channelBtn");
        for (var i = 0; i < all.length; i++) {
            all[i].style.backgroundColor = "white";
            all[i].style.color = "black";
        }
        document.getElementById(channelId).style.backgroundColor = "#312e45";
        document.getElementById(channelId).style.color = "white";
    }

    function ChatThread(){
        if(currentChat === 0){
            return(
                <div className="p-5">
                    <h1>Welcome to chat !!!</h1>
                    <p>Choose a channel...</p>
                </div>
            );
        }
        else{
            return(
                <div className="p-5">
                <div className="row">
                    <div className="col-md-3">
                        <h3>{currentChatName}</h3>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-link" onClick={() => {
                            setTabName(tabName => "chat");
                        }}>Chat</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-link" onClick={() => {
                            setTabName(tabName => "files");
                        }}>Files</button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-link" onClick={() => {
                            setTabName(tabName => "report");
                        }}>Engagement Report</button>
                    </div>
                </div>
                <div style={styleOvr}>
                    {
                        chat.map(e =>
                            <div className="mt-2">
                                <p>{e.senderName}: {e.message}</p>
                                <p className="text-right">{e.time}</p>
                                <hr style={{height:"5px", borderWidth:"0", color:"#0057d1", backgroundColor:"#0057d1"}}/>
                            </div>
                        )
                    }
                </div>
                <div className="row pl-5 pr-5 pt-2">
                    <div className="col-md-11">
                        <input type="text" class="form-control" id="sendMessage" placeholder="Type..."/>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-info" onClick={send}>Send</button>
                    </div>
                </div>
            </div>
            );
        }
    }

    function Tab(props){
        if(props.val === "initial"){
            return(
                <div className="p-5">
                    <h1>Welcome to chat !!!</h1>
                    <p>Choose a channel...</p>
                </div>
            );
        }
        else if(props.val === "chat"){
            return(
                <div className="p-5">
                <div className="row">
                    <div className="col-md-3">
                        <h3>{currentChatName}</h3>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-link" onClick={() => {
                            setTabName(tabName => "chat");
                        }}>Chat</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-link" onClick={() => {
                            setTabName(tabName => "files");
                        }}>Files</button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-link" onClick={() => {
                            setTabName(tabName => "report");
                        }}>Engagement Report</button>
                    </div>
                </div>
                <div style={styleOvr}>
                    {
                        chat.map(e =>
                            <div className="mt-2">
                                <p>{e.senderName}: {e.message}</p>
                                <p className="text-right">{e.time}</p>
                                <hr style={{height:"5px", borderWidth:"0", color:"#0057d1", backgroundColor:"#0057d1"}}/>
                            </div>
                        )
                    }
                </div>
                <div className="row pl-5 pr-5 pt-2">
                    <div className="col-md-11">
                        <input type="text" class="form-control" id="sendMessage" placeholder="Type..."/>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-info" onClick={send}>Send</button>
                    </div>
                </div>
            </div>
            );
        }
        else if(props.val === "files"){
            return(<div className="p-5">
                <div className="row">
                    <div className="col-md-3">
                        <h3>{currentChatName}</h3>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-link" onClick={() => {
                            setTabName(tabName => "chat");
                        }}>Chat</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-link" onClick={() => {
                            setTabName(tabName => "files");
                        }}>Files</button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-link" onClick={() => {
                            setTabName(tabName => "report");
                        }}>Engagement Report</button>
                    </div>
                </div>
                <h1>Files</h1>
            </div>);
        }
        else{
            return(<div>
                <div className="p-5">
                    <div className="row">
                        <div className="col-md-3">
                            <h3>{currentChatName}</h3>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-link" onClick={() => {
                                setTabName(tabName => "chat");
                            }}>Chat</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-link" onClick={() => {
                                setTabName(tabName => "files");
                            }}>Files</button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-link" onClick={() => {
                                setTabName(tabName => "report");
                            }}>Engagement Report</button>
                        </div>
                    </div>
                    <h1>Report</h1>
                </div>
            </div>);
        }
    }

    return(
        <div className="col-md-11">
            <div className="row">
                <div className="col-md-3 bg-white" style={{height:"680px"}}>
                    <h4 style={{color: "#312e45"}} className="pl-4 pt-3">Teams</h4>
                    <hr style={{height:"2px", borderWidth:"0", color:"#f0f0f2", backgroundColor:"#e3e3e6"}}/>
                    <p style={{color: "#312e45"}}>Your Teams</p>
                    {
                        groups.map(e => 
                            <div className="pl-4 pt-2">
                                <h5><b>{e.name}</b></h5>
                                <div className="pt-1">
                                    {
                                        e.channel.map(e1 =>
                                            <div>
                                                <button style={{marginTop: "2px"}} id={e1.id} className="btn btn-white channelBtn" onClick={() => loadChat(e1.id, e1.name)}>{e1.name}</button>
                                                <br/>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="col-md-9">
                    <Tab val={tabName}/>
                </div>
            </div>
        </div>
    );
  }
  
  export default ChatMain;