import * as React from "react";
import { TypedStep4Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";

const Step4 = ({cart}) => (
    <div className="container">
        <WrapperContainer
            TypedQuery={ TypedStep4Query }
            title="Choose your underwear"
            meta={
                {
                    description: "Step 4",
                    title: "Underwear"
                }
            }
            cart={cart}
        />
    </div>
)
export default Step4;