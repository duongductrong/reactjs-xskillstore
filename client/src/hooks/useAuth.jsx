import Axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import config from "../pages/ManagermentSite/config/config";
import withAuth from "./withAuth";

export const GET_USER = "GET_USER";

const initialState = {
  userInfo: {},

  isLoggedIn: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_USER:
      state = { ...state, isLoggedIn: true, userInfo: payload };
      break;
  }

  return state;
};

export const AuthContext = React.createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoggedIn, userInfo } = state;

  const getUser = () => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}/api/logined`,
      ...config,
    }).then((response) => {
      const { data } = response;
      const { code, info } = data;

      // If the user was logged in page, to redirect home
      if (code === 200) {
        dispatch({ type: GET_USER, payload: info });
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, isLoggedIn, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const { userInfo, isLoggedIn } = useContext(AuthContext);

  return {
    auth: userInfo,
    isLoggedIn,
  };
}

export { withAuth };

export default useAuth;
