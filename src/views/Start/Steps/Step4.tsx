import * as React from "react";
import { Loader } from "../../../components";
import { maybe } from "../../../core/utils";
import { TypedStep4Query } from "./queries/queries";
import { ProductsList } from "./types/ProductsList";
import WrapperContainer from "./Wrapper";

const canDisplay = (data: ProductsList) => maybe(() => !!data.products);

const Step4 = ({ cart, male }) => (
  <div style={{ padding: "0 20px" }}>
    <TypedStep4Query alwaysRender displayLoader={false} errorPolicy="all">
      {({ data, loading }) => {
        if (canDisplay(data)) {
          return (
            <WrapperContainer
              data={data}
              male={male}
              title="Choose your underwear"
              subTitle="You can keep the underwear items you select, no need to return it"
              meta={{
                description: "Select underwear for your order here.",
                title: "Underwear",
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
