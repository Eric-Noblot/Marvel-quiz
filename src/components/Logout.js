import {useState, useEffect} from 'react';
import {signOut} from "firebase/auth"
import {auth} from "./Firebase/firebaseConfig"
import {useNavigate} from "react-router-dom"

const Logout = () => {

    const [checked, setChecked] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        if (checked === true) {
            signOut(auth).then(() => {
                setTimeout(() => { //on rajoute un setTimeOut car sinon quand l'utilisateur cliquer sur deconnexion il n'a pas le temps de voir le bouton passer en rouge et est redirigé instantanément vers la page d'accueil. On ajoute donc 1 seconde de délai
                    navigate("/")
                },1000)
            }).catch((error) => {
                console.log("erreur déconnexion", error)
            })
        }

    },[checked])

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return (
        <div className ="logoutContainer">
            <label className="switch">
                <input type ="checkbox" checked={checked} onChange={handleChange}/>
            
            <span className="slider round"></span>
            </label>
        </div>
    );
};

export default Logout;