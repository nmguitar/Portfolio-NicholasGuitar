import './App.scss';
import React from 'react';
import HomePageApp from './home-page/HomePageApp'
import TwentyFiveApp from './twenty-five/TwentyFiveApp';

function App() {
  return(
    <div id="appContainer" >
      <HomePageApp />
      <TwentyFiveApp />
    </div>
  )
}


export default App;
