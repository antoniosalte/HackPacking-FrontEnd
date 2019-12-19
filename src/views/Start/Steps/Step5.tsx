import * as React from "react";
import { TypedStep5Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";
import { Loader } from "../../../components";
import { maybe } from "../../../core/utils";
import { ProductsList } from "./types/ProductsList";

const canDisplay = (data: ProductsList) =>
  maybe(() => !!data.products);

const Step5 = ({cart}) => (
    <div className="container">
        <TypedStep5Query alwaysRender displayLoader={false} errorPolicy="all">
            {({ data, loading }) => {
                if (canDisplay(data)) {
                    return (
                    <WrapperContainer
                        data={data}
                        title="Choose your socks"
                        meta={
                            {
                                description: "Step 5",
                                title: "Socks"
                            }
                        }
                        cart={cart}
                    />)
                }
                return <Loader full />;
            }}
        </TypedStep5Query>
    </div>
)
export default Step5;
