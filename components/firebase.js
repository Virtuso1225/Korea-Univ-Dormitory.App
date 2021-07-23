import firebase from 'firebase';
import config from '../firebase.json';
import 'firebase/firestore';
import { Alert } from 'react-native';

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

const Auth = app.auth();
const fs = firebase.firestore();

export const signin = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);

  if (!Auth.currentUser.emailVerified) {
    console.log(Auth.currentUser.emailVerified);
    Alert.alert('Signin Error', '메일을 인증하세요.');
    return {};
  }

  return user;
};

export const signup = async ({
  name,
  email,
  password,
  dorm,
  room,
  nickname,
}) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);

  console.log('dorm: ', dorm);

  const currentUser = {
    id: Auth.currentUser.uid,
    email: email,
    name: name,
    dorm: dorm,
    room: room,
    password: password,
    nickname: nickname,
    emailVerified: Auth.currentUser.emailVerified,
  };

  console.log(currentUser);

  fs.collection('users')
    .doc(currentUser.id)
    .set({
      name: currentUser.name,
      email: currentUser.email,
      dorm: currentUser.dorm,
      room: currentUser.room,
      password: currentUser.password,
    })
    .then(function () {
      console.log('firestore()DB 유저 추가 성공');
    })
    .catch(() => {
      console.error('firestore()DB 유저 추가 실패', error);
    });

  //이메일 인증
  let curUser = Auth.currentUser;

  curUser
    .sendEmailVerification()
    .then(function () {
      console.log('이메일 전송');
    })
    .catch('Email not sent!');

  return {};
};

export const getCurrentUser = () => {
  const { uid } = Auth.currentUser;
  console.log('uid: ', uid);
  var docRef = fs.collection('users').doc(uid);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());

        const name = doc.data()['name'];
        const email = doc.data()['email'];
        const dorm = doc.data()['dorm'];
        const room = doc.data()['room'];
        const password = doc.data()['password'];

        // console.log(dorm);
        console.log(name);
        // return { name, email, dorm, room, password};
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });

  // return { name, email, dorm, room, password};
  return {};
};

export const signout = async () => {
  await Auth.signOut();
  return {};
};
