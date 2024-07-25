import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import {prettyObjArr} from '../functions/prettyObjectArray.js'


function NodeResponse() {
  const [nodeResp, setNodeResp] = useState('No Response Yet...')
  const [apiStr, setApiStr] = useState('')

  const location = useLocation();
  const { username } = useParams();

  if(apiStr === '' && location.pathname === '/exercise/api/users'){
    setApiStr('/api/users')
    //console.log(nodeResp)
  } else if(apiStr === '' && location.pathname === `/exercise/api/users/${username}/logs`){
    //console.log(location)
    setApiStr(`/api/users/${username}/logs` + location.search)
  }
 /* setApiStr('')
  console.log(location)
*/
  useEffect(() => {
    if(nodeResp === 'No Response Yet...' ){//&& location.pathname === '/exercise/api/users' ){
      axios.get(apiStr)//"/api/users")
      .then((response) => {
        setNodeResp(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error)
      } );

    } /*else {
      setNodeResp('location: ' + location.pathname + ' | username: ' + username)
    }*/
    
    /*else if(location.pathname === `exercise/api/users/${username}/logs` && nodeResp === 'No Response Yet...'){


      axios.get(`/api/users/${username}/logs`)
      .then((response) => {
        setNodeResp(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error)
      } );
    }*/
    
    //setNodeResp(location.pathname)
  })

  return (
    <div id="nodeRespContainer">
      <p>Server Response:</p>
      <p style={{ whiteSpace: "pre-wrap" }} >{prettyObjArr(nodeResp)}</p>
    </div>
  );
}

export default NodeResponse