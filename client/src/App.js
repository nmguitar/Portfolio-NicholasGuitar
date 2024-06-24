//import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  
  
  return (
    <div className="App">
      <header>
        <nav id="navbar">
          <ul>
            <li>
              <a href="#welcome-section" >About</a>
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
      <main>
        <section id="welcome-section">
          <h1>Hello :) I'm Nick Guitar</h1>
          <h2>Web Developer</h2>
          <h2>{/*!data ? "Loading..." : */data}</h2>
        </section>
        <div id="projects" >
          <h1> Here's some of my work </h1>
          <section id="project-tiles"> 
              <a id="survey-form" class="project-tile"> 
                {/*add better links when available https://www.freecodecamp.org/learn/2022/responsive-web-design/build-a-survey-form-project/build-a-survey-form 
                testing...
                */}
                <img href="" alt="Survey Form" height="300px" />
                <h2>
                  <span class="hiding-text">&lt; </span>Survey Form <span class="hiding-text">/&gt;</span>
                </h2>
              </a>
              <a id="tribute-page" > 
                <img href="" alt="Tribute Page" />
                <h2>
                  <span class="hiding-text">&lt; </span>Tribute Page <span class="hiding-text">/&gt;</span>
                </h2>
              </a>
              <a id="technical-doc" > 
                <img href="" alt="Technical Documentation Page" />
                <h2>
                  <span class="hiding-text">&lt; </span>Technical Documentation Page <span class="hiding-text">/&gt;</span>
                </h2>
              </a>
            
              <a id="product-landing" > 
                <img href="" alt="Product Landing Page" />
                <h2>
                  <span class="hiding-text">&lt; </span>Product Landing Page <span class="hiding-text">/&gt;</span>

                </h2>
              </a>   
          </section>
          <h2 id="show-all">Show All</h2>
        </div>
        <section id="contact">
          <h1>Let's work together!</h1>
          <ul id="contact-links">
            <a href="" >
              <li id="github"><img alt="G" /> GitHub</li>
            </a>
            <a href="https://www.freecodecamp.org/nickguitar" id="profile-link" target="_blank" >
              <li id="fcc" ><img alt="f" /> freeCodeCamp</li>
            </a>
            <a href="" >
              <li id="email"><img alt="e" /> Email</li>
            </a>
            <a href="" >
              <li id="phone"><img alt="P" /> Phone</li>
            </a>
          </ul>
        </section>
      </main>
      <footer> {/* can add a footer at later date */}

      </footer> 
    {/* boilerplate react
    
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    */}
    </div>
  );
}

export default App;
