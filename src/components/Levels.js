import React, { useEffect, useState } from 'react';
import Stepper from "react-stepper-horizontal"

const Levels = ({levelNames, quizLevel}) => {

    const [levels, setLevels] = useState([])

    useEffect(() => {
        const quizSteps = levelNames.map((level) => {
            return {title: level.toUpperCase()}
        })
        setLevels(quizSteps)
        
    },[levelNames])

    // console.log(levels)
    return (

        <div className="levelsContainer" style={{background: "transparent"}}>
            {/* le composant Stepper fait partie du package react-stepper-horizontal, on peut lui passer des props pour le styliser selon la documentation npmjs.com/package/react-stepper-horizontal */}
                <Stepper 
                    steps={ levels } 
                    activeStep={ quizLevel }
                    circleTop = {0} /*gère la hateur de la marge*/
                    activeTitleColor = {"#d31017"} /*gère la couleur du titre actif*/
                    activeColor = {"#d31017"}  /*gère la couleur du cercle actif*/
                    completeTitleColor = {"#E0E0E0"} /*gère la couleur du titre déjà effectué(le précédent)*/
                    defaultTitleColor = {"#E0E0E0"} /*gère la couleur du titre par defaut (ceux complétés et ceux pas encore effectués, ca permet de donner la meme couleur à tous les title sauf l'actif*/
                    completeColor = {"#E0E0E0"}  /*on donne la meme couleur par defaut au complete que ceux pas complétés*/
                    completeBarColor = {"#E0E0E0"}  /*on passe la barre entière en grisé*/
                    size = { 45 } /*augmente la taille des cercles*/
                    circleFontSize = { 20 } /*augmente la taille de la polce dans le cercle*/
                    /> 
        </div>
    );
};

export default React.memo(Levels);

//React.memo permet au console.log(levels) ligne 15 de ne pas se lancer 3 fois
//npm i react-stepper-horizontal
