import * as React from "react";
import { TypedStep4Query } from "./queries/queries";
import WrapperContainer from "./Wrapper";
import { Loader } from "../../../components";
import { maybe } from "../../../core/utils";
import { ProductsList } from "./types/ProductsList";

const canDisplay = (data: ProductsList) => maybe(() => !!data.products);

const Step4 = ({ cart }) => (
  <div className="container">
    <TypedStep4Query alwaysRender displayLoader={false} errorPolicy="all">
      {({ data, loading }) => {
        if (canDisplay(data)) {
          return (
            <WrapperContainer
              data={data}
              title="Choose your underwear"
              subTitle="You can keep the underwear items you select, no need to return it"
              meta={{
                description: "Step 4",
                title: "Underwear"
              }}
              cart={cart}
            />
          );
        }
        return <Loader full />;
      }}
    </TypedStep4Query>
  </div>
);
export default Step4;
