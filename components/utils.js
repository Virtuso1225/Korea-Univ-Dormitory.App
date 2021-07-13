export const validateEmail = (email) => {
  const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
  return regex.test(email);
};

export const validateEmailDomain = (email) => {
  const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@korea.ac.kr$/;
  return regex.test(email);
};

export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, '');
};
