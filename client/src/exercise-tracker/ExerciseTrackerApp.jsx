import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { prettyObjArr } from '../functions/prettyObjectArray.js'

function ExerciseTrackerApp() {
  const [exData, setExData] = useState(null);
  const [respDisp, setRespDisp] = useState('');
  const [exLogUser, setExLogUser] = useState('');
  const [exLogApi, setExLogApi] = useState('/api/users/exercises?username=')

  /** */
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setExData(data.message));
  }, []);
  
  const userListClick = () => {
    axios.get("/api/users")
      .then((response) => {
        setRespDisp(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error)
      } );
  }

  function handleUserChg (event) {
    setExLogUser(event.target.value)
    setExLogApi('/api/users/exercises?username=' + event.target.value)
  }

  function userExerLogClick() {
    
    axios.get(exLogApi)
      .then((response) => {
        setRespDisp(response.data)
        setExLogApi('/api/users/exercises?username=')
        setExLogUser('')
      })
      .catch((error) => {
        console.error('There was an error fetching the exercise log!', error)
      } );
  }
      //console.log('exLogUser: ' + exLogUser)
      //console.log('exLogApi: ' + exLogApi)

  return (

    <div id="exerTrackContainer">
      <div id="trackerContainer" >
        <div className="row">
          <h1>Exercise tracker</h1>
        </div>
        <div className="row tallRow" id="formsContainer">
          <div className="row col-6 formCol">
            <form action="/api/users" method="post">
              <h2>Create a New User</h2>
              {/*<p><code>POST /api/users</code></p>*/}
              <input id="uname" type="text" name="username" placeholder="username" />
              <input type="submit" value="Submit" />
            </form>
            <div className="userLogQuery" >
              <h2 id="userLogHead" >Get User Exercise Log</h2>
              <input placeholder="username" onChange={handleUserChg} value={exLogUser} />
              <button onClick={userExerLogClick}>Submit</button>
            </div>
          </div>
          <div className="row col-6 formCol">
            <form action="/api/users/exercises" id="exercise-form" method="post">
              <h2>Add Exercises</h2>
              {/*<p><code>POST /api/users/:_id/exercises</code></p>*/}
              <input id="user" type="text" name="username" placeholder="username*" />
              <input id="desc" type="text" name="description" placeholder="description*" />
              <input id="dur" type="text" name="duration" placeholder="duration (mins.)" />
              <input id="date" type="text" name="date" placeholder="date* (yyyy-mm-dd)" />
              <p id="required-note" >* - Required</p>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        
        {respDisp === ''
          ? <div id="server-resp-div" ><h2>Server Response:</h2><p>Waiting for request...</p></div>
          : <div id="server-resp-div" >
              <h2>Server Response:</h2> 
              <p style={{ whiteSpace: "pre-wrap" }} >{prettyObjArr(respDisp)}</p>
            </div>
        }

        <p>
          <strong>GET user's PARTIAL exercise log: </strong>
        </p>
        <p>
        <code>/exercise/api/users/:username/logs?from=date&amp;to=date&amp;limit=number</code>
        </p>
        <div id='get-log-legend' >
          <p><strong>[ ]</strong> = optional</p>
          <p><strong>from, to</strong> = dates (yyyy-mm-dd)</p> 
          <p><strong>limit</strong> = number</p>
        </div>  

        <div id="temp-stuff" >
          <h2 >Temp Stuff for Nick</h2>
          <button onClick={userListClick} >All Users List</button>
          {/*<button >Delete All Data</button>*/}
          <p>testing: {exData}</p>
        </div>
        
      </div>
    </div>
  )
}

export default ExerciseTrackerApp