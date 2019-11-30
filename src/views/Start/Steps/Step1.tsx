import * as React from "react";
import "../styles/styles.scss";
import GoogleMaps from "../Components/GoogleMps"
import Image from "../../../images/hp-start-banner.svg";
import IconLocation from "../../../images/hp-location-icon.svg";
import IconCalendar from "../../../images/hp-calendar-icon.svg";
import IconArrow from "../../../images/hp-arrow-icon.svg";
import Picker from "../Components/datepicker/DatePicker";

class Step1 extends React.Component {
    constructor(props){
        super(props);
    }
    changeData ( type, value ){
        const { step1 } = this.props.data;
        const year = value.getFullYear();
        let month = value.getMonth()+1;
        let dt = value.getDate();
        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        step1[ type ] =  `${dt}-${month}-${year}`;
        this.props.setData( { step1 } );
    };
    render(){
        const { step1 } = this.props.data;
        return (
            <div className="container">
                <br/>
                <br/>
                <div className="start-page__main-banner">
                    <div className="start-page__main-banner__bg-image">
                        <img src={Image} alt ="img" id="image"/>
                    </div>
                    <div className="start-page__main-banner__cont-text">
                        <p>Delivered at your door</p>
                        <span>Recieve your clean and neutral-fraganced clothes in your hotel room or delivered at the door, packed carefully so the smoothing will remain the moment you open the box.</span>
                    </div>
                </div>
                <p className="start-page__title">Setup your trip information</p>
                <div className="container-step1">
                    <div className="container-step1__item i-left">
                        <div className="item-div">
                            <img src={ IconLocation } alt="img"/>
                            <p>Destination: { step1.destination } </p>
                        </div>
                    </div>
                    <div className="container-step1__item">
                        <div className="item-div">
                            <img src={ IconCalendar } alt="img"/>
                            <p>Arrival:
                            <Picker
                                id="arrivalp"
                                onSelect={ (value) => this.changeData("arrival", value) }
                            />
                            </p>
                        </div>
                    </div>
                    <div className="container-step1__item">
                        <div className="item-div">
                            <img src={ IconCalendar } alt="img"/>
                            <p>Departure:
                            <Picker
                                id="departurep"
                                onSelect={ (value) => this.changeData("departure", value) }
                            />
                            </p>
                        </div>
                    </div>
                    <div className="container-step1__item i-right">
                        <div className="item-div">
                            <img src={ IconArrow } alt="img"/>
                            <p>Quick Trip Setup (Optional)</p>
                        </div>
                    </div>
                </div>
                <p
                    style={{ fontWeight: "700", fontSize: 12}}
                >Important: Currently, the service is only available in Lima - Peru</p>
                <GoogleMaps
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwfk-BqDdBvqSvYbVp2rcjpmYoXeTpY2U&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div className="container-maps"/>}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <br /><br /><br /><br />
                <br /><br />
            </div>
        )
    }
}
export default Step1;
