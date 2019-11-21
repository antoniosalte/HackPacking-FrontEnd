import "./scss/index.scss";

import * as React from "react";

import Page from "./Page";

const View: React.FC = () => (
  <div className="home-page">
    <Page
      loading={ false }
    />
  </div>
);

export default View;
