import "./scss/index.scss";

import React from "react";

import { CartContext } from "../../../../components/CartProvider/context";
import { Checkout } from "../../../../checkout/types/Checkout"
import Cart from "./Cart";

const Wrapper: React.FC<{ checkout?: Checkout }> = ({ checkout }) => (
    <CartContext.Consumer>
    {cart => <Cart cart={cart} checkout={checkout} />}
    </CartContext.Consumer>
);

export default Wrapper;
