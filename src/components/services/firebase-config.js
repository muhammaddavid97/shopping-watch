// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz57O7MV4BSNpmhn2CPPBpzDkQtqkVDiU",
  authDomain: "auth-goggle-react.firebaseapp.com",
  projectId: "auth-goggle-react",
  storageBucket: "auth-goggle-react.appspot.com",
  messagingSenderId: "172905149670",
  appId: "1:172905149670:web:9f0fbec50ee906f1f3f727"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const registerUser = async (username, email, password) => {
  try{
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await setDoc(doc(db, "users", user.uid), {
      id:user.uid,
      username: username,
      email: user.email,
      token:user.accessToken
   });
  }catch(err){
    console.log(err);
    alert(err.message);
  }
}

export {registerUser};
