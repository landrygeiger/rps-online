import firebase from "firebase/app"
import config from "./config"
import "firebase/auth"

const app = firebase.initializeApp(config);

export const auth = app.auth();
export default app;