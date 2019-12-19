import * as React from "react";
import { TypedStep5Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";

const Step5 = ({cart}) => (
    <div className="container">
        <WrapperContainer
            TypedQuery={ TypedStep5Query }
            title="Choose your socks"
            meta={
                {
                    description: "Step 5",
                    title: "Socks"
                }
            }
            cart={cart}
        />
    </div>
)
export default Step5;