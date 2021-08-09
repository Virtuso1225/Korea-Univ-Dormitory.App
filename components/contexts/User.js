import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: {
    uid: null,
  },
  profileInfo: {
    index: '',
    name: '',
    dorm: '',
    room: '',
    sid: '',
    nickname: '',
  },
  overnightDate: [],
  myTemperature: [],
  myPenalty: [],
  notice: [],

  setUser: () => {},
  setProfileInfo: () => {},
  setOvernightDate: () => {},
  setMyTemperature: () => {},
  setMyPenalty: () => {},
  setNotice: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({});
  const [profileInfo, setProfileInfo] = useState();
  const [overnightDate, setOvernightDate] = useState();
  const [myTemperature, setMyTemperature] = useState();
  const [myPenalty, setMyPenalty] = useState();
  const [notice, setNotice] = useState();
  const setUser = ({ uid }) => {
    setUserInfo({ uid });
  };
  const value = {
    user,
    setUser,
    profileInfo,
    setProfileInfo,
    overnightDate,
    setOvernightDate,
    myTemperature,
    setMyTemperature,
    myPenalty,
    setMyPenalty,
    notice,
    setNotice,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
