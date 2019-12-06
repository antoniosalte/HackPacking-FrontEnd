import "./scss/index.scss";

import React, { useContext, useState } from "react";
import { Redirect } from "react-router";

import { useUserDetails } from "@sdk/react";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";

import { baseUrl as checkoutUrl } from "../../checkout/routes";

import ResetPasswordForm from "./ResetPasswordForm";
import SignInForm from "./SignInForm";
import Footer from "../../views/Home/Footer";

const CheckoutLogin: React.FC<{}> = () => {
  const [resetPassword, setResetPassword] = useState(false);
  const { data: user } = useUserDetails();
  if (user) {
    return <Redirect to={checkoutUrl} />;
  }
  return (
    <>
    <div style={{ backgroundColor: "#e5e5e5"}}>
      <Online>
        <div className="checkout-login">
          <div className="checkout-login__user">
            {resetPassword ? (
              <ResetPasswordForm
                onClick={() => {
                  setResetPassword(false);
                }}
              />
            ) : (
              <SignInForm
                onClick={() => {
                  setResetPassword(true);
                }}
              />
            )}
          </div>
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
    <Footer />
    </>
  );
};

export default CheckoutLogin;
