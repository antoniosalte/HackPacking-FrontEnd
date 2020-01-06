import * as React from "react";
import "../styles/styles.scss";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

import { MetaWrapper } from "../../../components";
import Image from "../../../images/hp-start-banner.svg";
import IconLocation from "../../../images/hp-location-icon.svg";
import IconCalendar from "../../../images/hp-calendar-icon.svg";
import LOGO from "../../../images/logo.jpg";
import IconArrow from "../../../images/hp-arrow-icon.svg";
import Picker from "../Components/datepicker/DatePicker";
import { quiqkTrip } from "./static";
import moment from "moment";
const cities = ["Perú, Lima", "Perú, Cuzco", "Perú, Arequipa"];

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleRequestOptions = this.handleRequestOptions.bind(this);
    this.quickSetup = this.quickSetup.bind(this);
    this.destinationRef = React.createRef();
    this.depRef = React.createRef();
  }
  quickSetup() {
    this.props.cart.clear();
    const { arrival, departure } = this.props.data.step1;
    const dateArrival = moment(arrival,'D/M/YYYY');
    const dateDeparture  = moment(departure ,'D/M/YYYY');
    const diffDays = dateDeparture .diff(dateArrival, 'days');
    //formula del quick setup
    if(diffDays>=1){

      if( diffDays <= 3){
      this.props.cart.add(quiqkTrip[0].variantId, diffDays); //T-shirt
      this.props.cart.add(quiqkTrip[1].variantId, 1);//JEANS
      }
      else{
        const jeans= Math.ceil( diffDays/5 )
        const polos= Math.ceil( diffDays/2 )
        this.props.cart.add(quiqkTrip[0].variantId, polos); //T-shirt
        this.props.cart.add(quiqkTrip[1].variantId, jeans);//JEANS
      }
      this.props.cart.add(quiqkTrip[2].variantId, diffDays);//Underwear
      this.props.goTo(7);
    }else{
      alert("Invalid dates")
    }
  }
  handleRequestOptions(text) {
    const { step1 } = this.props.data;
    step1.destination = text;
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
  render() {
    const { step1 } = this.props.data;
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
            <div className="container-step1__item i-left">
              <div
                className="item-div"
                style={{
                  cursor: "pointer"
                }}
                onClick={() => this.destinationRef.current.refInput.focus()}
              >
                <img src={IconLocation} alt="img" />
                <p>
                  Destination:
                  <TextInput
                    ref={this.destinationRef}
                    onRequestOptions={this.handleRequestOptions}
                    Component="input"
                    maxOptions={6}
                    trigger=""
                    offsetY={20}
                    options={cities}
                    requestOnlyIfNoOptions={false}
                    onChange={this.handleRequestOptions}
                    value={step1.destination}
                    className="input-location"
                  />
                </p>
              </div>
            </div>
            <div className="container-step1__item">
              <div className="item-div">
                <img src={IconCalendar} alt="img" />
                <p>
                  Arrival:&nbsp;&nbsp;
                  <Picker
                    id="arrivalp"
                    onSelect={value => this.changeData("arrival", value)}
                    arrival
                  />
                </p>
              </div>
            </div>
            <div className="container-step1__item">
              <div className="item-div">
                <img src={IconCalendar} alt="img" />
                <p>
                  Departure:&nbsp;&nbsp;
                  <Picker
                    id="departurep"
                    onSelect={value => this.changeData("departure", value)}
                  />
                </p>
              </div>
            </div>
            <div className="container-step1__item i-right">
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
