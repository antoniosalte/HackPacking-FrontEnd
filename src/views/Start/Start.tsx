import * as React from "react";
import Sidebar from "./Components/Sidebar";
import Step1 from "./Steps/Step1";

class Start extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            data:{
                step1:{
                    destination: "Treehouse, Lima - PE",
                    arrival: "",
                    departure: "",
                },
                step2:{

                }
            },
            changes: 1,
            step: 1,
            open:false,
        }
        this.setData = this.setData.bind( this );
        this.openSidebar= this.openSidebar.bind( this);
    }
    openSidebar(){ 
        this.setState(prevState => ({
            open: !prevState.open
        }))
        console.log( this.state.open ) 
    }
    setData( newdata ){
        console.log( newdata )
        const { data, changes, open } = this.state;
        this.setState( {
            data: { ...data, ...newdata },
        } )
    }
    renderStep() {
        switch( this.state.step ){
            case 1:
                return ( <Step1
                    { ...this.props }
                    data={ this.state.data }
                    setData={ this.setData }/> 
                    )
            case 2: 
                return ( <Step1
                    { ...this.props }
                    data={ this.state.data }
                    setData={ this.setData }/> 
                    )
            default: ( <Step1
                { ...this.props }
                data={ this.state.data }
                setData={ this.setData }/> 
                )
        }
    }
    render() {
        const { data, open } = this.state;
        return (
            <div className="start-page">
                {
                    this.renderStep()
                }
                <div className="start-page-steps">
                    steps
                </div>
                <div className={ open ? "start-page-sidebar open-s" : "start-page-sidebar close-s" } >
                    <div
                        onClick={ this.openSidebar }
                        className="start-page-sidebar__button">
                        <div className={ !open ? "left-arrow" : "right-arrow"  }/>
                    </div>
                    <div className="start-page-sidebar__container">
                        <Sidebar data={ data } />
                    </div>
                </div>
            </div>
        )
    }
}
export default Start;