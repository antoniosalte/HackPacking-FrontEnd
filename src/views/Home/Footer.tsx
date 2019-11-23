import "./scss/index.scss";
import * as React from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import svgUser from "../../images/hp-usericon.svg";
import FacebookIcon from "../../images/Facebook.svg";
import WhatsappIcon from "../../images/Whatsapp.svg";
import InstagramIcon from "../../images/Instagram.svg";
import TwitterIcon from "../../images/Twitter.svg";

const Footer = ( props ) => {
    return (
        <div
            className={ props.home ? "footer-home" : "footer-all"}
        >
          <div className="container">
            <div className="home-page__cont-home"
                style={ props.home ? {} : {width: "100%"}}
                >
                <div className="footer-c1">
                    <p>“Hack Packing let’s me enjoy my trips without caring about the weight of my luggage.”</p>
                    <ReactSVG
                        svgStyle={{
                        width: 42,
                        }}
                        path={svgUser} />
                    <span>Carlos Castro (Hack Packing user)</span>
                </div>
                <div className="separator-v"/>
                <div className="footer-c2">
                    <div className="footer-c2__c1">
                        <div className="column-f">
                            <p>Product</p>
                            <Link to="/">Login</Link>
                            <Link to="/">Register</Link>
                            <Link to="/">Shopping cart</Link>
                            <Link to="/">Status of your order</Link>
                            <Link to="/">Support</Link>
                        </div>
                        <div className="column-f" style={{minWidth: 100}}>
                            <p>Company</p>
                            <Link to="/">Home</Link>
                            <Link to="/">About</Link>
                            <Link to="/">Why</Link>
                            <Link to="/">How</Link>
                            <Link to="/">FAQ</Link>
                        </div>
                        <div className="iconos">
                            <a href="/" target="_blank">
                                <ReactSVG
                                    svgStyle={{
                                    width: 42,
                                    }}
                                    path={FacebookIcon} />
                            </a>
                            <a href="/" target="_blank">
                                <ReactSVG
                                    svgStyle={{
                                    width: 42,
                                    }}
                                    path={InstagramIcon} />
                            </a>
                            <a href="/" target="_blank">
                                <ReactSVG
                                    svgStyle={{
                                    width: 42,
                                    }}
                                    path={WhatsappIcon} />
                            </a>
                            <a href="/" target="_blank">
                                <ReactSVG
                                    svgStyle={{
                                    width: 42,
                                    }}
                                    path={TwitterIcon} />
                            </a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2010 — 2020 Privacy — Terms</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
    );
}
export default Footer;