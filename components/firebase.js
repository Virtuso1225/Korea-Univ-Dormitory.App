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
  index,
}) => {
  await Auth.createUserWithEmailAndPassword(email, password);

  const currentUser = {
    id: Auth.currentUser.uid,
    sid,
    name,
    dorm,
    room,
    nickname,
    index,
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
      index: currentUser.index,
      profileImage: 1,
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

export const photoUpdate = async (index) => {
  const docRef = fs.collection('users').doc(Auth.currentUser.uid);
  await docRef
    .update({
      profileImage: index,
    })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
  return index;
};

export const findPassword = async (email) => {
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
  const currentUserInfo = {
    name: '',
    dorm: '',
    room: '',
    sid: '',
    nickname: '',
    profileImage: '',
  };
  const docRef = fs.collection('users').doc(Auth.currentUser.uid);

  await docRef.get().then((doc) => {
    currentUserInfo.name = doc.data().name;
    currentUserInfo.dorm = doc.data().dorm;
    currentUserInfo.room = doc.data().room;
    currentUserInfo.nickname = doc.data().nickname;
    currentUserInfo.profileImage = doc.data().profileImage;
    currentUserInfo.sid = doc.data().sid;
  });

  return currentUserInfo;
};

export const getStudentInfo = async (sid) => {
  const studentInfo = {
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
          studentInfo.dorm = doc.data().dorm;
          studentInfo.room = doc.data().room;
          studentInfo.name = doc.data().name;
          studentInfo.sid = doc.data().sid;
          studentInfo.index = doc.data().index;
        });
      }
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return studentInfo;
};

export const setMyTemperature = async (myTemperature) => {
  const onlyDate = (date) => {
    const d = new Date(date);

    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = `${d.getFullYear()}`;

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return [year, month, day].join('');
  };

  const now = new Date();
  const { uid } = Auth.currentUser;
  const collectionTempPath = `users/${uid}/tempInfo`;
  await fs
    .collection(collectionTempPath)
    .doc(onlyDate(now.getTime()))
    .set({
      temperature: myTemperature * 1,
      timestamp: now,
    })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};
export const setMyStayOut = async (startD, endD) => {
  const { uid } = Auth.currentUser;
  const onlyDate = (date) => {
    const d = new Date(date);

    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = `${d.getFullYear()}`;

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return [year, month, day].join('');
  };

  const dateToTimestamp = (inputDate) => {
    const array = inputDate.split('-');
    const month = array[1] * 1;
    const day = array[2] * 1;
    const year = array[0] * 1;

    const timestamp = new Date(year, month - 1, day);

    return timestamp;
  };

  const collectionStayOutPath = `users/${uid}/stayOutInfo`;
  const docRef = fs.collection(collectionStayOutPath);
  const now = new Date();

  const addNewStayOut = async () => {
    await docRef
      .doc(onlyDate(startD))
      .set({
        startDate: dateToTimestamp(startD),
        endDate: dateToTimestamp(endD),
        submitDate: now,
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  const updateStayOut = async (myStayOut) => {
    await docRef
      .doc(onlyDate(myStayOut.startDate))
      .update({
        endDate: dateToTimestamp(endD),
        submitDate: now,
      })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };

  let err = 0;
  if (dateToTimestamp(startD) > dateToTimestamp(endD)) {
    err = 3;
  } else {
    const myStayOut = await getMyStayOutTimestamp();

    if (myStayOut.startDate === '') {
      if (
        dateToTimestamp(startD) <
        new Date(now.getFullYear(), now.getMonth(), now.getDate())
      ) {
        err = 1;
      } else {
        await addNewStayOut();
      }
    } else if (
      myStayOut.startDate <
      new Date(now.getFullYear(), now.getMonth(), now.getDate())
    ) {
      if (dateToTimestamp(startD).getTime() !== myStayOut.startDate.getTime()) {
        err = 2;
      } else {
        await updateStayOut(myStayOut);
      }
    } else if (
      dateToTimestamp(startD) <
      new Date(now.getFullYear(), now.getMonth(), now.getDate())
    ) {
      err = 1;
    } else {
      Promise.all([
        docRef
          .doc(onlyDate(myStayOut.startDate))
          .delete()
          .then(() => {
            console.log('Document successfully deleted!');
          })
          .catch((error) => {
            console.error('Error removing document: ', error);
          }),
        addNewStayOut(),
      ]);
    }
  }

  return err;
};
export const getMyTemperature = async () => {
  const { uid } = Auth.currentUser;
  const dateToString = (inputDate) => {
    const d = new Date(inputDate * 1000);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = `${d.getFullYear()}`;

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return [year, month, day].join('-');
  };

  const collectionTempPath = `users/${uid}/tempInfo`;

  const temp = {};

  let date = '';
  let temperature = 0;

  await fs
    .collection(collectionTempPath)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        try {
          date = dateToString(doc.data().timestamp.seconds);
          temperature = doc.data().temperature;

          temp[date] = temperature;
        } catch (error) {
          console.log('체온 불러오기 실패');
        }
      });
    });

  return temp;
};

