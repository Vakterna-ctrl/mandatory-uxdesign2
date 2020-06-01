import React, {useEffect,useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Answer.css'
import '../App.css';

function Answer({correct, incorrect, saveAnswers, updateSaveAnswers, id}) {
  const [answers, updateAnswers] = useState([])
  useEffect(()=>{
    let a = [correct, ...incorrect]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    updateAnswers(a)
  },[])

  function select(e){
    let point = 0;
    if(e.target.value === correct){
      point = 1
    }
    updateSaveAnswers([
      ...saveAnswers.slice(0, id),
      point,
      ...saveAnswers.slice(id+1)
    ])
  }

  return (
    <>
    {answers.map((answer, id)=>(
      <label key={id} className="RadioButtonItem">
      <input type="radio" name={answers[1]} id={answer} aria-required="true" required value={answer} onClick={select} />
       <span className="fake" /><span>{answer}</span>
       <br/>
       </label>
    ))}
    </>
  );
}

export default Answer;
