import * as React from "react";
import "../styles/styles.scss";
import GoogleMaps from "../Components/GoogleMps"
import Image from "../../../images/hp-start-banner.svg";
import IconLocation from "../../../images/hp-location-icon.svg";
import IconCalendar from "../../../images/hp-calendar-icon.svg";
import IconArrow from "../../../images/hp-arrow-icon.svg";

const changeData = ( props ) => {
    console.log( props );
    props.setData({ step1:{departure:"12/07/12",arrival:"12/2/12"}});
    console.log( props );
};
class Step1 extends React.Component {
    componentDidMount(){
        console.log( "did mount",this.props )
    }
    render(){
        const { step1 } = this.props.data;
        return (
            <div className="container">
                <br/>
                <br/>
                <div className="start-page__main-banner">
                    <div className="start-page__main-banner__bg-image">
                        <img src={Image} alt ="img"/>
                    </div>
                    <div className="start-page__main-banner__cont-text">
                        <p>Delivered at your door</p>
                        <span>Recieve your clean and neutral-fraganced clothes in your hotel room or delivered at the door, packed carefully so the smoothing will remain the moment you open the box.</span>
                    </div>
                </div>
                <p className="start-page__title">Setup your trip information</p>
                <div className="container-step1">
                    <div className="container-step1__item i-left">
                        <div>
                            <img src={ IconLocation } alt="img"/>
                            <p>Destination: { step1.destination } </p>
                        </div>
                    </div>
                    <div className="container-step1__item">
                        <div>
                            <img src={ IconCalendar } alt="img"/>
                            <p>Arrival: { step1.arrival }</p>
                        </div>
                    </div>
                    <div className="container-step1__item">
                        <div>
                            <img src={ IconCalendar } alt="img"/>
                            <p>Departure: { step1.departure }</p>
                        </div>
                    </div>
                    <div className="container-step1__item i-right">
                        <div>
                            <img src={ IconArrow } alt="img"/>
                            <p>Quick Trip Setup (Optional)</p>
                        </div>
                    </div>
                </div>
                <br />
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