export const getMyStayOutTimestamp = async () => {
  const { uid } = Auth.currentUser;
  const collectionStayOutPath = `users/${uid}/stayOutInfo`;
  const toTimestamp = (inputDate) => {
    const output = new Date(inputDate * 1000);
    return output;
  };
  const stayOut = {
    startDate: '',
    endDate: '',
  };

  const now = new Date();
  await fs
    .collection(collectionStayOutPath)
    .where(
      'endDate',
      '>=',
      new Date(now.getFullYear(), now.getMonth(), now.getDate())
    )
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        try {
          if (doc.data().length !== 0) {
            stayOut.endDate = toTimestamp(doc.data().endDate.seconds);
            stayOut.startDate = toTimestamp(doc.data().startDate.seconds);
          }
        } catch (error) {
          console.log('외박 기록 불러오기 실패');
        }
      });
    });
  return stayOut;
};

export const getMyStayOut = async () => {
  const { uid } = Auth.currentUser;

  const dateToString = (inputDate) => {
    const d = new Date(inputDate * 1000);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = `${d.getFullYear()}`;

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return [year, month, day].join('-');
  };

  const collectionStayOutPath = `users/${uid}/stayOutInfo`;

  const stayOut = {
    startDate: '',
    endDate: '',
  };

  const now = new Date();

  await fs
    .collection(collectionStayOutPath)
    .where(
      'endDate',
      '>=',
      new Date(now.getFullYear(), now.getMonth(), now.getDate())
    )
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        try {
          if (doc.data().length !== 0) {
            stayOut.endDate = dateToString(doc.data().endDate.seconds);
            stayOut.startDate = dateToString(doc.data().startDate.seconds);
          }
        } catch (error) {
          console.log('외박 기록 불러오기 실패');
        }
      });
    });

  return stayOut;
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

  let penaltyObject = {};
  let idx = 0;

  const penalty = [];

  await fs
    .collection(collectionPenaltyPath)
    .orderBy('timestamp', 'desc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        try {
          penaltyObject = {
            index: idx,
            points: doc.data().points,
            reason: doc.data().reason,
            date: dateToString(doc.data().timestamp),
          };
          penalty.push(penaltyObject);
          idx += 1;
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
    id: 0,
    isChecked: false,
  };

  const noticeBeforeDue = [];
  const noticeAfterDue = [];
  let cntBefore = 0;
  let cntAfter = 0;

  await fs
    .collection('notice')
    .orderBy('highlight', 'desc')
    .orderBy('date', 'desc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        try {
          noticeObject = doc.data();

          noticeObject.date = dateToString(noticeObject.date.seconds);

          if (noticeObject.highlight) {
            noticeObject.highlight = 1;
          } else {
            noticeObject.highlight = 0;
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
          noticeObject.isChecked = false;

          if (noticeObject.afterDue === 0) {
            noticeObject.id = cntAfter;
            cntAfter += 1;
            noticeAfterDue.push(noticeObject);
          } else {
            noticeObject.id = cntBefore;
            cntBefore += 1;
            noticeBeforeDue.push(noticeObject);
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
