//signUp et login sont similaires dans leur architecture, avec 2 moyens de gérer le State : 
//signup: utilise un state avec un objet qui regroupe toutes les valeurs des inputs (email, pseudo etc...), on a donc un seul handleChange qui regroupe tout
//login: utiliser un state par input, avec une chaine de caractères. Un handleChange par input. on a plus besoin du id dans le input pour récupérer les données (on donne au setState directement)

import {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import {auth} from "./Firebase/firebaseConfig"
import {Link, useNavigate} from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [btn, setBtn] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(password.length > 5 && email !== "") {
            setBtn(true)
        } else if (btn === true){
            setBtn(false)
        }
    },[email, password])

    const handleSubmit = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)  //on passe en premier paramètre l'authentification
        .then(user => {
            setEmail("")
            setPassword("")
            navigate("/welcome", {replace: true}) // de ce que jai compris {replace: true} permet de ne plus pouvoir revenir sur la page précédente, à creuser
        })
        .catch(error => {
            setError(error)
            setEmail("")
            setPassword("")
            console.log(error)

        })
    }

return (
    <div className="signUpLoginBox">
        <div className="slContainer">
            <div className="formBoxLeftLogin">

            </div>

            <div className="formBoxRight">
                <div className ="formContent">
                    <form onSubmit={handleSubmit}>
                        <h2>Connexion</h2>

                        <div className ="inputBox">
                            <input onChange={(e) => setEmail(e.target.value)} value ={email} type="email" autoComplete="off" required/>  {/* autoComplete="off" permet d'éviter les suggestion de Google sur les mots déjà tapés */}
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className ="inputBox">
                            <input onChange={(e) => setPassword(e.target.value)} value ={password} type="password" autoComplete="off" required/>  {/* autoComplete="off" permet d'éviter les suggestion de Google sur les mots déjà tapés */}
                            <label htmlFor="password">Mot de passe</label>
                        </div>

                        {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}

                    </form>
                    <div className="linkContainer">
                        <Link className="simpleLink" to="/signup">Nouveau sur le site ? Inscris-toi ici</Link>
                        <br />
                        <br />  
                        <Link className="simpleLink" to="/forgetpassword" >Mot de passe oublié ? Récupérez-ici</Link>

                    </div>
                </div>
            </div>
            
        </div>
    </div>
);
};

export default Login;