import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const parseJwt = async (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=${null}, expires=10`;
};

const setCookie = (name, value, expire) => {
  document.cookie = `${name}=${value}, expires=${new Date(
    expire
  ).toUTCString()}`;
};

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
