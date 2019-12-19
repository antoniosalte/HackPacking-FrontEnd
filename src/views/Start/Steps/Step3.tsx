import * as React from "react";
import { TypedStep3Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";

const Step3 = ({cart}) => (
    <div className="container">
        <WrapperContainer
            TypedQuery={ TypedStep3Query }
            title="Choose your lowerwear"
            meta={
                {
                    description: "Step 3",
                    title: "Lowerwear"
                }
            }
            cart={cart}
        />
    </div>
)
export default Step3;
