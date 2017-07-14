export const signup = ( email, password) => ({
  type: 'SIGNUP_REQUESTED',
  payload: {
    email,
    password,
  }
})