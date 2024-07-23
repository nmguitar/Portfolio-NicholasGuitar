import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ExerciseTrackerApp() {
  const [exData, setExData] = useState(null);
  const [respDisp, setRespDisp] = useState('');
  /*
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setExData(data.message));
  }, []);
  */
  const userListClick = () => {
      axios.get("/api/users")
        .then((response) => {
          setRespDisp(response.data)
        })
        .catch((error) => {
          console.error('There was an error fetching the users!', error)
        } );
  }
      //console.log('respDisp:')
      //console.log(respDisp)

  return (

    <div id="exerTrackContainer">
      <div id="trackerContainer" >
        <h1>Exercise tracker</h1>
        <div id="formsContainer">
          <form action="/api/users" method="post">
            <h2>Create a New User</h2>
            <p><code>POST /api/users</code></p>
            <input id="uname" type="text" name="username" placeholder="username" />
            <input type="submit" value="Submit" />
          </form>
          <form action="/api/users/:_id/exercises" id="exercise-form" method="post">
            <h2>Add exercises</h2>
            <p><code>POST /api/users/:_id/exercises</code></p>
            <input id="uid" type="text" name=":_id" placeholder=":_id" />
            <input id="desc" type="text" name="description" placeholder="description*" />
            <input id="dur" type="text" name="duration" placeholder="duration* (mins.)" />
            <input id="date" type="text" name="date" placeholder="date (yyyy-mm-dd)" />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div id="temp-buttons" >
          <h2 >Temp Buttons for Nick</h2>
          <button onClick={userListClick} >User List</button>
          {/*<button >Delete All Data</button>*/}
        </div>
        <p>
          <strong>GET user's exercise log: </strong>
          <code>GET /api/users/:_id/logs?[from][&amp;to][&amp;limit]</code>
        </p>
        <p>Response: {/*JSON.stringify(respDisp)*/}</p>
        <p>testing: {exData}</p>
        <p><strong>[ ]</strong> = optional</p>
        <p><strong>from, to</strong> = dates (yyyy-mm-dd); <strong>limit</strong> = number</p>
      </div>
    </div>
  )
}

export default ExerciseTrackerApp