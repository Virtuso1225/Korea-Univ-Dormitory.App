import { Alert } from 'react-native';
import firebase from 'firebase';
import config from '../firebase.json';
import 'firebase/firestore';

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
  sid,
  email,
  password,
  dorm,
  room,
  nickname,
}) => {
  await Auth.createUserWithEmailAndPassword(email, password);
  const currentUser = {
    id: Auth.currentUser.uid,
    sid,
    email,
    name,
    dorm,
    room,
    password,
    nickname,
    emailVerified: Auth.currentUser.emailVerified,
  };

  fs.collection('users')
    .doc(currentUser.id)
    .set({
      name: currentUser.name,
      sid: currentUser.sid,
      email: currentUser.email,
      dorm: currentUser.dorm,
      room: currentUser.room,
      password: currentUser.password,
    })
    .then(() => {
      console.log('firestore()DB 유저 추가 성공');
    })
    .catch((error) => {
      console.error('firestore()DB 유저 추가 실패', error);
    });

  const curUser = Auth.currentUser;

  curUser
    .sendEmailVerification()
    .then(() => {
      console.log('이메일 전송');
    })
    .catch('Email not sent!');

  return {};
};

export const getCurrentUser = () => {
  const { uid } = Auth.currentUser;
  console.log('uid: ', uid);
  const docRef = fs.collection('users').doc(uid);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());

        const { name } = doc.data();
        // const { email } = doc.data();
        // const { dorm } = doc.data();
        // const { room } = doc.data();
        // const { password } = doc.data();

        // console.log(dorm);
        console.log(name);
        // return { name, email, dorm, room, password};
        return doc.data();
      }
      // doc.data() will be undefined in this case
      return console.log('No such document!');
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });

  // return { name, email, dorm, room, password};
  return {};
};

export const signout = () => {
  Auth.signOut();
  return console.log('로그아웃');
};

export const deactivate = async () => {
  const user = Auth.currentUser;
  const { uid } = Auth.currentUser;
  const docRef = fs.collection('users').doc(uid);

  await docRef.delete();
  user.delete();
};
