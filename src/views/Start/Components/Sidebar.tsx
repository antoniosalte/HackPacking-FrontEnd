import * as React from "react";
import "./sidebar.scss";
import { CartSidebar } from "../Components/cartSidebar";
import { CheckoutContext } from "../../../checkout/context";

class Sidebr extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { step1 } = this.props.data;
    return (
      <div className="sidebar-container">
        <p>Trip to: {step1.destination} </p>
        <p>Arriving: {step1.arrival} </p>
        <p>Departing: {step1.departure}</p>
        <hr />
        <CheckoutContext.Consumer>
          {({ checkout, update, loading: checkoutLoading }) => {
            return (
              <CartSidebar
                checkout={checkout}
                cart={this.props.cart}
              ></CartSidebar>
            );
          }}
        </CheckoutContext.Consumer>
        <div className="cont-botom">
          <br />
          <div className="sidebar-container__button-checkout">
            <button onClick={() => this.props.toCheckout()}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Sidebr;
