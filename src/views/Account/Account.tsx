import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { useUserDetails } from "@sdk/react";

import "./scss/index.scss";

import {
  baseUrl,
} from "../../routes";

import { AccountTab, OrdersHistory } from "@components/views";
import {  Loader } from "../../components";
import Footer from "../Home/Footer"

const Account: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { data: user, loading } = useUserDetails();
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    history.push(baseUrl);
  }
  return (
    <div style={{backgroundColor:"#E5E5E5"}}>
      <div className="container" >
        <div className="account">
          <div className="account__content">
            <br/>
            <br/>
            <h4
              style={{
                fontWeight: 600,
                fontSize: 22,
              }}
            >My Account</h4>
            <br/>
            <br/>
            <br/>
            <OrdersHistory {...{ history }} />
            <AccountTab />
          </div>
        </div>
      </div>
      <Footer user/>
    </div>
  );
};

export default withRouter(Account);
