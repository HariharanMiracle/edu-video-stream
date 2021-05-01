function StatusMain(){
    return(
        <div className="col-md-11 p-4">
            <h1>StatusMain</h1>
            <div className="row">
                <div className="col-md-12">
                    <div className="p-5 bg-light" style={{height:"400px", borderRadius:"5px"}}>
                        <select id="status" className="form-control">
                            <option>Offline</option>
                            <option>Online</option>
                            <option>Away</option>
                            <option>Busy</option>
                        </select>
                        <br/>
                        <button className="btn btn-info">Change Status</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
  }
  
  export default StatusMain;