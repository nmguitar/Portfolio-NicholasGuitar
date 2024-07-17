import './App.scss';
import React from 'react';
import TwentyFiveApp from './twenty-five/TwentyFiveApp';
import CalculatorApp from './calculator/CalculatorApp.jsx';
import TreeMapApp from './treemap/TreemapApp.jsx';
import * as d3 from 'd3';
import { goComp  } from './App-actions.js';
import { connect } from 'react-redux';
import store from './store.js';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
/*
function HomePageApp() {
  const [data, setData] = React.useState(null);
      
        React.useEffect(() => {
          fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
        }, []);

*/    


class HomePageApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }
  render() {

    return (
      <div className="home-page-app">
        
        <main>
          <section id="welcome-section">
            <h1>Hello :) I'm Nick Guitar</h1>
            <h2>Web Developer</h2>
            {/*<h2>{!data ? "Loading..." : data}</h2>*/}
          </section>
          <div id="projects" >
            <h1> Here's some of my work </h1>
            <section className="project-tiles"> 
              <Link to='twentyFive' id="twenty-five" className="project-tile">
                {/*<a id="twenty-five" className="project-tile" onClick={this.props.goTwentyFive}>*/} 
                  <img alt="React-Redux 25 + 5 Timer" height="300px" />
                  <h2>
                    <span className="hiding-text">&lt; </span>React-Redux 25 + 5 Timer <span className="hiding-text">/&gt;</span>
                  </h2>
                {/*</a>*/}
              </Link>
              <Link to='calculator' id="calculator-tile" className="project-tile" onClick={this.props.goCalculator}> 
                <img alt="React-Redux Calculator" />
                <h2>
                  <span className="hiding-text">&lt; </span>React-Redux Calculator <span className="hiding-text">/&gt;</span>
                </h2>
              </Link>
              <Link to='treemap' id="treemap" className="project-tile" onClick={this.props.goTreeMap}> 
                <img  alt="D3 Treemap" />
                <h2>
                  <span className="hiding-text">&lt; </span>D3 Treemap <span className="hiding-text">/&gt;</span>

                </h2>
              </Link>  

              <a id="number-guessing" > 
                <img alt="Number Guessing Game" />
                <h2>
                  <span className="hiding-text">&lt; </span>PSQL Number Guessing Game <span className="hiding-text">/&gt;</span>

                </h2>
              </a>
              <a id="exercise-tracker" > 
                <img alt="Exercise Tracker" />
                <h2>
                  <span className="hiding-text">&lt; </span>Node.js Exercise Tracker <span className="hiding-text">/&gt;</span>
                </h2>
              </a>
              <a id="choropleth" > 
                <img alt="D3 Choropleth Map" />
                <h2>
                  <span className="hiding-text">&lt; </span>D3 Choropleth Map <span className="hiding-text">/&gt;</span>

                </h2>
              </a>  
            </section>
            <h2 id="show-all">Show All</h2>
          </div>
          <section id="contact">
            <h1>Let's work together!</h1>
            <ul id="contact-links">
              <a  >
                <li id="github"><img alt="G" /> GitHub</li>
              </a>
              <a href="https://www.freecodecamp.org/nickguitar" id="profile-link" target="_blank" >
                <li id="fcc" ><img alt="f" /> freeCodeCamp</li>
              </a>
              <a  >
                <li id="email"><img alt="e" /> Email</li>
              </a>
              <a  >
                <li id="phone"><img alt="P" /> Phone</li>
              </a>
            </ul>
          </section>
        </main>
  
      </div>
    );
  }
}

class comboApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.goHomeComp = this.goHomeComp.bind(this);
    this.goTwentyFive = this.goTwentyFive.bind(this);
    this.goCalculator = this.goCalculator.bind(this);
    this.goTreeMap = this.goTreeMap.bind(this);
  }

  goHomeComp() {
    if(this.props.rootReducer.displayComponent !== "home"){
      this.props.changeComp("home");
    }
  }

  goTwentyFive() {
    if(this.props.rootReducer.displayComponent !== "twentyFive"){
      this.props.changeComp('twentyFive')
    }
  }

  goCalculator() {
    if(this.props.rootReducer.displayComponent !== "calculator"){
      this.props.changeComp('calculator')
    }
  }

  goTreeMap() {
    if(this.props.rootReducer.displayComponent !== "treemap"){
      this.props.changeComp('treemap')
    }
  }

  render() {
    console.log("render state: ")
    console.log(store.getState())
    const navLinkStyle = {
            padding: 0,
            margin: 0
          }
    return(
      

      <Router>
        <div id="appContainer" >
          <header>
            <nav id="navbar">
              <ul>
                
                  <li onClick={this.goHomeComp}>
                    <Link to='/'>Home</Link>
                  </li> 
                
                <li>
                  <a href="#projects" >Work</a>
                </li>
                <li>
                  <a href="#contact" >Contact</a>
                </li>
              </ul>
            </nav>
          </header>

          <Routes>
            <Route path='/' element={ <HomePageApp/> }/>
            <Route path='twentyFive' element={ <TwentyFiveApp/> }/>
            <Route path='calculator' element={ <CalculatorApp/> }/>
            <Route path='treemap' element={ <TreeMapApp/> }/>
          </Routes>
          
          {/*this.props.rootReducer.displayComponent === 'twentyFive'
              ? <TwentyFiveApp /> 
              : this.props.rootReducer.displayComponent === 'calculator'
                ? <CalculatorApp /> 
                : this.props.rootReducer.displayComponent === 'treemap'
                  ? <TreeMapApp />
                  : <HomePageApp 
                    goTwentyFive={this.goTwentyFive} 
                    goCalculator={this.goCalculator} 
                    goTreeMap={this.goTreeMap}
                    />
          */}
          
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rootReducer: {
      displayComponent: state.displayComponent
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeComp: (component) => {
      dispatch(goComp(component));
    }
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(comboApp);

export default App;
