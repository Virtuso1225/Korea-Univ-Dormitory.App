import * as firebase from 'firebase';
import config from '../firebase.json';
import 'firebase/firestore';


const app = firebase.initializeApp(config);

const Auth = app.auth()

export const signin = async({email, password }) => {
    const {user} = await Auth.signInWithEmailAndPassword(email, password);
    return user;
}
