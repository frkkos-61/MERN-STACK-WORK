import axios from "axios";
import { toast } from "react-toastify";

export const registerAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5454/register",
      authData
    );

    console.log("Register response data:", data); // API yanıtını kontrol et

    dispatch({ type: "REGISTER", payload: data });

    window.location = "/";
  } catch (error) {
    console.error("Register error:", error.response.data.msg); // Hata mesajını kontrol et
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

export const loginAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5454/login", authData);

    console.log("Login response data:", data); // API yanıtını kontrol et

    dispatch({ type: "LOGIN", payload: data });

    window.location = "/";
  } catch (error) {
    console.error("Login error:", error.response.data.msg); // Hata mesajını kontrol et
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
};
