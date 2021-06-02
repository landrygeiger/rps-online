import firebase from "firebase/app"
import config from "./config"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const db = firebase.firestore();

export default app;