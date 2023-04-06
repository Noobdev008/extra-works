import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInView from "./view";

const defaultState = {
  open: true
};

const SignIn = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const handleFieldChange = (e) => {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    setState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };
  const handleLogin = async () => {
    sessionStorage.setItem("isLoggedIn", true);
    localStorage.setItem("access-token", "dasd34d5asd6");
    //navigate(`/dashboard`);
    window.location.replace(`/dashboard`);
  };
  return (
    <SignInView
      email={state.email}
      password={state.password}
      handleFieldChange={handleFieldChange}
      handleLogin={handleLogin}
    />
  );
};

export default SignIn;
