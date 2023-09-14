import {useState} from 'react';
import {Link} from "react-router-dom"
import {auth} from "./Firebase/firebaseConfig"
import { sendPasswordResetEmail } from 'firebase/auth';
import {useNavigate} from "react-router-dom"

const ForgetPassword = () => {

    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setError(null)
            setSuccess("Consultez vos emails pour changer le mot de passe")
            setEmail("")

            setTimeout(() => { //un fois que le mail a été envoyé, on redirige l'utilisateur vers la page de login
                navigate("/login")
            },5000)
        })
        .catch(() => {
            setError(error)
            setEmail("")
        })
    }

    const disabled = email === "" // ici c'est une autre manière sans passer par useState avec un booleen. ici notre variable disabled renvoie un boolen qui est truc si le State email est vide et renvoie false si il contient qq chose

    return (
        <div className="signUpLoginBox">
        <div className="slContainer">
            <div className="formBoxLeftForget">

            </div>

            <div className="formBoxRight">
                <div className ="formContent">
                    {success && <span style={{border: "1px solid green", backgroundColor:'green', color: "white"}}>{success}</span>}
                    {error && <span>{error.message}</span>}

                    <h2>Mot de passe oublié</h2>

                    <form onSubmit={handleSubmit}>

                        <div className ="inputBox">
                            <input onChange={(e) => setEmail(e.target.value)} value ={email} type="email" autoComplete="off" required/>  {/* autoComplete="off" permet d'éviter les suggestion de Google sur les mots déjà tapés */}
                            <label htmlFor="email">Email</label>
                        </div>
                        <button disabled={disabled}>Récupérer</button>
                    </form>
                    <div className="linkContainer">
                        <Link className="simpleLink" to="/login">Déjà inscrit ? Connecte-toi !</Link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    );
};

export default ForgetPassword;