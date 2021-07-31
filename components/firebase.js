import { useState } from 'react';
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
    name,
    dorm,
    room,
    nickname,
    emailVerified: Auth.currentUser.emailVerified,
  };

  fs.collection('users')
    .doc(currentUser.id)
    .set({
      name: currentUser.name,
      sid: currentUser.sid,
      dorm: currentUser.dorm,
      room: currentUser.room,
      nickname: currentUser.nickname,
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

export const comparePassword = async (password) => {
  let isDifferent = false;

  await firebase
    .auth()
    .signInWithEmailAndPassword(Auth.currentUser.email, password)
    .then(() => {
      isDifferent = false;
      console.log('password matched');
    })
    .catch((error) => {
      isDifferent = true;
      console.log('password no matched: ', error.message);
    });
  console.log('firebase is differ', isDifferent);
  return isDifferent;
};

export const getCurrentUser = async () => {
  let currentUserInfo = {
    name: '',
    email: '',
    dorm: '',
    room: '',
    password: '',
    sid: '',
    nickname: '',
  };
  const docRef = fs.collection('users').doc(Auth.currentUser.uid);

  await docRef.get().then((doc) => {
    currentUserInfo = doc.data();
  });

  return currentUserInfo;
};

export const getStudentInfo = async (sid) => {
  let studentInfo = {
    dorm: '',
    room: '',
    sid: '',
    nickname: '',
  };
  const docRef = fs.collection('studentList').where('sid', '==', sid);

  await docRef
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No documents found.');
      } else {
        querySnapshot.forEach((doc) => {
          studentInfo = doc.data();
        });
      }
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return studentInfo;
};

export const isExistNickname = async (nickname) => {
  let isExist = false;
  const docRef = fs.collection('users').where('nickname', '==', nickname);

  await docRef
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        isExist = false;
        console.log('No same nickname found.');
      } else {
        isExist = true;
        console.log('isnot중복', isExist);
      }
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return isExist;
};

// const uploadImage = async (uri) => {
//   if (uri.startsWith('https')) {
//     return uri;
//   }

//   const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function () {
//       reject(new TypeError('Network request failed'));
//     };
//     xhr.responseType = 'blob';
//     xhr.open('GET', uri, true);
//     xhr.send(null);
//   });

//   const user = Auth.currentUser;
//   const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
//   const snapshot = await ref.put(blob, { contentType: 'image/png' });
//   blob.close();

//   return await snapshot.ref.getDownloadURL();
// };

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
