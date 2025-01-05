export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email) {
    throw new Error('Email is required');
  }
  if (!re.test(email)) {
    throw new Error('Invalid email format');
  }
  return true;
};

export const validatePassword = (password) => {
  if (!password) {
    throw new Error('Password is required');
  }
  if (password?.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  return true;
};

export const validateName = (name) => {
  if (!name) {
    throw new Error('Name is required');
  }
  if (name.length < 3) {
    throw new Error('Name must be at least 3 characters long');
  }
  return true;
};

export const validateCode = (code) => {
  if (!code) {
    throw new Error('Code is required');
  }
  //check is 6 char of number
  if (!/^\d{6}$/.test(code)) {
    throw new Error('Code must be 6 digitals long');
  }
};
