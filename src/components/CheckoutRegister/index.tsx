import "./scss/index.scss";

import React, { useContext, useState } from "react";
import { Redirect } from "react-router";

import { useUserDetails } from "@sdk/react";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";

import { baseUrl as checkoutUrl } from "../../checkout/routes";
import Footer from "../../views/Home/Footer";
import SignInForm from "./SignInForm";

const CheckoutRegister: React.FC<{}> = () => {
  const [resetPassword, setResetPassword] = useState(false);
  const overlay = useContext(OverlayContext);
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
              <SignInForm />
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

export default CheckoutRegister;
