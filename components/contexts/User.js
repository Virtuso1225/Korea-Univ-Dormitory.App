import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: {
    uid: null,
  },
  profileInfo: {
    name: '',
    email: '',
    dorm: '',
    room: '',
    sid: '',
    nickname: '',
  },
  setUser: () => {},
  setProfileInfo: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({});
  const [profileInfo, setProfileInfo] = useState();
  const setUser = ({ uid }) => {
    setUserInfo({ uid });
  };
  const value = { user, setUser, profileInfo, setProfileInfo };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
