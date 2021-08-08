export const validateEmail = (email) => {
  const regex =
    /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
  return regex.test(email);
};

export const validateSid = (sid) => {
  const regex = /^20\d{8}$/;
  return regex.test(sid);
};

export const validateEmailDomain = (email) => {
  const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@korea.ac.kr$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
};

export const validateRoom = (room) => {
  const regex = /^\d{3}-[1-3]{1}$/;
  return regex.test(room);
};

export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, '');
};

export const dorms = (index) => {
  const dormsList = [
    '학생동(구관-남자동)',
    '학생동(구관-여자동)',
    '프런티어관(신관-남자동)',
    '프런티어관(신관-여자동)',
  ];

  return dormsList[index];
};
