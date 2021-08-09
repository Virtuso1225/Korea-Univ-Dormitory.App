import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: {
    uid: null,
  },
  profileInfo: {
    name: '',
    dorm: '',
    room: '',
    sid: '',
    nickname: '',
  },
  overnightDate: {
    startDate: '',
    endDate: '',
  },
  setUser: () => {},
  setProfileInfo: () => {},
  setOvernightDate: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({});
  const [profileInfo, setProfileInfo] = useState();
  const [overnightDate, setOvernightDate] = useState();
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
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
