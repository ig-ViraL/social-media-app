import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  deleteCookie,
  getCookie,
  parseJwt,
  setCookie,
} from "../store/apis/utils";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ token: getCookie("BeViral") });
  const token = auth.token || null;

  const removeAuth = () => {
    deleteCookie("BeViral");
    setAuth({ token: null });
  };

  const addAuth = async (token) => {
    const tokenData = await parseJwt(token);
    setCookie("BeViral", token, tokenData.exp);
    setAuth({ token: token });
  };

  const values = {
    token: token,
    setAuth: addAuth,
    deleteAuth: removeAuth,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.element,
};
