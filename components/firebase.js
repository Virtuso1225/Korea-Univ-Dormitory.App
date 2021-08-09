import { useContext } from 'react';
import { Alert } from 'react-native';
import firebase from 'firebase';
import config from '../firebase.json';
import 'firebase/firestore';
import { UserContext } from './contexts';

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

const Auth = app.auth();
const fs = firebase.firestore();

export const signin = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  // const { setUser } = useContext(UserContext);

  if (!Auth.currentUser.emailVerified) {
    console.log(Auth.currentUser.emailVerified);
    Alert.alert('Signin Error', '메일을 인증하세요.');
    return {};
  }
  const docRef = fs.collection('users').doc(Auth.currentUser.uid);

  await docRef.get().then((doc) => {
    // setUser(doc.data());
    console.log(doc.data());
  });
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
  studentIndex,
}) => {
  await Auth.createUserWithEmailAndPassword(email, password);
  const currentUser = {
    id: Auth.currentUser.uid,
    studentIndex,
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
      index: currentUser.studentIndex,
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

export const findPassword = async (email) => {
  console.log(email);
  const result = [];
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log('Password reset email sent!');
      result.push(true);
    })
    .catch((error) => {
      console.log(error.code, error.message);
      result.push(false);
      result.push(error.code);
      result.push(error.message);
    });

  return result;
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
    dorm: '',
    room: '',
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
    name: '',
    index: '',
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

  console.log(studentInfo);

  return studentInfo;
};

export const getMyTemperature = async () => {
  const { uid } = Auth.currentUser;

  const collectionTempPath = `users/${uid}/tempInfo`;
};

export const getMyStayOut = async () => {
  const { uid } = Auth.currentUser;

  const collectionStayOutPath = `users/${uid}/stayOutInfo`;
};

export const getMyPenalty = async () => {
  const dateToString = (inputDate) => {
    const d = new Date(inputDate * 1000);
    const month = `${d.getMonth() + 1}`;
    const day = `${d.getDate()}`;

    return [month, day].join('/');
  };
  const { uid } = Auth.currentUser;

  const collectionPenaltyPath = `users/${uid}/penaltyInfo`;

  let penaltyObject = {
    points: 0,
    reason: '',
    date: '',
  };

  const penalty = [];

  await fs
    .collection(collectionPenaltyPath)
    .orderBy('timestamp', 'desc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        try {
          penaltyObject = doc.data();

          penaltyObject.date = dateToString(doc.data().timestamp);

          penalty.push(penaltyObject);
        } catch (error) {
          console.log('실패');
        }
      });
    });

  return penalty;
};

export const getNotice = async () => {
  const dateToString = (inputDate) => {
    const d = new Date(inputDate * 1000);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = `${d.getFullYear()}`;

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return [year, month, day].join('.');
  };

  const compareDate = (dueDate) => {
    const onlyDate = (date) => {
      const d = new Date(date);

      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = `${d.getFullYear()}`;

      if (month < 10) month = `0${month}`;
      if (day < 10) day = `0${day}`;

      return [year, month, day].join('');
    };

    let result = true;
    const t1 = new Date();
    const t2 = dueDate * 1000;

    if (onlyDate(t1.getTime()) < onlyDate(t2)) {
      result = false;
    } else {
      result = true;
    }
    return result;
  };

  let noticeObject = {
    title: '',
    content: '',
    date: '',
    afterDue: '',
    due: '',
    highlight: '',
  };

  const noticeBeforeDue = [];
  const noticeAfterDue = [];

  await fs
    .collection('notice')
    .orderBy('highlight', 'desc')
    .orderBy('date', 'desc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        try {
          noticeObject = doc.data();

          if (compareDate(noticeObject.date.seconds)) {
            noticeObject.date = dateToString(noticeObject.date.seconds);

            if (noticeObject.highlight) {
              noticeObject.highlight = 0;
            } else {
              noticeObject.highlight = 1;
            }

            if (noticeObject.due) {
              if (!compareDate(noticeObject.due.seconds)) {
                noticeObject.afterDue = 1;
              } else {
                noticeObject.afterDue = 0;
              }
              noticeObject.due = dateToString(noticeObject.due.seconds);
            } else {
              noticeObject.afterDue = 2;
              noticeObject.due = '9999.99.99';
            }

            if (noticeObject.afterDue === 0) {
              noticeAfterDue.push(noticeObject);
            } else {
              noticeBeforeDue.push(noticeObject);
            }
          }
        } catch (error) {
          console.log('실패');
        }
      });
    });

  return { noticeBeforeDue, noticeAfterDue };
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

export const updateDormInfo = async (dorm, room) => {
  const currentUser = {
    uid: Auth.currentUser.uid,
    dorm,
    room,
  };

  const docRef = fs.collection('users').doc(currentUser.uid);

  await docRef
    .update({
      dorm: currentUser.dorm,
      room: currentUser.room,
    })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
};

export const updateNicknameInfo = async (nickname) => {
  const currentUser = {
    uid: Auth.currentUser.uid,
    nickname,
  };

  const docRef = fs.collection('users').doc(currentUser.uid);

  await docRef
    .update({
      nickname: currentUser.nickname,
    })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
};

export const updatePasswordInfo = (password) => {
  const user = Auth.currentUser;

  user
    .updatePassword(password)
    .then(() => {
      console.log('Password successfully updated');
    })
    .catch((error) => {
      console.log('Password updating error: ', error);
    });
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

  const collectionPenaltyPath = `users/${uid}/penaltyInfo`;
  const collectionStayOutPath = `users/${uid}/stayOutInfo`;
  const collectionTempPath = `users/${uid}/tempInfo`;
  const docRef = fs.collection('users').doc(uid);

  await deleteCollection(fs, collectionPenaltyPath);
  await deleteCollection(fs, collectionStayOutPath);
  await deleteCollection(fs, collectionTempPath);

  await docRef.delete();

  user.delete();

  async function deleteCollection(db, collectionPath) {
    const collectionRef = db.collection(collectionPath);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, collectionRef, resolve).catch(reject);
    });
  }

  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      resolve();
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    setImmediate(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }
};
