//jai essayé de passer par un composant fonctionel plutot qu'une class comme dans le cours

import React from 'react';
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import {useState, useEffect, useRef} from "react"
import {QuizMarvel} from "../questions/index"


const Quiz = ({userData}) => {

    const [questions, setQuestions] = useState("")
    const [answerChoice, setAnswerChoice] = useState([])

    const [level, setLevel] = useState({
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0
    })

    const loadQuestions = (levelCategory) => { //levelCategory == debutant 

        const fetchedDataQuizz = QuizMarvel[0].quizz[levelCategory]
        setQuestions(fetchedDataQuizz)
        if (questions.length >= level.maxQuestions) { 
            const questionWithoutAnswer = questions.map(({answer, ...rest}) =>{
                
                return rest //on isole la question via le destructuring et on recupere le reste de l'objet dans une variable rest
            } )
            setLevel({...level, storedQuestions: questionWithoutAnswer})
        }
    }

    useEffect(() => {
        
            loadQuestions(level.levelNames[level.quizLevel])

            if (questions) {

                console.log(questions[level.idQuestion].question)
                setLevel({...level, 
                    // question: level.storedQuestions[level.idQuestion].question
                    question: questions[level.idQuestion].question
                })

                const answerAlone =  questions.map((answer) => {
                    let answerAlone = answer.options
                    return answerAlone
                })

                answerAlone[level.idQuestion].map((answer) => {
                    console.log("answerChoice", answerChoice)
                    setAnswerChoice(prevArray => [...prevArray, answer])
                })
            }
            else {
                console.log("Pas de question dans le State!!")
            }

    },[questions])

    const handleClick = () => {
        setLevel({...level, idQuestion: 1})
    }

    return (
        <div>
            <Levels />
            <ProgressBar />
            <h2>{level.question}</h2>

            {
                answerChoice.map((answer, index) => {
                   return <p key={index}  className="answerOptions">{answer}</p>
                })
            }

            <button onClick={handleClick} className="btnSubmit">Suivant</button>
        </div>
    );
};

export default Quiz;