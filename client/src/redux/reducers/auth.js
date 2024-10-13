const authReducer = (state = { auth: null }, action) => {
  switch (action.type) {
    case "REGISTER":
      console.log("REGISTER action.payload:", action.payload); // kontrol etmek için
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return { ...state, auth: action.payload };

    case "LOGIN":
      console.log("LOGIN action.payload:", action.payload); // kontrol etmek için
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return { ...state, auth: action.payload };

    case "LOGOUT":
      localStorage.clear();
      return { ...state, auth: null };

    default:
      return state;
  }
};

export default authReducer;
