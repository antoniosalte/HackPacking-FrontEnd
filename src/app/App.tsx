import "../globalStyles/scss/index.scss";

import React from "react";
import { RouteComponentProps } from "react-router";

import { MainMenu, MetaConsumer, OverlayManager } from "../components";
import { Routes } from "../routes";

const App: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname },
  },
}) => {
  return (
    <>
      <MetaConsumer />
      <header>
        <MainMenu />
      </header>
      <Routes />
      <OverlayManager />
    </>
  );
};

export default App;
