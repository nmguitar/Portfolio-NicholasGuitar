//import '../App.scss';
import React from 'react';

function HomePageApp() {
    const [data, setData] = React.useState(null);
  
    React.useEffect(() => {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
    
    
    return (
      <div className="home-page-app">
        
        <main>
          <section id="welcome-section">
            <h1>Hello :) I'm Nick Guitar</h1>
            <h2>Web Developer</h2>
            <h2>{!data ? "Loading..." : data}</h2>
          </section>
          <div id="projects" >
            <h1> Here's some of my work </h1>
            <section class="project-tiles"> 
                <a id="survey-form" class="project-tile"> 
                  {/*add better links when available https://www.freecodecamp.org/learn/2022/responsive-web-design/build-a-survey-form-project/build-a-survey-form 
                  testing...
                  */}
                  <img alt="Survey Form" height="300px" />
                  <h2>
                    <span class="hiding-text">&lt; </span>React-Redux 25 + 5 Timer <span class="hiding-text">/&gt;</span>
                  </h2>
                </a>
                <a id="tribute-page" > 
                  <img alt="Tribute Page" />
                  <h2>
                    <span class="hiding-text">&lt; </span>Exercise Tracker <span class="hiding-text">/&gt;</span>
                  </h2>
                </a>
                <a id="technical-doc" > 
                  <img alt="Technical Documentation Page" />
                  <h2>
                    <span class="hiding-text">&lt; </span>D3 Treemap <span class="hiding-text">/&gt;</span>
                  </h2>
                </a>
              
                <a id="product-landing" > 
                  <img  alt="Product Landing Page" />
                  <h2>
                    <span class="hiding-text">&lt; </span>PSQL Number Guessing Game <span class="hiding-text">/&gt;</span>
  
                  </h2>
                </a>   
                <a id="product-landing" > 
                  <img  alt="Product Landing Page" />
                  <h2>
                    <span class="hiding-text">&lt; </span>React-Redux Calculator <span class="hiding-text">/&gt;</span>
  
                  </h2>
                </a> 
                <a id="product-landing" > 
                  <img  alt="Product Landing Page" />
                  <h2>
                    <span class="hiding-text">&lt; </span>D3 Choropleth Map <span class="hiding-text">/&gt;</span>
  
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

  export default HomePageApp;