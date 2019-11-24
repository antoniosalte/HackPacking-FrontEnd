import * as React from "react";
import "./sidebar.scss";

const Sidebr = ( props ) => {
    const { step1 } = props.data;
    console.log( "SIDEBRR", props );
    return (
        <div className="sidebar-container">
            <p>Trip to: { step1.destination} </p>
            <p>Arriving: { step1.arrival } </p>
            <p>Departing: { step1.departure}</p>
            <hr />
        </div>
    )
}
export default Sidebr;
