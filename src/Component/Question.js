import React from 'react';
import Answer from './Answer';
import '../App.css';

function Question({question,saveAnswers,updateSaveAnswers,id}) {
  const regex = /&quot;/gi
  const hypostrof = /&#039;/gi

  return (
    <>
    <p style={{width:'400px'}}>{question.question.replace(regex, "").replace(hypostrof, "'")}</p>
    <Answer correct={question['correct_answer']} incorrect={question['incorrect_answers']} saveAnswers={saveAnswers} updateSaveAnswers={updateSaveAnswers} id={id}/>
    </>
  );
}

export default Question;
