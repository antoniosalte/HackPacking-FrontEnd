import * as React from "react";
import { TypedStep3Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";
import { Loader } from "../../../components";
import { maybe } from "../../../core/utils";
import { ProductsList } from "./types/ProductsList";

const canDisplay = (data: ProductsList) => maybe(() => !!data.products);

const Step3 = ({ cart }) => (
  <div className="container">
    <TypedStep3Query alwaysRender displayLoader={false} errorPolicy="all">
      {({ data, loading }) => {
        if (canDisplay(data)) {
          return (
            <WrapperContainer
              data={data}
              title="Choose your lowerwear"
              meta={{
                description: "Step 3",
                title: "Lowerwear"
              }}
              cart={cart}
            />
          );
        }
        return <Loader full />;
      }}
    </TypedStep3Query>
  </div>
);
export default Step3;
