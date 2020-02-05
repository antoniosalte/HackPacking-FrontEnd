import * as React from "react";
import { Loader } from "../../../components";
import { maybe } from "../../../core/utils";
import { TypedStep5Query } from "./queries/queries";
import { ProductsList } from "./types/ProductsList";
import WrapperContainer from "./Wrapper";

const canDisplay = (data: ProductsList) => maybe(() => !!data.products);

const Step5 = ({ cart, male }) => (
  <div style={{ padding: "0 20px" }}>
    <TypedStep5Query alwaysRender displayLoader={false} errorPolicy="all">
      {({ data, loading }) => {
        if (canDisplay(data)) {
          return (
            <WrapperContainer
              data={data}
              male={male}
              title="Choose your socks"
              meta={{
                description: "Step 5",
                title: "Socks",
              }}
              cart={cart}
            />
          );
        }
        return <Loader full />;
      }}
    </TypedStep5Query>
  </div>
);
export default Step5;
