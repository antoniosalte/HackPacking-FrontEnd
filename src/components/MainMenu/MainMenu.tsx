import {
  mediumScreen,
} from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

import { useSignOut } from "@sdk/react";
import * as React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import {
  OverlayContext,
  OverlayTheme,
  OverlayType
} from "..";
import {
  baseUrl,
} from "../../routes";
import { TypedMainMenuQuery } from "./queries";
import hamburgerImg from "../../images/hamburger.svg";
import logoImg from "../../images/hp-logo-svg.svg";

const MainMenu: React.FC = () => {
  const [signOut] = useSignOut();
  return (
    <OverlayContext.Consumer>
      {overlayContext => (
        <nav className="main-menu container" id="header">
          <div className="main-menu__left">
            <TypedMainMenuQuery renderOnError displayLoader={false}>
              {() => {
                const items = [
                  { id: "about", url: "/about", name: "About" },
                  { id: "why", url: "/why", name: "Why" },
                  { id: "how", url: "/how", name: "How" },
                  { id: "faq", url: "/faq", name: "FAQ" },
                  { id: "blog", url: "/blog", name: "Blog" },
                ]
                return (
                  <ul>
                    <Media
                      query={{ maxWidth: mediumScreen }}
                      render={() => (
                        <li
                          className="main-menu__hamburger"
                          onClick={() =>
                            overlayContext.show(
                              OverlayType.sideNav,
                              OverlayTheme.left,
                              { data: items }
                            )
                          }
                        >
                          <ReactSVG
                            path={hamburgerImg}
                            className={"main-menu__hamburger--icon"}
                          />
                          <ReactSVG
                            path={hamburgerImg}
                            className={"main-menu__hamburger--hover"}
                          />
                        </li>
                      )}
                    />
                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() =>
                        (
                          <>
                            <Link to={baseUrl} className="navbar-item">
                              <ReactSVG
                                svgStyle={{
                                  width: 174,
                                }}
                                path={logoImg} />
                            </Link>
                            <Link to="/about" className="navbar-item">
                              <p className="navbar-item-dk" >About</p>
                            </Link>
                            <Link to="/why" className="navbar-item">
                              <p className="navbar-item-dk" >Why</p>
                            </Link>
                            <Link to="/how" className="navbar-item">
                              <p className="navbar-item-dk" >How</p>
                            </Link>
                            <Link to="/faq" className="navbar-item">
                              <p className="navbar-item-dk" >FAQ</p>
                            </Link>
                            <Link to="/blog" className="navbar-item">
                              <p className="navbar-item-dk" >Blog</p>
                            </Link>
                          </>
                        )
                      }
                    />
                  </ul>
                );
              }}
            </TypedMainMenuQuery>
          </div>

          <Media
            query={{ maxWidth: mediumScreen }}
            render={() => (
              <div className="main-menu__center">
                <Link to={baseUrl}>
                  <ReactSVG
                    svgStyle={{
                      width: 174,
                    }}
                    path={logoImg} />
                </Link>
                </div> ) }
            />
            <div className="main-menu__right">
                <ul>
                  <li>
                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() =>
                        (
                          <Link to="/login" className="navbar-item">
                          <p className="navbar-item-dk" >SignIn</p>
                        </Link> )}
                    />
                  </li>
                  <li>
                    <Media
                        query={{ minWidth: mediumScreen }}
                        render={() =>
                          (
                            <Link to="/start" className="navbar-item">
                            <p className="startpack" >Start Packing</p>
                          </Link> )}
                      />
                    </li>
                </ul>
            </div>
        </nav>
      )}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
