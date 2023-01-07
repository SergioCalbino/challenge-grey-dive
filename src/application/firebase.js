import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAQ8azfpuRxE2Yq79JHXSxXO_Q9RcAZtJ8",
    authDomain: "challenge-grey-dive.firebaseapp.com",
    projectId: "challenge-grey-dive",
    storageBucket: "challenge-grey-dive.appspot.com",
    messagingSenderId: "315173892914",
    appId: "1:315173892914:web:33f191ac33d384db1b9d2b"
  };

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(firebaseApp);

// Si descomentas la siguiente línea, cuando mientras que el usuario no se desloguee expresamente o cierre el navegador, permanecerá logueado y podremos acceder a su id desde cualquier página
setPersistence(auth, browserLocalPersistence);