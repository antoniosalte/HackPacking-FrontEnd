import * as React from "react";
import Trip from "../../../images/hp-trip.svg";
import TripGreen from "../../../images/TripInformation-green.png";

import Upper from "../../../images/hp-upwear.svg";
import UpperGreen from "../../../images/Upperwear-green.png";

import Lower from "../../../images/hp-lower.svg";
import LowerGreen from "../../../images/Lowerwear-green.png";

import Under from "../../../images/hp-under.svg";
import UnderGreen from "../../../images/Underwear-green.png";

import Socks from "../../../images/hp-socks.svg";
import SocksGreen from "../../../images/Socks-green.png";

import AccesoriesGreen from "../../../images/Accesories-green.png";
import Accesories from "../../../images/hp-accesories.svg";

import Overview from "../../../images/hp-overview.svg";
import OverviewBlack from "../../../images/Overview-black.png";

import "./bottom.scss";

const items = [
  {
    id: 1,
    image: Trip,
    imageGreen: TripGreen,
    title: "Trip Information",
    url: "trip-information",
  },
  {
    id: 2,
    image: Upper,
    imageGreen: UpperGreen,
    title: "Upperwear",
    url: "upperwear",
  },
  {
    id: 3,
    image: Lower,
    imageGreen: LowerGreen,
    title: "Lowerwear",
    url: "lowerwear",
  },
  {
    id: 4,
    image: Under,
    imageGreen: UnderGreen,
    title: "Underwear",
    url: "underwear",
  },
  {
    id: 5,
    image: Socks,
    imageGreen: SocksGreen,
    title: "Socks",
    url: "socks",
  },
  {
    id: 6,
    image: Accesories,
    imageGreen: AccesoriesGreen,
    title: "Accesories",
    url: "accesories",
  },
];
const BottomNav = props => {
  return (
    <div className="container-bottomnav">
      {items.map(item => {
        return (
          <div
            onClick={() => {
              props.goTo(item.id, item.url);
              props.cart.clearErrors();
            }}
            className="container-bottomnav__item"
          >
            <div>
              <img
                src={props.step === item.id ? item.imageGreen : item.image}
                alt="icon"
              />
              <p
                style={
                  props.step === item.id
                    ? { color: "#84BD00", fontWeight: 500 }
                    : {}
                }
              >
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
      <div
        onClick={() => {
          props.goTo(7, "overview");
          props.cart.clearErrors();
        }}
        className="container-bottomnav__item-o"
      >
        <div>
          <img src={props.step === 7 ? OverviewBlack : Overview} alt="icon" />
          <p
            style={props.step === 7 ? { color: "black", fontWeight: 500 } : {}}
          >
            Overview
          </p>
        </div>
      </div>
    </div>
  );
};
export default BottomNav;
