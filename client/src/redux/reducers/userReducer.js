// const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "SIGNUP":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};
