import axios from "axios";

export const loginCall = async (userDetails, dispatch) => {
  dispatch({ type: "LOGIN" });
  try {
    const res = await axios.post("/auth/login", userDetails);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FALIURE", payload:err });

    console.log(err);
  }
};
