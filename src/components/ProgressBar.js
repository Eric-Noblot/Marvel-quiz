import React from 'react';

const ProgressBar = ({idQuestion, maxQuestions}) => {

    const getWidth = (totalQuestions, questionId) => {
        return (100 / totalQuestions * questionId)
    }

    const actualQuestion = idQuestion + 1
    const progressPercent = getWidth(maxQuestions, actualQuestion)
    // console.log(progressPercent)
    return (
        <>
            <div className="percentage">
                <div className="progressPercent">{`${actualQuestion}/${maxQuestions} `}</div>
                <div className="progressPercent">{`Progression: ${progressPercent}%`}</div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange" style={{width: `${progressPercent}%`}}></div>
            </div>
        </>
    );
};

export default React.memo(ProgressBar);

//Pkoi utiliser React.memo ici ?

// Lorsqu'on regarde le console.log(progressPercent) (ligne 11), on ss rend compte qu'a chaque fois qu'on change
// de question, le console.log s'execute 3 fois.  En utilisant React.memo(qui est utile dans une classe, dans une
// fonction c'est pureComponent), on dit à React de checker si les élements reçus en props ont changé ou pas. 
// Si les éléments n'ont pas changé, react ne recharge pas le composant une nouvelle fois et n'execute pas
// à nouveau la méthode getWidth. On voit bien dans le console.log que chaque progressPercent n'est chargé
// qu'une fois