export const loginAction = (user, token) => {
  return {
    type: "LOGIN",
    payload: { user, token },
  };
};
export const signUpAction = (user, token) => {
  return {
    type: "SIGNUP",
    payload: { user, token },
  };
};
export const updateUser = (user) => {
  return {
    type: "UPDATE",
    payload: user,
  };
};
export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
