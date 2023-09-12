//on utilise useRef pour récupérer le contenu de main dans une variable refWolverine.
//grace à ca on a accès à son objet et on utlise classList pour lui ajouter grace au useEffect une class startingImg
//qui s'execute au chargement de la page. On enleve cette classe au bout de 3 secondes pour switcher d'image et enlever les griffes
//ensuite grace a useState on crée un état boleen qui va gérer l'affichage ou non des boutons Connexion/Inscription
//on affiche les boutons en passant à true dans notre useRef à l'interieur du settimeOut, juste après avoir enlevé les griffes

import { useRef, useEffect, useState, Fragment } from 'react';
import { Link } from "react-router-dom"

const Landing = () => {

    const refWolverine = useRef(null)
    const [btn, setBtn] = useState(false)


    useEffect (() => {
        refWolverine.current.classList.add("startingImg")
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg")
            setBtn(true)
        },1000)
    },[])

    const handleClickLeft = () => {
        refWolverine.current.classList.add("leftImg")
    }

    const handleClickRight = () => {
        refWolverine.current.classList.add("rightImg")
    }

    const handleClear = () => {
        if (refWolverine.current.classList.contains("leftImg")){
            refWolverine.current.classList.remove("leftImg")
        } else if (refWolverine.current.classList.contains("rightImg")){
            refWolverine.current.classList.remove("rightImg")
        }
    }

    const displayBtn = btn && (
        <Fragment>
            <div className="leftBox">
                <Link to="/signup" onMouseOver={handleClickLeft} onMouseOut={handleClear} className="btn-welcome">Inscription</Link>
            </div>
            <div className="rightBox">
                <Link to="/login" onMouseOver={handleClickRight} onMouseOut={handleClear} className="btn-welcome">Connexion</Link>
            </div>
        </Fragment>
    )


        
    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    );
};

export default Landing;