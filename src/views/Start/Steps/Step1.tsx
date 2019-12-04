import * as React from "react";
import "../styles/styles.scss";
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import { MetaWrapper } from "../../../components";
import Image from "../../../images/hp-start-banner.svg";
import IconLocation from "../../../images/hp-location-icon.svg";
import IconCalendar from "../../../images/hp-calendar-icon.svg";
import IconArrow from "../../../images/hp-arrow-icon.svg";
import Picker from "../Components/datepicker/DatePicker";

const cities = [
    "Lima, miraflores",
    "Lima, San Isidro",
    "Lima, Surco",
    "Lima, San Isidro",
    "Cuzco",
    "Arequipa",
    "Trujillo",
]

class Step1 extends React.Component {
    constructor(props){
        super(props);
        this.handleRequestOptions = this.handleRequestOptions.bind(this);
        this.quickSetup = this.quickSetup.bind( this );
    }
    quickSetup(){
        this.props.goTo(7);
    }
    handleRequestOptions( text ) {
        const { step1 } = this.props.data;
        step1.destination =  text;
        this.props.setData( { step1 } );
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
            <MetaWrapper
                meta={{
                    description: "Start Packing",
                    title: "HackPacking - Start Packing",
                }}
            >
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
                                <p>Destination:
                                    <TextInput
                                        onRequestOptions={this.handleRequestOptions} 
                                        Component="input"
                                        maxOptions={ 6 }
                                        trigger=""
                                        offsetY={ 20 }
                                        options={ cities }
                                        requestOnlyIfNoOptions={false}
                                        onChange={ this.handleRequestOptions}
                                        value={ step1.destination }
                                        className="input-location"
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="container-step1__item">
                            <div className="item-div">
                                <img src={ IconCalendar } alt="img"/>
                                <p>Arrival:&nbsp;&nbsp;
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
                                <p>Departure:&nbsp;&nbsp;
                                <Picker
                                    id="departurep"
                                    onSelect={ (value) => this.changeData("departure", value) }
                                />
                                </p>
                            </div>
                        </div>
                        <div className="container-step1__item i-right">
                            <div className="item-div"
                                onClick={ this.quickSetup }
                                style={{cursor: "pointer"}}
                            >
                                <img src={ IconArrow } alt="img"/>
                                <p>Quick Trip Setup (Optional)</p>
                            </div>
                        </div>
                    </div>
                    <p
                        style={{ fontWeight: "700", fontSize: 12}}
                    >Important: Currently, the service is only available in Lima - Peru</p>
                    
                    <br /><br />
                    <br /><br />
                </div>
            </MetaWrapper>
        )
    }
}
export default Step1;
