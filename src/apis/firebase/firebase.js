// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/**
 * @todo: Replace the firebaseConfig with the actual config
 */
const firebaseConfig = {
  apiKey: "AIzaSyC_73gBdxNX0U0l-PXPiv7zNcGW_OaTg4Q",
  authDomain: "lottery-9d331.firebaseapp.com",
  projectId: "lottery-9d331",
  storageBucket: "lottery-9d331.appspot.com",
  messagingSenderId: "675011263842",
  appId: "1:675011263842:web:9e9fc97d0cb93d49ed803b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const getTemporaryAuth = () => {
  const tempApp = initializeApp(firebaseConfig, "temp");
  return getAuth(tempApp);
}

export { firestore, auth, getTemporaryAuth, storage };
