import React, {useState,useRef} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import AriaModal from 'react-aria-modal'
import Button from "./Component/Button"
import Quiz from "./Component/Quiz"
import Stats from './Component/Stats'
import Aboutthissapp from './Component/Aboutthissapp'
import Master from './Component/Master'
import Statistics from './Component/Statistics'
import AboutTitle from './Component/AboutTitle'
import './App.css';

function App() {
  const [modalActive, updateModalActive] = useState(false)
  const hamburgermenu = useRef()


  function activateModal(){
    updateModalActive(true)
  }
  function deactivateModal(){
    hamburgermenu.current.style.marginLeft = -250+'px'
    hamburgermenu.current.setAttribute('aria-expanded', 'false')
    setTimeout(()=>{
      updateModalActive(false)
    },1000)
  }
  function pressEnter(e){
    if(e.key==='Enter'){
      updateModalActive(true)
    }
  }


  function getApplicationNode(){
    return document.getElementById('root')
  }
  function onEnter(){
    hamburgermenu.current.setAttribute('aria-expanded', 'true')
    hamburgermenu.current.style.marginLeft = 0+'px'
  }

  const modal = modalActive
      ? <AriaModal
          titleText="drawer menu"
          onExit={deactivateModal}
          getApplicationNode={getApplicationNode}
          onEnter={onEnter}
        >
          <div className='Hamburger' ref={hamburgermenu} aria-expanded="false">
          <h2 className="HamburgerTitle">Quiz Master</h2>
          <p className="HamburgerText">Become the master of Quizzes</p>
          <hr/>
          <nav className="navigation">
          <ul>
          <li><a href="/quiz" className="list">Game Screen</a></li>
          <li><a href="/stats" className="list">Stats</a></li>
          <li><a href="/aboutthissapp" className="list">About This App</a></li>
          </ul>
          </nav>
          </div>
        </AriaModal>
      : false;
  return (
    <div className="App">
      <Router>
      <header className="App-header">
      <span className="material-icons" tabIndex="0" role="navigation" aria-label="Drawer Menu" onKeyDown={pressEnter} onClick={activateModal}>menu</span>
      <Route exact path="/" component={Master}/>
      <Route path="/quiz" component={Master}/>
      <Route path="/stats" component={Statistics}/>
      <Route path="/aboutthissapp" component={AboutTitle}/>
      </header>
      <Route exact path="/" component={Button}/>
      <Route path="/stats" component={Stats}/>
      <Route path="/quiz" component={Quiz}/>
      <Route path="/aboutthissapp" component={Aboutthissapp}/>
      </Router>
      <div>
        {modal}
      </div>
    </div>
  );
}

export default App;
