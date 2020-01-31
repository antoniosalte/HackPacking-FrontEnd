import * as React from "react";
import "../styles/styles.scss";

import { MetaWrapper } from "../../../components";
import Image from "../../../images/hp-start-banner.svg";
import IconLocation from "../../../images/hp-location-icon.svg";
import IconCalendar from "../../../images/hp-calendar-icon.svg";
import LOGO from "../../../images/logo.jpg";
import IconArrow from "../../../images/hp-arrow-icon.svg";
import Picker from "../Components/datepicker/DatePicker";
import { quiqkTrip } from "./static";
import moment from "moment";
const cities = ["Lima, Peru", "Cuzco, Peru", "Arequipa, Peru"];

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeDestination = this.onChangeDestination.bind(this);
    this.quickSetup = this.quickSetup.bind(this);
  }
  quickSetup() {
    this.props.cart.clear();
    const { arrival, departure } = this.props.data.step1;
    const dateArrival = moment(arrival, "D/M/YYYY");
    const dateDeparture = moment(departure, "D/M/YYYY");
    const diffDays = dateDeparture.diff(dateArrival, "days");
    //formula del quick setup
    if (diffDays >= 1) {
      if (diffDays <= 3) {
        this.props.cart.add(quiqkTrip[0].variantId, diffDays); //T-shirt
        this.props.cart.add(quiqkTrip[1].variantId, 1); //JEANS
      } else {
        const jeans = Math.ceil(diffDays / 5);
        const polos = Math.ceil(diffDays / 2);
        this.props.cart.add(quiqkTrip[0].variantId, polos); //T-shirt
        this.props.cart.add(quiqkTrip[1].variantId, jeans); //JEANS
      }
      this.props.cart.add(quiqkTrip[2].variantId, diffDays); //Underwear
      this.props.goTo(7);
    } else {
      alert("Invalid dates");
    }
  }
  onChangeDestination(e) {
    const { step1 } = this.props.data;
    step1.destination = e.target.value;
    this.props.setData({ step1 });
  }
  changeData(type, value) {
    const { step1 } = this.props.data;
    const year = value.getFullYear();
    let month = value.getMonth() + 1;
    let dt = value.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    step1[type] = `${dt}-${month}-${year}`;
    this.props.setData({ step1 });
  }
  updateDate(type, value) {
    const { step1 } = this.props.data;
    const year = value.getFullYear();
    let month = value.getMonth() + 1;
    let dt = value.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    step1[type] = `${dt}-${month}-${year}`;
    this.props.setData({ step1 });
  }
  render() {
    return (
      <MetaWrapper
        meta={{
          description: "Start Packing",
          title: "HackPacking - Start Packing",
          image: LOGO
        }}
      >
        <div className="container">
          <br />
          <br />
          <div className="start-page__main-banner">
            <div className="start-page__main-banner__bg-image">
              <img src={Image} alt="img" id="image" />
            </div>
            <div className="start-page__main-banner__cont-text">
              <p>Delivered at your door</p>
              <span>
                Recieve your clean and neutral-fraganced clothes in your hotel
                room or delivered at the door, packed carefully so the smoothing
                will remain the moment you open the box.
              </span>
            </div>
          </div>
          <p className="start-page__title">Setup your trip information</p>
          <div className="container-step1">
            <div className="container-step1__item i-left grid-area-a">
              <div className="item-div">
                <img src={IconLocation} alt="img" />
                <p>
                  Destination:
                  <select
                    className="input-location"
                    style={{
                      border: "0px solid transparent",
                      backgroundColor: "white"
                    }}
                    onChange={this.onChangeDestination}
                    id="select-destination"
                  >
                    {cities.map(c => (
                      <option
                        value={c}
                        selected={this.props.data.step1.destination == c}
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>
            <div className="container-step1__item grid-area-b">
              <div className="item-div">
                <img src={IconCalendar} alt="img" />
                <p>
                  Arrival:&nbsp;&nbsp;
                  <Picker
                    id="arrivalp"
                    onSelect={value => this.changeData("arrival", value)}
                    arrival
                    startD={this.props.data.step1.arrival}
                  />
                </p>
              </div>
            </div>
            <div className="container-step1__item grid-area-d">
              <div className="item-div">
                <img src={IconCalendar} alt="img" />
                <p>
                  Departure:&nbsp;&nbsp;
                  <Picker
                    id="departurep"
                    onSelect={value => this.changeData("departure", value)}
                    startD={this.props.data.step1.departure}
                    arrivalD={this.props.data.step1.arrival}
                    updateDate={this.updateDate.bind(this)}
                  />
                </p>
              </div>
            </div>
            <div className="container-step1__item i-right grid-area-e">
              <div
                className="item-div"
                onClick={this.quickSetup}
                style={{ cursor: "pointer" }}
              >
                <img src={IconArrow} alt="img" />
                <p>Quick Trip Setup (Optional)</p>
              </div>
            </div>
          </div>
          <p style={{ fontWeight: "700", fontSize: 12 }}>
            Important: Currently, the service is only available in Peru
          </p>

          <br />
          <br />
          <br />
          <br />
        </div>
      </MetaWrapper>
    );
  }
}
export default Step1;
