import React, {useEffect, useState} from "react"

const QuizOver = React.forwardRef((props, ref) => {
    // console.log("props", props)
    // console.log("ref", ref)

    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props  //destructuring pour récupérer les props du meme nom
    const [askedQuestions, setAskedQuestions] = useState([])

    useEffect(() => {
        setAskedQuestions(ref.current)
    },[ref])

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
                    <p className="successMsg">Bravo, passez au niveau suivant!</p>
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
                        <button className="btnInfo">Infos</button>
                    </td>  
                </tr>
            )
        })
    ) :
    (
        <tr>
            <td colSpan="3">
                <div className= "loader"></div>
                <p style={{textAlign: "center", color: "red"}}>
                    Pas de réponses ! 
                </p>
            </td> 
        </tr>
    )
    // comme on a 3 colones normalement, on veut ce notre td remplisse tout le tableau

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