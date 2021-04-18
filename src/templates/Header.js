import React, { useState } from 'react';

function Header(props){
    // const [number, setNumber] = React.useState(0);

    // function numberDecrement() {
    //     setNumber(number => number - 1);
    // }

    const [online, setOnline] = React.useState(true);

    function sayHello() {
        alert("Hello");
    }

    function ShowUserVisibility(props) {
        const isOnline = props.isOnline;
        if (isOnline) {
            return(
                <div style={{height: "10px", width: "10px", backgroundColor: "#09ba00", borderRadius:"50%", position: "absolute", marginLeft: "66%", marginTop: "-10px"}}></div>
            );
        }
        return(
            <div style={{height: "10px", width: "10px", backgroundColor: "#ba0000", borderRadius:"50%", position: "absolute", marginLeft: "66%", marginTop: "-10px"}}></div>
        );
    } 

    return(
        <div className="text-white">
            <nav className="navbar navbar-light" style={{backgroundColor: "#6551b8"}}>
                <div className="container-fluid">
                    <div className="col-md-4">
                        <button className="btn btn-light text-white" style={{backgroundColor: "#6551b8"}} onClick={sayHello}>{'<'}</button>
                        &nbsp;
                        <button className="btn btn-light text-white" style={{backgroundColor: "#6551b8"}} onClick={sayHello}>{'>'}</button>
                    </div>
                    <div className="col-md-4 text-center">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onKeyUp={sayHello}/>
                    </div>
                    <div className="col-md-4 text-right">
                        <img src="/images/test/user-icon.jpg" height="35px" width="35px" style={{borderRadius: "50%"}}/>
                        <ShowUserVisibility isOnline={online}/>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-light text-white" style={{backgroundColor: "#6551b8"}} onClick={sayHello}>{'-'}</button>
                        &nbsp;
                        <button className="btn btn-light text-white" style={{backgroundColor: "#6551b8"}} onClick={sayHello}>{'[ ]'}</button>
                        &nbsp;
                        <button className="btn btn-light text-white" style={{backgroundColor: "#6551b8"}} onClick={sayHello}>{'x'}</button>
                    </div>
                </div>
            </nav>
        </div>
    );
  }
  
  export default Header;