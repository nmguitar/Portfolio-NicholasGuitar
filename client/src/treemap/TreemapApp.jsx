import React from 'react';
import { useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import VgTreeApp from './VgTreeApp';


function TreeMapApp() {


  return (
    <div id="treeMapContainer" >
      <p>
        <a href="videoGameData.html" >Video Game Data Set</a> | <a href="moviesData.html" >Movies Data Set</a> | <a href="kickstartData.html" >Kickstarter Data Set</a>
      </p>
      {/**below will be conditional on state - whether we are on home page or one of the treemaps */}
      <VgTreeApp />
    </div>
  )
}


export default TreeMapApp