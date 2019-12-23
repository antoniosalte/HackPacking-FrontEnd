import * as React from "react";
import { TypedStep2Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";
import { Loader } from "../../../components";
import { maybe } from "../../../core/utils";
import { ProductsList } from "./types/ProductsList";

const canDisplay = (data: ProductsList) => maybe(() => !!data.products);

const Step2 = ({ cart }) => (
  <div style={{padding: "0 20px"}}>
    <TypedStep2Query alwaysRender displayLoader={true} errorPolicy="all">
      {({ data, loading }) => {
        if (canDisplay(data)) {
          return (
            <WrapperContainer
              data={data}
              title="Choose your upperwear"
              meta={{
                description: "Step 2",
                title: "Upperwear"
              }}
              cart={cart}
            />
          );
        }
        return <Loader full />;
      }}
    </TypedStep2Query>
  </div>
);
export default Step2;
