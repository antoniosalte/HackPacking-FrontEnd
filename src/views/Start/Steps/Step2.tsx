import * as React from "react";
import "./stylesteps.scss";
import { dataUpperwear } from "./data";
import Item from "./Item";

const Step2 = ( props ) => {
    return (
        <div className="container">
            <br/>
            <p>Choose your upperwear</p>
            <div className="container-wears">
                {
                    dataUpperwear.map( (item,index) => {
                        return (
                            <Item
                                item={item}
                                key={`item-step2-${index}`}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Step2;
