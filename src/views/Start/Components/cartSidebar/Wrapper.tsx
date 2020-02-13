import "./scss/index.scss";

import React from "react";

import { Checkout } from "../../../../checkout/types/Checkout";
import Cart from "./Cart";

const Wrapper: React.FC<{ checkout?: Checkout }> = ({ checkout, cart }) => (
  <Cart cart={cart} checkout={checkout} />
);

export default Wrapper;
