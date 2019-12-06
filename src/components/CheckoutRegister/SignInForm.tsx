import React from "react";
import RegisterForm from "../OverlayManager/Login/RegisterForm";

const SignInForm: React.FC<{}> = () => (
  <>
    <h3 className="checkout__header">Sign Up</h3>
    <RegisterForm hide={ () =>{} }/>
  </>
);

export default SignInForm;
