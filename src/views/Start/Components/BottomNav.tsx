import * as React from "react";
import "./bottom.scss";
import Trip from "../../../images/hp-trip.svg";
import Upper from "../../../images/hp-upwear.svg";
import Lower from "../../../images/hp-lower.svg";
import Under from "../../../images/hp-under.svg";
import Socks from "../../../images/hp-socks.svg";
import Accesories from "../../../images/hp-accesories.svg";
import Overview from "../../../images/hp-overview.svg";

const items = [
    {
        id:1,
        title: "Trip Information",
        image: Trip,
    },
    {
        id:2,
        title: "Upperwear",
        image: Upper,
    },
    {
        id:3,
        title: "Lowewear",
        image: Lower,
    },
    {
        id:4,
        title: "Underwear",
        image: Under,
    },
    {
        id:5,
        title: "Socks",
        image: Socks,
    },
    {
        id:6,
        title: "Accesories",
        image: Accesories,
    },
]

const BottomNav = ( props ) => {
    return (
        <div className="container-bottomnav">
            {
                items.map( item => {
                    return (
                        <div
                            onClick={ () => {
                                props.goTo(item.id)
                                props.cart.clearErrors()

                            }}
                            className="container-bottomnav__item"
                        >
                            <div>
                                <img src={item.image} alt="trip"/>
                                <p style={
                                    props.step == item.id ?
                                    {color: "#84BD00",fontWeight:500}:{}
                                }>{item.title}</p>
                            </div>
                        </div>
                    )
                })
            }
            <div onClick={ () => {
                                props.goTo(7)
                                props.cart.clearErrors()

                            }}
            className="container-bottomnav__item-o">
                <div>
                    <img src={Overview} alt="trip"/>
                    <p style={
                        props.step == 7 ?
                        {color: "black",fontWeight:500}:{}}>Overview</p>
                </div>
            </div>
        </div>
    )
}
export default BottomNav;
