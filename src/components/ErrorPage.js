// --on fait un peu de inline style dans ce component pour réviser le CSS, DonkeyGeek a délibérement enlevé ces class du fichier .CSS pour les refaire en dur ici

import React from 'react';
import batman from "../images/batman.png"

const centerH2 = {
    textAlign: "center",
    marginTop: "50px"
}

const centerImg = {
    display: "block",
    margin: "40px auto"
}
const ErrorPage = () => {
    return (
        <div classname="quiz-bg">
            <div className="container">
                <h2 style={centerH2}>Oups, cette page n'existe pas!</h2>
                <img style={centerImg} src={batman} alt="error page" />
            </div>
        </div>
    );
};

export default ErrorPage;