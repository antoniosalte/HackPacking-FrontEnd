import * as React from "react";
import { TypedStep6Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";

const Step6 = ({cart}) => (
    <div className="container">
        <WrapperContainer
            TypedQuery={ TypedStep6Query }
            title="Choose your accesories"
            meta={
                {
                    description: "Step 6",
                    title: "Accesories"
                }
            }
            cart={cart}
        />
    </div>
)
export default Step6;