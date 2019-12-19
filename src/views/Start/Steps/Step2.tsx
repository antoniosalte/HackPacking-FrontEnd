import * as React from "react";
import { TypedStep2Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";

const Step2 = ({cart}) => (
    <div className="container">
        <WrapperContainer
            TypedQuery={ TypedStep2Query }
            title="Choose your lowerwear"
            meta={
                {
                    description: "Step 2",
                    title: "Upperwear"
                }
            }
            cart={cart}
        />
    </div>
)
export default Step2;
