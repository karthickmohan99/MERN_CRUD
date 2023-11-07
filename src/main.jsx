import React from "react";
import axios from "axios";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Token from "./TokenService/Token.jsx";

axios.create({
  baseURL: `${import.meta.env.VITE_baseURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((request) => {
  console.log(request, "request from interceptor");
  const accessToken = Token.getAccessToken();
  request.headers = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };

  return request;
});

axios.interceptors.response.use(
  (response) => {
    console.log(response, "response from interceptor");
    return response;
  },

  async (error) => {
    const originalConfig = error.config;
    console.log(error, "error from interceptor");
    //email does not match error
    if (error.response.status === 400) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      console.log(error.response.data.error);
      if (
        error.response.data.error === "Unauthorized! Access Token was expired!"
      ) {
        originalConfig._retry = true;
        try {
          const refreshToken = Token.getRefreshToken();
          console.log(refreshToken, "refresh-token");
          const res = await axios.post(
            `${import.meta.env.VITE_baseURL}/auth/refresh`,
            { refreshToken: refreshToken }
          );

          console.log(res.data.token, "res from refresh api");
          Token.updatedTokenService(res.data.token);
          const new_acessToken = Token.getAccessToken();
          console.log(new_acessToken, "new_acessToken");
          axios.defaults.headers.common["x-access-token"] = new_acessToken;
          return axios(originalConfig);
        } catch (err) {
          console.log(err, "err from refresh api");
          return Promise.reject(err);
          error;
        }
      }
      if (
        error.response.status === 401 &&
        error.response.data.error === "Invalid refresh token Login again"
      ) {
        console.log("-----------Token Removed--------------");
        Token.removeAccessToken();
        Token.removeRefreshToken();
        window.location.reload();
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
