import React, { Component } from 'react';
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import {QuizMarvel} from "../questions/index"
import QuizOver from "../components/QuizOver"

class Quiz extends Component {

    constructor(props) {
        super(props)

        this.initialState = {
            levelNames: ["debutant", "confirme", "expert"],
            quizLevel: 0,
            maxQuestions: 10,   //ici on s'assure que les questions ne dépassent pas 10
            storedQuestions: [], //sert à enregistrer les 10 questions
            question: null,
            options: [],
            idQuestion: 0,
            btnDisabled: true,
            userAnswer: null,
            score: 0,
            quizEnd: false
        }

        this.state = this.initialState //je nai pas bien compris pkoi je dois crée un initialState pour le faire passer dans this state. mais sans la methode du constructor le bouton suivant ne marche pas quand je veux passer à un autre niveau et ré afficher les 1eres questions du niveau suivant (video 165.29)
    }


    storedDataRef = React.createRef()   //on utilise ref pour stocker à nouveau les données brut car on a enlevé les réponses dans les questions un peu plus bas. on se servira du current dans loadQuestions et nextQuestions pour aller récupérer la réponse par rapport à la question actuelle

    loadQuestions = (level) => {
        console.log("loadQuestion", level)
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level]
        
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            this.storedDataRef.current = fetchedArrayQuiz //ici on utilise ref, grace au current on peut acceder à son contenu
            // console.log(this.storedDataRef)
            const newArray = fetchedArrayQuiz.map( ({answer, ...keepRest}) => keepRest) //On crée un nouveau tableau pour récupérer toutes les questions sans la réponse. Grace au destructuring, on appelle answer (qui s'appelle pareil dans lobjet), et on a juste à ...keep pour mettre tout le reste de l'objet et on return juste ca
            this.setState({
                storedQuestions: newArray //on peut vérifier dans la console / react Component si les questions sont bien chargées dans le State
            })
            
        } else {
            console.log("pas assez de questions !!!")
        }
        console.log("fetchedArrayQuiz", fetchedArrayQuiz)

    }

    componentDidMount() { //useEffect
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) { // le ,[] dans le useEffect
        if (this.state.storedQuestions !== prevState.storedQuestions && this.state.storedQuestions.length) { //on s'assure que la question a bien changé ou que l'array n'est pas vide, et que storedQuestions n'est pas vide
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question, //on peut vérifier dans la console / react Component...
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        if (this.state.idQuestion !== prevState.idQuestion && this.state.storedQuestions.length) { //une deuxieme ecoute dans componentDidUpdate, c'est lorsque l'Id de la question change (lutilisateur a clqiue sur suivant)
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question, 
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true //cette fois on remet la réponse de l'utilisateur à blanc et on désactive à nouveau le bouton suivant
            })
        }

        if (this.state.quizEnd !== prevState.quizEnd) {
            const finalNote = this.getPercentage(this.state.maxQuestions, this.state.score)
            this.gameOver(finalNote)
        }
    }
    

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1 ) { //Si le questionnaire est fini/  idQuestion commence à zéro donc quand il arrive à 9 on considère qu'il est égal à maxQuestions
            // this.gameOver()
            this.setState({
                quizEnd: true
            })
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

    submitAnswer = (selectedAnswer) => { //au clique de lutilisateur sur une reponse, on restock la réponse dans userAnwser(), cela va nous permettre de la comparer à option dans le HTML afin d'appliquer une classe CSS speciale (selected)
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    getPercentage = (maxQuest, score) => {
        return (score /  maxQuest) * 100
    }

    gameOver = (percent) => { // quand la 10eme question est finie

        if (percent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: percent,
            })
        } else {
            this.setState({
                percent  // destructuring qui fait comme la ligne au dessus
            })
        }
    }

    loadLevelQuestions = (param) => { //on met à jour le quizlevel en récupérant param qui est égal à quizLevel donné par l'enfant QuizOver en props
        this.setState({
            ...this.initialState, quizLevel: param
        })
        this.loadQuestions(this.state.levelNames[param])
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

        return this.state.quizEnd ? 
        (
            <QuizOver 
            ref={this.storedDataRef} 
            levelNames = {this.state.levelNames}
            score = {this.state.score}
            maxQuestions={this.state.maxQuestions}
            quizLevel={this.state.quizLevel}
            percent={this.state.percent}
            loadLevelQuestions={this.loadLevelQuestions}/>
        )
        :
        (
            <>
                <Levels />
                <ProgressBar idQuestion = {this.state.idQuestion} maxQuestions={this.state.maxQuestions}/>
                <h2>{this.state.question}</h2>
    
                { displayOptions }

                <button onClick={this.nextQuestion} disabled={this.state.btnDisabled} className="btnSubmit">
                    { this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}
                </button>
            </>
        )
    }
}


export default Quiz;