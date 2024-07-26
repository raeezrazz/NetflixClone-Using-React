import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,signOut} from "firebase/auth"
import {addDoc , collection , getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC_EdPQvKQSxOue4oaUCsIkiYOrFw93O34",
  authDomain: "react-clone-b61b1.firebaseapp.com",
  projectId: "react-clone-b61b1",
  storageBucket: "react-clone-b61b1.appspot.com",
  messagingSenderId: "1029991751947",
  appId: "1:1029991751947:web:a4bdfc0354a1edfd4b420e",
  measurementId: "G-4HBLPZBHQ5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(); 
const analytics = getAnalytics(app);
const db = getFirestore();

const signUp =async (name,email , password)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth ,email,password);
        const user =response.user;

        await addDoc(collection(db,"users"),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        })

    } catch (error) {
        console.log(error.message)
        toast(error.code.split('/')[1].split('-').join(' '))

    }
}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);

    } catch (error) {
        console.log(error.message)
        toast(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout =()=>{
    signOut(auth)
    console.log('successfuly logout')
}


export {auth,logout,db,signUp,login}
