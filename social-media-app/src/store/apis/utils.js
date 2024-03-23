import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import config from "../../config";

export const baseQuery = () => {
  return fetchBaseQuery({
    baseUrl: config.baseURL,
    prepareHeaders: (headers) => {
      const token = getCookie("BeViral")
        ? getCookie("BeViral").split(", ")[0]
        : false;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
      return headers;
    },
  });
};

export const parseJwt = async (token) => {
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

export const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=${null}, expires=10`;
};

export const setCookie = (name, value, expire) => {
  document.cookie = `${name}=${value}, expires=${new Date(
    expire
  ).toUTCString()}`;
};

export const queryParamsBuilder = (query) => {
  if (typeof query !== "object") {
    return "";
  }
  const keys = Object.keys(query).filter(
    (b) => query[b] !== null && query[b] !== ""
  );
  if (keys.length) {
    return (
      "?" +
      new URLSearchParams(
        keys.reduce((a, b) => {
          a[b] = query[b];
          return a;
        }, {})
      ).toString()
    );
  }
  return "";
};
