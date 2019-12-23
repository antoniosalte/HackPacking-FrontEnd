import * as React from "react";
import { TypedStep6Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";
import { Loader } from "../../../components";
import { maybe } from "../../../core/utils";
import { ProductsList } from "./types/ProductsList";

const canDisplay = (data: ProductsList) =>
  maybe(() => !!data.products);

const Step6 = ({cart}) => (
    <div style={{padding: "0 20px"}}>
        <TypedStep6Query alwaysRender displayLoader={false} errorPolicy="all">
            {({ data, loading }) => {
                if (canDisplay(data)) {
                    return (
                    <WrapperContainer
                        data={data}
                        title="Choose your accesories"
                        meta={
                            {
                                description: "Step 6",
                                title: "Accesories"
                            }
                        }
                        cart={cart}
                    />)
                }
                return <Loader full />;
            }}
        </TypedStep6Query>
    </div>
)
export default Step6;
