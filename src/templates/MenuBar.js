import {NavLink} from 'react-router-dom';

function MenuBar(){
    function sayHello(menuBarBtnId) {
        var all = document.getElementsByClassName("menuBarBtn");
        for (var i = 0; i < all.length; i++) {
            all[i].style.backgroundColor = "#312e45";
        }
        document.getElementById(menuBarBtnId).style.backgroundColor = "#4e4a6b";
    }

    return(
        <div style={{width: "100px", height: "683px", backgroundColor: "#312e45"}}>
            <br/>
            <div className="pl-1 text-center">
                <div id="menuBarBtn1" style={{marginLeft: "8px"}} className="p-1 menuBarBtn">
                    <NavLink className="btn btn-light" exact to="/student/activitymain" style={{borderRadius:"100%", marginTop: "10px", height:"30px", width:"30px"}} onClick={() => sayHello("menuBarBtn1")}></NavLink>
                    <p className="text-white">Activity</p>
                </div>

                <div id="menuBarBtn2" style={{marginLeft: "8px"}} className="p-1 menuBarBtn">
                    <NavLink className="btn btn-light" exact to="/student/chatmain" style={{borderRadius:"100%", marginTop: "10px", height:"30px", width:"30px"}} onClick={() => sayHello("menuBarBtn2")}></NavLink>
                    <p className="text-white">Chat</p>
                </div>

                <div id="menuBarBtn3" style={{marginLeft: "8px"}} className="p-1 menuBarBtn">
                    <NavLink className="btn btn-light" exact to="/student/groupsmain" style={{borderRadius:"100%", marginTop: "10px", height:"30px", width:"30px"}} onClick={() => sayHello("menuBarBtn3")}></NavLink>
                    <p className="text-white">Groups</p>
                </div>

                <div id="menuBarBtn4" style={{marginLeft: "8px"}} className="p-1 menuBarBtn">
                    <NavLink className="btn btn-light" exact to="/student/statusmain" style={{borderRadius:"100%", marginTop: "10px", height:"30px", width:"30px"}} onClick={() => sayHello("menuBarBtn4")}></NavLink>
                    <p className="text-white">Status</p>
                </div>
            </div>
        </div>
    );
  }
  
  export default MenuBar;
        