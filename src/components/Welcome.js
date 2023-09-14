//Welcome est sensé être le composant qui affiche la page de bienvenue quand un utilisateur est connecté.
//On va devoir donc sécuriser cette page afin qu'aucun utilisateur ne puisse avoir accès à ce composant s'il n'est pas connecté(par ex si on tape directement /welcome dans l'URL on pourrait logiquement y avoir accès sans passer par la connexion)
//Comme il n'y a que ce composant à sécuriser/vérifier dans notre application, c'est ici qu'on va gérer le cas. 
//mais si il y avait plusieurs composants qui devaient être interaction avec le fait d'etre connecté ou non, il vaudrait mieux passer le systeme de getion directement dans le parent App pour que tous les enfants y aient accès
import {useState, useEffect} from 'react';
import Logout from "./Logout"
import Quiz from "./Quiz"
import { onAuthStateChanged } from 'firebase/auth'; //cette méthode fournie par firebase est un listener, qui va écouter si la personne est connectée ou non à chaque chargement de la page, 
import {auth, user} from "./Firebase/firebaseConfig"
import {useNavigate} from "react-router-dom"
import { getDoc } from "firebase/firestore"

const Welcome = () => {

    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            // console.log("user", user)
            user ? setUserSession(user) : navigate("/")
        })

        if (userSession !== null) {
            const collectionRef = user(userSession.uid)
            getDoc(collectionRef)
            .then((userObject) => { //getDoc nous permet ensuite d'acceder à la méthode exists
                if (userObject.exists()) {
                    // console.log("snapshotData", userObject.data())
                    const docData = userObject.data()
                    setUserData(docData)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },[userSession]) //au debut du chargement useSession est null, on va donc le mettre dans la dependance pour qu'une fois que la connexion a été faite, ca redécenche le useEffect qui cette fois ci alimente setUserData


    return userSession === null ? (
        <>
            <div className="loader"></div>
            <p className ="loaderText">Loading...</p>
        </>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>)   
};

export default Welcome;