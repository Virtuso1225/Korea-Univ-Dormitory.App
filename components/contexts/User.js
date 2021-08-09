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
  temperature: [],
  setUser: () => {},
  setProfileInfo: () => {},
  setOvernightDate: () => {},
  setTemperature: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({});
  const [profileInfo, setProfileInfo] = useState();
  const [overnightDate, setOvernightDate] = useState();
  const [temperature, setTemperature] = useState();
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
    temperature,
    setTemperature,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
