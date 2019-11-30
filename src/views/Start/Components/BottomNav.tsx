import * as React from "react";
import "./bottom.scss";
import Trip from "../../../images/hp-trip.svg";
import Upper from "../../../images/hp-upwear.svg";
import Lower from "../../../images/hp-lower.svg";
import Under from "../../../images/hp-under.svg";
import Socks from "../../../images/hp-socks.svg";
import Accesories from "../../../images/hp-accesories.svg";
import Overview from "../../../images/hp-overview.svg";

const BottomNav = ( props ) => {
    return (
        <div className="container-bottomnav">
            <div
            onClick={ () => props.goTo(1)}
            className="container-bottomnav__item">
                <div>
                    <img src={Trip} alt="trip"/>
                    <p>Trip Information</p>
                </div>
            </div>
            <div
                onClick={ () => props.goTo(2)}
                className="container-bottomnav__item"
            >
                <div>
                    <img src={Upper} alt="trip"/>
                    <p>Upperwear</p>
                </div>
            </div>
            <div onClick={ () => props.goTo(3)}
            className="container-bottomnav__item">
                <div>
                    <img src={Lower} alt="trip"/>
                    <p>Lowerwear</p>
                </div>
            </div>
            <div onClick={ () => props.goTo(4)}
            className="container-bottomnav__item">
                <div>
                    <img src={Under} alt="trip"/>
                    <p>Underwear</p>
                </div>
            </div>
            <div onClick={ () => props.goTo(5)}
            className="container-bottomnav__item">
                <div>
                    <img src={Socks} alt="trip"/>
                    <p>Socks</p>
                </div>
            </div>
            <div onClick={ () => props.goTo(6)}
            className="container-bottomnav__item">
                <div>
                    <img src={Accesories} alt="trip"/>
                    <p>Accesories</p>
                </div>
            </div>
            <div onClick={ () => props.goTo(7)}
            className="container-bottomnav__item-o">
                <div>
                    <img src={Overview} alt="trip"/>
                    <p>Overview</p>
                </div>
            </div>
        </div>
    )
}
export default BottomNav;
