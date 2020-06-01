import React, {useEffect,useState, useRef} from 'react';
import AriaModal from 'react-aria-modal'
import axios from 'axios'
import Question from './Question'
import './Quiz.css'
import './Modal.css'
import '../App.css';


function Quiz() {
  const [questions, updateQuestions] = useState([]);
  const [saveAnswers, updateSaveAnswers] = useState([]);
  const [update, newUpdate] = useState(false)
  const [modalActive, updateModalActive] = useState(false)
  const quiz = useRef()

  useEffect(()=>{
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(response=>{
      let arr = new Array(10)
      updateSaveAnswers(arr.fill(null))
      updateQuestions(response.data.results)
    })
  },[update])
  function restart(){
    let points = saveAnswers.reduce((acc,cur) => acc + cur );
    const total = 10;
    let oldscoresave = JSON.parse(localStorage.getItem('score'))
    if(oldscoresave){
    let newpoints = oldscoresave.points + points;
    let newtotal = oldscoresave.total + total;
    localStorage.setItem('score', JSON.stringify({points:newpoints, total:newtotal}))
  }else{
    localStorage.setItem('score', JSON.stringify({points:points, total:total}))
  }
    newUpdate(!update)
    updateModalActive(false)
  }
  function activateModal(e){
    e.preventDefault()
    updateModalActive(true)
  }
  function deactivateModal(){
    updateModalActive(false)
  }

  function getApplicationNode(){
      return document.getElementById('root');
    };


  const modal = modalActive
    ? <AriaModal
        titleText="demo one"
        onExit={deactivateModal}
        initialFocus="#RestartButton"
        getApplicationNode={getApplicationNode}
        underlayStyle={{ paddingTop: '4em' }}
      >
      <div className="modalWindow">
      <h2 className="ModalTitle">Congratulations!</h2>
      <p className="ModalText">You answered {saveAnswers.reduce((acc,cur) => acc + cur )}/10 questions correct!</p>
      <div className="buttons">
      <button id="RestartButton" tabIndex="0" onClick={restart} >RE-START</button>
      <button className="Close" tabIndex="0" onClick={deactivateModal}>CLOSE</button>
      </div>
      </div>
      </AriaModal>
    : false;

  return (
    <main className="quiz" ref={quiz}>
    <form onSubmit={activateModal}>
    <article  aria-live="assertive" aria-label="Quiz">
    {questions.map((question, id) =>(
      <Question id={id} key={question.question} question={question} saveAnswers={saveAnswers} updateSaveAnswers={updateSaveAnswers}/>
    ))}
    </article>
    <div>
      <input className="submit" type="submit" value="SKICKA" />
      {modal}
    </div>
    </form>
    </main>
  );
}

export default Quiz;
