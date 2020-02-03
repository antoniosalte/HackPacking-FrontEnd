import {
  mediumScreen,
} from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";
import { useSignOut } from "@sdk/react";
import * as React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { Trans } from "@lingui/react";

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
import iconuser from "../../images/hp-iconuser.png";
import Modal from "../../components/Modal";
import LoginForm from "../LoginForm";
import RegisterForm from "../OverlayManager/Login/RegisterForm";
import { useUserDetails } from "@sdk/react";
import {
  MenuDropdown,
  Offline,
  Online,
} from "..";
import {
  accountUrl,
} from "../../routes";

const MainMenu: React.FC = () => {
  const [signOut] = useSignOut();
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [ SignIn,setSignIn]=React.useState(false);
  const { data: user } = useUserDetails();
  return (
    <OverlayContext.Consumer>
      {overlayContext => 
      {
      return(
        <nav className="main-menu" id="header">
          <div className="main-menu__left">
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
                              { data: [
                                { id: "start", url: "/start", name: "Start Packing" },
                                { id: "about", url: "/about", name: "About" },
                                { id: "why", url: "/why", name: "Why" },
                                { id: "how", url: "/how", name: "How" },
                                { id: "faq", url: "/faq", name: "FAQ" },
                              ] }
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
                        </li>)}
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
                            <a href="https://www.medium.com/hackpacking-stories" 
                            target="_blank"
                            className="navbar-item">
                              <p className="navbar-item-dk" >Blog</p>
                            </a>
                          </>
                        )
                      }
                    />
                  </ul>
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
                    {user ?
                        (
                          <MenuDropdown
                          head={
                            <li className="main-menu__icon main-menu__user--active"
                            style={ {
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: -10,
                              alignItems: "center",
                            }}
                            >
                              <p className="navbar-item-dk nombre-user-navbar"
                                  style={ {
                                    fontWeight: 400,
                                    fontSize: 16,
                                    marginRight: 5,
                                  }}
                                  >{ user.email }</p>
                               <img className="user-icon" src={ iconuser } alt="img"/>
                            </li>
                          }
                          content={
                            <ul className="main-menu__dropdown">
                              <li>
                                <Link to={accountUrl}>
                                  <Trans id="My Account" />
                                </Link>
                              </li>
                              {/* 
                              <li>
                                <Link to={orderHistoryUrl}>
                                  <Trans id="Order history" />
                                </Link>
                              </li>
                              <li>
                                <Link to={addressBookUrl}>
                                  <Trans id="Address book" />
                                </Link>
                              </li>
                              <li>
                                <Link to={paymentOptionsUrl}>
                                  Payment options
                                </Link>
                              </li>
                              */}
                              <li onClick={signOut} data-testid="logout-link">
                                Log Out
                              </li>
                            </ul>
                          }
                        />
                        ):
                        (
                          <button
                            onClick={ () =>setDisplayNewModal(true)} 
                            className="navbar-item btn-sign-in"
                            style={ {
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: -10,
                              alignItems: "center",
                            }}
                          >
                            <p className="navbar-item-dk"
                            style={ {
                              fontWeight: 400,
                              fontSize: 14,
                              marginRight: 6,
                            }}
                            >Sign In</p>
                            <img className="user-icon" src={ iconuser } alt="img"/>
                        </button> )
                    }
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
            <Modal
              loading={ false }
              title=""
              hide={ () =>setDisplayNewModal(false)}
              show={displayNewModal}>
                <div className="popup-container">
                    <div className="btn-closemodal"
                    onClick={() =>setDisplayNewModal(false)}
                    >
                     &#10005;
                    </div>
                    <div
                      style={{
                        padding: 20,
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 30,                   
                      }}
                    >
                      <button
                      style={{
                        fontWeight: SignIn ? 400 : 500,
                        fontSize: 18,
                        padding: "0 20px",
                        borderRight: "1px solid rgba(0,0,0,0.2)",
                      }}
                      onClick={ () => setSignIn(false)}>Sign In</button>
                      <button
                      style={{
                        fontWeight: !SignIn ? 400 : 500,
                        fontSize: 18,
                        padding: "0 20px",
                      }}
                      onClick={ () => setSignIn(true)}>Sign Up</button>
                    </div>
                    <div style={{padding: 20}}>
                    {
                      SignIn ?
                      <RegisterForm hide={ () =>{ 
                      setDisplayNewModal(false);
                      setSignIn(false);
                      }
                    }/>:
                      <LoginForm hide={ () =>{ 
                        setDisplayNewModal(false);
                        setSignIn(false);
                        } }/>
                    }
                    </div>
                </div>
                
                
              </Modal>
        </nav>
      )}}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
