import React from 'react';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import VgTreeApp from './VgTreeApp';
import MvTreeApp from './MvTreeApp';
import KsTreeApp from './KsTreeApp'


function TreeMapApp() {
  const[dispData, setDispData] = useState('vgData')
  
  const handleVgClick = () => {
    setDispData('vgData');
  };

  const handleMvClick = () => {
    setDispData('mvData');
  };

  const handleKsClick = () => {
    setDispData('ksData');
  };

  return (
    
    <div id="treeMapContainer" >
      <p>
        <a onClick={handleVgClick} >Video Game Data Set</a> | <a onClick={handleMvClick} >Movies Data Set</a> | <a onClick={handleKsClick} >Kickstarter Data Set</a>
      </p>
      {dispData === 'vgData'
        ? <VgTreeApp />
        : dispData === 'mvData'
          ? <MvTreeApp />
          : <KsTreeApp />
      }
    </div>
  )
}


export default TreeMapApp