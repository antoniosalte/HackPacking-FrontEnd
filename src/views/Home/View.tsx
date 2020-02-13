import "./scss/index.scss";

import * as React from "react";

import Page from "./Page";
import { useUserDetails } from "@sdk/react";

const View: React.FC = props => {
  const { data: user } = useUserDetails();
  return (
    <div className="home-page">
      <Page loading={false} user={user} />
    </div>
  );
};

export default View;
