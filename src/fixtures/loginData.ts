export const validLogin = {
  username: 'standard_user',
  password: 'secret_sauce'
};

export const invalidLogins = [
  {
    description: 'invalid password',
    username: 'standard_user',
    password: 'wrong_password',
    expectedError: 'Username and password do not match'
  },
  {
    description: 'invalid username',
    username: 'invalid_user',
    password: 'secret_sauce',
    expectedError: 'Username and password do not match'
  },
  {
    description: 'blank credentials',
    username: '',
    password: '',
    expectedError: 'Username is required'
  }
];