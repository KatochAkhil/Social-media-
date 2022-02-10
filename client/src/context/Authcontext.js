import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./Authreducer";

const INITIAL_STATE = {
  // user: {
  //   _id: "62056d0556e2dbf8b12fca51",
  //   userName: "Second user",
  //   email: "test@testagain.com",
  //   profileImage: "./images/person.jpg",
  //   coverImage: "./images/person.jpg",
  //   isAdmin: false,
  // },
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
