import * as React from "react";
import "./bottom.scss";
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
import Accesories from "../../../images/hp-accesories.svg";
import AccesoriesGreen from "../../../images/Accesories-green.png";
import Overview from "../../../images/hp-overview.svg";
import OverviewBlack from "../../../images/Overview-black.png";

const items = [
  {
    id: 1,
    title: "Trip Information",
    url: "trip-information",
    image: Trip,
    imageGreen: TripGreen
  },
  {
    id: 2,
    title: "Upperwear",
    url: "upperwear",
    image: Upper,
    imageGreen: UpperGreen
  },
  {
    id: 3,
    title: "Lowerwear",
    url: "lowerwear",
    image: Lower,
    imageGreen: LowerGreen
  },
  {
    id: 4,
    title: "Underwear",
    url: "underwear",
    image: Under,
    imageGreen: UnderGreen
  },
  {
    id: 5,
    title: "Socks",
    url: "socks",
    image: Socks,
    imageGreen: SocksGreen
  },
  {
    id: 6,
    title: "Accesories",
    url: "accesories",
    image: Accesories,
    imageGreen: AccesoriesGreen
  }
];

const isDisabledInMobile = ( step, currentStep) =>{
  switch(currentStep){
    case 1:
    case 2: 
      if ( step == 1 || step == 2 || step == 3){
        return true;
      }else{ return false; }
    case 3:
      if ( step == 2 || step == 3 || step == 4){
        return true;
      }else{ return false; }
    case 4:
      if ( step == 3 || step == 4 || step == 5){
        return true;
      }else{ return false; }
    case 5:
      if ( step == 4 || step == 5 || step == 6){
        return true;
      }else{ return false; }
    case 6:
    case 7:
        if ( step == 5 || step == 6 || step == 7){
          return true;
        }else{ return false; }
    default: 
     return false;
    
  }
}

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
            className={ isDisabledInMobile(item.id, props.step ) ?
              "container-bottomnav__item" :
              "container-bottomnav__item bottomnav-item-disabled" } 
          >
            <div>
              <img
                src={props.step == item.id ? item.imageGreen : item.image}
                alt="icon"
              />
              <p
                style={
                  props.step == item.id
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
        className={ isDisabledInMobile(7, props.step ) ?
          "container-bottomnav__item-o" :
          "container-bottomnav__item-o bottomnav-item-disabled" } 
      >
        <div>
          <img src={props.step == 7 ? OverviewBlack : Overview} alt="icon" />
          <p
            style={props.step == 7 ? { color: "black", fontWeight: 500 } : {}}
          >
            Overview
          </p>
        </div>
      </div>
    </div>
  );
};
export default BottomNav;
