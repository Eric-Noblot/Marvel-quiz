import React, { Component } from 'react';
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import {QuizMarvel} from "../questions/index"


class Quiz extends Component {

    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,   //ici on s'assure que les questions ne dépassent pas 10
        storedQuestions: [], //sert à enregistrer les 10 questions
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0
    }

    storedDataRef = React.createRef()   //on utilise ref pour stocker à nouveau les données brut car on a enlevé les réponses dans les questions un peu plus bas. on se servira du current dans loadQuestions et nextQuestions pour aller récupérer la réponse par rapport à la question actuelle

    loadQuestions = (level) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level]
        
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            this.storedDataRef.current = fetchedArrayQuiz //ici on utilise ref, grace au current on peut acceder à son contenu
            console.log(this.storedDataRef)
            const newArray = fetchedArrayQuiz.map( ({answer, ...keepRest}) => keepRest) //On crée un nouveau tableau pour récupérer toutes les questions sans la réponse. Grace au destructuring, on appelle answer (qui s'appelle pareil dans lobjet), et on a juste à ...keep pour mettre tout le reste de l'objet et on return juste ca
            this.setState({
                storedQuestions: newArray //on peut vérifier dans la console / react Component si les questions sont bien chargées dans le State
            })
            
        } else {
            console.log("pas assez de questions !!!")
        }
    }

    componentDidMount() { //useEffect
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) { // le ,[] dans le useEffect
        if (this.state.storedQuestions !== prevState.storedQuestions) { //on s'assure que la question a bien changé ou que l'array n'est pas vide
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question, //on peut vérifier dans la console / react Component...
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        if (this.state.idQuestion !== prevState.idQuestion) { //une deuxieme ecoute dans componentDidUpdate, c'est lorsque l'Id de la question change (lutilisateur a clqiue sur suivant)
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question, 
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true //cette fois on remet la réponse de l'utilisateur à blanc et on désactive à nouveau le bouton suivant
            })
        }
    }
    
    submitAnswer = (selectedAnswer) => { //au clique de lutilisateur sur une reponse, on restock la réponse dans userAnwser(), cela va nous permettre de la comparer à option dans le HTML afin d'appliquer une classe CSS speciale (selected)
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1 ) { // idQuestion commence à zéro donc quand il arrive à 9 on considère qu'il est égal à maxQuestions
            //end
        } else {
            this.setState( (prevState) => ({
                idQuestion: prevState.idQuestion +1
            }))
        }
        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer //je cible dans le storedData toutes les données, puis je récupère la réponse qui correspond à l'idQuestion du state 
        if (this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ( //grace à prevState on se base sur l'état du State qui existe deja, et pas directement sur le state de base tout en haut de la page
                {score: prevState.score +1} //on remarque qu'ici je crée un objet, je commence par ouvrir ma fonction => avec (), PUIS j'ouvre{}. --> à comparer avec le State d'au dessus
            ))
        }
    }

    render() {

        const displayOptions = this.state.options.map((option, index) => {
            return (

                <p key = {index}
                className= {`answerOptions ${this.state.userAnswer === option ? " selected" : null }`} //pour faire en sorte que la reponse au clique reste en rouge et en uppercase, on vérifie que la réponse stockée correspond au clique option de l'utilsateur
                onClick={() => this.submitAnswer(option)}
                >
                {option}</p>
            )
        })


        return (
            <div>
                <Levels />
                <ProgressBar />
                <h2>{this.state.question}</h2>
    
                { displayOptions }

                <button onClick={this.nextQuestion} disabled={this.state.btnDisabled} className="btnSubmit">Suivant</button>
            </div>
        );
    }
}


export default Quiz;