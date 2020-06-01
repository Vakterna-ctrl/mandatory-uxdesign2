import React, {useEffect,useState} from 'react';

import '../App.css';

function Stats() {
  const [score, savescore] = useState({})

  useEffect(()=>{
    let oldscoresave = JSON.parse(localStorage.getItem('score'));
    if(oldscoresave){
    let total = oldscoresave.total
    let points = oldscoresave.points
    let incorrect = total - points;
    let correct = Math.floor(points/total*100);
    let gamesplayed = total/10
    savescore({points:points, incorrect:incorrect, correct:correct, gamesplayed:gamesplayed})
  }else{
    savescore({points:0, incorrect:0, correct:0, gamesplayed:0})
  }
  },[])


  return (
    <div className="Stats">
    <h2>Games played</h2>
    <p>{score.gamesplayed}</p>
    <h2>Correct answers</h2>
    <p>{score.points}</p>
    <h2>incorrect answers</h2>
    <p>{score.incorrect}</p>
    <h2>Correct percentage</h2>
    <p>{score.correct}%</p>

    </div>
  );
}

export default Stats;
