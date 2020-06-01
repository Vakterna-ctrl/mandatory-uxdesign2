import React from 'react';
import {Link} from "react-router-dom";
import "./Button.css"
import '../App.css';


function Button() {
  return (
    <div className="buttonDiv" tabIndex="0" >
    <Link to="/quiz"><button aria-label="Start Quiz" className="button">Start Quiz</button></Link>
    </div>
  );
}

export default Button;
