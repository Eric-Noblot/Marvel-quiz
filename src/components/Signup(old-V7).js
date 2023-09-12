import {useState, useContext} from 'react';
import {FirebaseContext} from "./Firebase"

const Signup = () => {

    const firebase = useContext(FirebaseContext) //grace a useContext, on peut récupérer toutes les méthodes de la class qu'on a configuré dans firebase et enveloppé dans index.js avec <FirebaseContext.Provider value={new Firebase()}>/ Ensuite dans form crée une fonction handleSubmit dans laquelle on va chercher l'objet firebase.lamethode qu'on veut executer ATTENTION METHODE ASYNCHRONE 

    const data = {
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.id] : e.target.value}) //ici on récupère le contenu de loginData, dans lequel on va modifier les objets selon la target. voir à la fin pour explications
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.signupUser(loginData.email, loginData.password)
        .then(() => {
            setLoginData({...data}) //ci on récupére le contenu de loginData qu'on ECRASE et REMPLACE par data, qui est le state initial de notre état (chaine de caractere vide). Car pour la const signUp, nous ne voulons dans l'objet loginData que l'email et le password
        })
        .then(user => console.log("sans erreur"))
        .catch(error => {
            console.log("dans error")
            setError(error)
            setLoginData({...data}) //dans le cas d'une erreur, on efface les valeurs qui se trouvent dans le State
        })

    }

    const {pseudo, email, password, confirmPassword} = loginData

    const btn = pseudo === "" || email === "" || password === "" || password !== confirmPassword 
    ? <button disabled>Inscription</button> : <button>Inscription</button>

    //gestion des erreurs 
    const errorMsg = error !== "" && <span>{error.message}</span> //si error Msg n'est pas à blanc, alors on ajoute un message. sinon notre errorMsg s'arretera ave le &&



return (
    <div className="signUpLoginBox">
        <div className="slContainer">
            <div className="formBoxLeftSignup">

            </div>
            <div className="formBoxRight">
                <div className ="formContent">
                    <form onSubmit={handleSubmit}>
                        {errorMsg}
                        <h2>Inscription</h2>
                        <div className ="inputBox">
                            <input onChange={handleChange} value ={pseudo} type="text" id="pseudo" autoComplete="off" required/>  {/* autoComplete="off" permet d'éviter les suggestion de Google sur les mots déjà tapés */}
                            <label htmlFor="pseudo">Pseudo</label>
                        </div>
                        <div className ="inputBox">
                            <input onChange={handleChange} value ={email} type="email" id="email" autoComplete="off" required/>  {/* autoComplete="off" permet d'éviter les suggestion de Google sur les mots déjà tapés */}
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className ="inputBox">
                            <input onChange={handleChange} value ={password} type="password" id="password" autoComplete="off" required/>  {/* autoComplete="off" permet d'éviter les suggestion de Google sur les mots déjà tapés */}
                            <label htmlFor="password">Mot de passe</label>
                        </div>
                        <div className ="inputBox">
                            <input onChange={handleChange} value ={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required/>  {/* autoComplete="off" permet d'éviter les suggestion de Google sur les mots déjà tapés */}
                            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        </div>
                        {btn}
                    </form>
                </div>
            </div>
        </div>
    </div>
)}

export default Signup;

//Si on veut créer une variable à la place d'une valeur d'entrée dans un objet, on doit le placer entre []

//Exemple : 

// const dynamicData = "age"
// const user = {
//     name: "Toto",
//     [dynamicData]:25
// }
// console log(user) : 
// Object {
//     name: "Toto",
//     age: 25
// }
