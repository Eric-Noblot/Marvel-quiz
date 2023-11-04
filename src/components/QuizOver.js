import React, {useEffect, useState} from "react"
import { GiTrophyCup } from "react-icons/gi" //gi= git Icons 
import Loader from "./Loader"
import Modal from "./Modal/Modal"

const QuizOver = React.forwardRef((props, ref) => {
    // console.log("props", props)
    // console.log("ref", ref)

    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props  //destructuring pour récupérer les props du meme nom
    const [askedQuestions, setAskedQuestions] = useState([])
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        setAskedQuestions(ref.current)
    },[ref])

    const showModal = (id) => {
        setOpenModal(true) 
    }
    const hideModal = () => {
        setOpenModal(false) 
    }

    if (score < maxQuestions / 2) { //si on veut forcer le joueur à revenir à la page d'accueil on peut loadLevelQuestions(0)
        setTimeout(() => {
            loadLevelQuestions(quizLevel)
        },3000)
    }

    const decision = score >= maxQuestions / 2 ? ( //Est ce que le joueur a au moins obtenu la moyenne?

        <>
        {
            quizLevel < levelNames.length ? //Est ce que le joueur au moins obtenu la moyenne et que le dernier niveau n'est pas atteint(quizLevel correspond à l'indice pour levelNames: ["debutant", "confirme", "expert"]
            (
                <>
                    <p className="successMsg">
                        < GiTrophyCup size= "50px" color = "gold"/> {/* on peut styliser les images importées de react en utilisant des props (documentation de react-icon , aller sur le github via le lien, descendre en bas de la page pour voir les "key" et les value possibles) */}
                        Bravo, passez au niveau suivant!
                    </p> 
                    <button onClick= {() => loadLevelQuestions(quizLevel)} className ="btnResult success">Niveau Suivant</button>  
                </>
            ) :
            (
                <>
                    <p className="successMsg">Bravo vous êtes un expert !</p>
                    <button onClick= {() => loadLevelQuestions(0)} className ="btnResult gameOver">Accueil</button>  
                    {/* on remet loadLevelQuestions à zéro dans le cas ou le dernier niveau est atteint */}
                </>
            )
        }
        </>
    ) : (
            <>
                <p className="failureMsg">Vous avez échoué !</p>
            </>
        )

    const questionAnswer =  score >= maxQuestions / 2 ? ( //on vérifie que l'utilisateur a bien validé le quiz avant d'afficher les bonnes réponses à la fin du test
        askedQuestions.map((question) => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button className="btnInfo" onClick={() => showModal(question.heroId)}>Infos</button> {/* pour afficher la modal on récupère le heroId dans le questionnaire, pour ca on crée une fonction qui appelle la fonction showModal afin de lui passer en paramètre le heroId qui va interagir avec l'API MARVEL*/}
                    </td>  
                </tr>
            )
        })
    ) :
    (
        <tr>
            <td colSpan="3"> {/* comme on a 3 colones normalement, on veut ce notre td remplisse tout le tableau */}
                <Loader loadingMsg={"Pas de réponse"} styling={{textAlign: "center", color: "red"}}/>
            </td> 
        </tr>
    )

    return (
        <>
            <div className="stepsBtnContainer">
                {decision}
            </div>

            <div className="percentage">
                <div className = "progressPercent">Réussite : {percent}%</div>
                <div className = "progressPercent">Note {score} / {maxQuestions}</div>
            </div>

            <hr />
            <p>Les réponses aux questions posées: </p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
            <Modal showModal={openModal} hideModal={hideModal}> {/* On ouvre ici le component Modal pour passer des children en props*/}
                <div className = "modalHeader">
                    <h2>Titre</h2>
                </div>
                <div className="modalBody">
                    <h3>Titre2</h3>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn">Fermer</button>
                </div>
            </ Modal >
        </>
    );
});

export default React.memo(QuizOver);

// Si on veut récupérer en props des ref (cad une props qui fait reference à React.createRef dans le parent)
// on doit passer par React.forwardRef pour pouvoir la récupérer. Ici on voit la diffrence en declarant en parametre
// props qui récupère les props normales, et ref qui permet de récupérer la référence. On dissocie donc 2 props

// On utilise React.memo pour ne pas charder inutilement la page. Sans ca les 2 console.log se
//chargent plusieurs fois. React.memo permet de checker les props de QuizOver et vérifie si elles ont changé.
//si c'est les mêmes la métohde n'est pas rechargée