import * as React from "react";
import "../styles/styles.scss";
import { History } from "history";
import { CulqiProvider, Culqi } from "react-culqi";
import { AlertManager, useAlert } from "react-alert";
import Modal from "../../../components/Modal";
import ShippingAdressForm from "../../../components/ShippingAddressForm";
import LoginForm from "../../../components/LoginForm";
import {
  useUserDetails,
  useUpdateCheckoutShippingAddress,
  useUpdateCheckoutBillingAddress,
  useDeleteUserAddresss,
} from "@sdk/react";
import { TypedCreateCheckoutMutation } from "../../../checkout/queries";
import { maybe } from "../../../core/utils";
import { CheckoutContext } from "../../../checkout/context";
import { CartContext } from "../../../components/CartProvider/context";
import { CountryCode } from "types/globalTypes";
import { CartSummary } from "../Components/cart/index";

import { TypedUpdateCheckoutShippingOptionsMutation } from "../../../checkout/views/ShippingOptions/queries";
import { TypedPaymentMethodCreateMutation } from "../../../checkout/views/Payment/queries";
import { TypedCompleteCheckoutMutation } from "../../../checkout/views/Review/queries";
import { completeCheckout } from "../../../checkout/views/Review/types/completeCheckout";
import moment from "moment";
import EditIcon from "../../../images/edit.svg";
import DeleteIcon from "../../../images/garbage.svg";

function proceedToBilling(data, update, token) {
  const canProceed = !data.checkoutShippingMethodUpdate.errors.length;
  if (canProceed) {
    update({ checkout: data.checkoutShippingMethodUpdate.checkout });
  }
}
const completeCheckout = (
  data: completeCheckout,
  history: History,
  clearCheckout: () => void,
  clearCart: () => void,
  alert: AlertManager
) => {
  const canProceed = !data.checkoutComplete.errors.length;

  if (canProceed) {
    clearCheckout();
    clearCart();
    history.push({
      pathname: "/account"
    });
  } else {
    data.checkoutComplete.errors.map(error => {
      alert.show(
        { title: error.message },
        {
          type: "error"
        }
      );
    });
  }
};
const ComponentCheckout = ({
  checkout,
  onEditShipping,
  onEditShippingMethod,
}) => {
  const {
    shippingAddress: sA,
    shippingMethod: sM,
    billingAddress: bA,
    email
  } = checkout;
  return (
    <div className="container-card-checkout">
      <div className="checkout-card-1" style={{ position: "relative" }}>
        <img
          src={EditIcon}
          onClick={onEditShipping}
          style={{
            width: 16,
            right: 50,
            position: "absolute",
            cursor: "pointer"
          }}
        />
        <p style={{ fontSize: 16, fontWeight: 500 }}>Shipping Address</p>
        <p>
          {sA.firstName}&nbsp;{sA.lastName}
        </p>
        <p>{sA.streetAddress1}</p>
        <p>
          {sA.city}, {sA.postalCode}
        </p>
        <p>{sA.country.country}</p>
        <p>{sA.phone}</p>
        <p>{email}</p>
      </div>
      {sM ? (
        <div className="checkout-card-1" style={{ position: "relative" }}>
          <img
            src={EditIcon}
            onClick={onEditShippingMethod}
            style={{
              width: 16,
              right: 20,
              position: "absolute",
              cursor: "pointer"
            }}
          />
          <p style={{ fontSize: 16, fontWeight: 500 }}>Shipping Method</p>
          <p>{sM.name}</p>
          <p>{sM.price.localized}</p>
        </div>
      ) : null}
      {bA ? (
        <div className="checkout-card-1">
          <p style={{ fontSize: 16, fontWeight: 500 }}>Billing Address</p>
          <p>
            {bA.firstName}&nbsp;{bA.lastName}
          </p>
          <p>{bA.streetAddress1}</p>
          <p>
            {bA.city}, {bA.postalCode}
          </p>
          <p>{bA.country.country}</p>
          <p>{email}</p>
        </div>
      ) : null}
    </div>
  );
};

const Step7 = props => {
  const { data: user } = useUserDetails();
  const updateShippingAddress = useUpdateCheckoutShippingAddress();
  const updateBillingAdress = useUpdateCheckoutBillingAddress();
  const [ setDeleteUserAddress ] = useDeleteUserAddresss();
  const { clear: clearCheckout } = React.useContext(CheckoutContext);
  const alert = useAlert();
  const { clear: clearCart } = React.useContext(CartContext);
  const [errors, setErrors] = React.useState([]);
  return (
    <>
      <CheckoutContext.Consumer>
        {({ checkout, update, loading: checkoutLoading }) => (
          <CartContext.Consumer>
            {cart => {
              if ( checkout && checkout.lines.length == 0){ // if dont have checkout lines
                clearCheckout()
              }
              return (
                <TypedCreateCheckoutMutation
                  onCompleted={async ({
                    checkoutCreate: { checkout, errors }
                  }) => {
                    if (!errors.length) {
                      await update({ checkout });
                    }
                    setErrors(errors);
                  }}
                >
                  {(createCheckout, { loading: mutationLoading }) => (
                    <TypedUpdateCheckoutShippingOptionsMutation
                      onCompleted={data => {
                        proceedToBilling(data, update, "token");
                      }}
                    >
                      {(updateCheckoutShippingOptions, { loading }) => (
                        <TypedPaymentMethodCreateMutation
                          onCompleted={async dataPayment => {
                            const canProceed = !dataPayment
                              .checkoutPaymentCreate.errors.length;
                          }}
                        >
                          {createPaymentMethod => (
                            <TypedCompleteCheckoutMutation
                              onCompleted={data =>
                                completeCheckout(
                                  data,
                                  props.history,
                                  clearCheckout,
                                  clearCart,
                                  alert
                                )
                              }
                            >
                              {(completeCheckout, { loading }) => (
                                <Step7Container
                                  {...props}
                                  cart={cart}
                                  checkoutId={maybe(() => checkout.id, null)}
                                  user={user}
                                  checkout={checkout}
                                  createCheckout={createCheckout}
                                  errors={errors}
                                  checkoutLoading={ checkoutLoading }
                                  setDeleteUserAddress={ setDeleteUserAddress }
                                  onPayment={async () => {
                                    const token = checkout.token.id;
                                    if (checkout && token) {
                                      const {
                                        billingAddress,
                                        subtotalPrice,
                                        shippingPrice
                                      } = checkout;
                                      const total =
                                        subtotalPrice.gross.amount +
                                        shippingPrice.gross.amount;
                                      await createPaymentMethod({
                                        variables: {
                                          checkoutId: checkout.id,
                                          input: {
                                            amount: total,
                                            billingAddress: {
                                              city: billingAddress.city,
                                              country: billingAddress.country
                                                .code as CountryCode,
                                              countryArea:
                                                billingAddress.countryArea,
                                              firstName:
                                                billingAddress.firstName,
                                              lastName: billingAddress.lastName,
                                              phone: billingAddress.phone,
                                              postalCode:
                                                billingAddress.postalCode,
                                              streetAddress1:
                                                billingAddress.streetAddress1
                                            },
                                            gateway: "Culqi",
                                            token
                                          }
                                        }
                                      });
                                      await completeCheckout({
                                        variables: {
                                          checkoutId: checkout.id
                                        }
                                      });
                                    } else {
                                      console.log(
                                        "Payment cannot be created, invalid token"
                                      );
                                    }
                                  }}
                                  onCreateCheckout={async data => {
                                    if (user && !checkout) {
                                      const {
                                        destination,
                                        arrival,
                                        departure
                                      } = props.data.step1;
                                      await createCheckout({
                                        variables: {
                                          checkoutInput: {
                                            email: user.email,
                                            lines: cart.lines,
                                            destination: destination,
                                            arrival: moment(
                                              arrival,
                                              "DD-MM-YYYY"
                                            )
                                              .toISOString()
                                              .split("T")[0],
                                            departure: moment(
                                              departure,
                                              "DD-MM-YYYY"
                                            )
                                              .toISOString()
                                              .split("T")[0],
                                            comment: data.comment,
                                            shippingAddress: {
                                              firstName: data.firstName,
                                              lastName: data.lastName,
                                              streetAddress1:
                                                data.streetAddress1,
                                              phone: data.phone,
                                              city: data.city,
                                              postalCode: data.postalCode,
                                              country: maybe(
                                                () => "PE",
                                                "PE"
                                              ) as CountryCode
                                            },
                                            billingAddress: {
                                              firstName: data.firstName,
                                              lastName: data.lastName,
                                              streetAddress1:
                                                data.streetAddress1,
                                              city: data.city,
                                              phone: data.phone,
                                              postalCode: data.postalCode,
                                              country: maybe(
                                                () => "PE",
                                                "PE"
                                              ) as CountryCode
                                            }
                                          }
                                        }
                                      });
                                    } else {
                                      if (checkout && user && data) {
                                        await updateShippingAddress[0]({
                                          checkoutId: checkout.id,
                                          email: user.email,
                                          shippingAddress: {
                                            firstName: data.firstName,
                                            lastName: data.lastName,
                                            streetAddress1: data.streetAddress1,
                                            phone: data.phone,
                                            city: data.city,
                                            postalCode: data.postalCode,
                                            country: maybe(
                                              () => "PE",
                                              "PE"
                                            ) as CountryCode
                                          }
                                        });
                                        await updateBillingAdress[0]({
                                          checkoutId: checkout.id,
                                          billingAddress: {
                                            firstName:
                                              data.firstName,
                                            lastName:
                                            data.lastName,
                                            streetAddress1:
                                            data.streetAddress1,
                                            phone: data.phone,
                                            city: data.city,
                                            postalCode:
                                            data.postalCode,
                                            country: maybe(
                                              () => "PE",
                                              "PE"
                                            ) as CountryCode
                                          }
                                        });
                                        await update({
                                          shippingAsBilling: true
                                        });
                                        window.location.reload();
                                      }
                                      console.log("Checkout already exist!");
                                    }
                                  }}
                                  onCreateCheckoutWithLastShipping={async id => {
                                    if (user && !checkout) {
                                      const {
                                        destination,
                                        arrival,
                                        departure
                                      } = props.data.step1;
                                      const shippingAddressLast = user.addresses.filter(
                                        a => a.id == id
                                      )[0];
                                      if (
                                        shippingAddressLast.isDefaultShippingAddress
                                      ) {
                                        await createCheckout({
                                          variables: {
                                            checkoutInput: {
                                              email: user.email,
                                              lines: cart.lines,
                                              destination: destination,
                                              arrival: moment(
                                                arrival,
                                                "DD-MM-YYYY"
                                              )
                                                .toISOString()
                                                .split("T")[0],
                                              departure: moment(
                                                departure,
                                                "DD-MM-YYYY"
                                              )
                                                .toISOString()
                                                .split("T")[0],
                                              comment: ""
                                            }
                                          }
                                        });
                                      } else {
                                        await createCheckout({
                                          variables: {
                                            checkoutInput: {
                                              email: user.email,
                                              lines: cart.lines,
                                              destination: destination,
                                              arrival: moment(
                                                arrival,
                                                "DD-MM-YYYY"
                                              )
                                                .toISOString()
                                                .split("T")[0],
                                              departure: moment(
                                                departure,
                                                "DD-MM-YYYY"
                                              )
                                                .toISOString()
                                                .split("T")[0],
                                              comment: "",
                                              shippingAddress: {
                                                firstName:
                                                  shippingAddressLast.firstName,
                                                lastName:
                                                  shippingAddressLast.lastName,
                                                streetAddress1:
                                                  shippingAddressLast.streetAddress1,
                                                phone:
                                                  shippingAddressLast.phone,
                                                city: shippingAddressLast.city,
                                                postalCode:
                                                  shippingAddressLast.postalCode,
                                                country: maybe(
                                                  () => "PE",
                                                  "PE"
                                                ) as CountryCode
                                              },
                                              billingAddress: {
                                                firstName: shippingAddressLast.firstName,
                                                lastName: shippingAddressLast.lastName,
                                                streetAddress1:
                                                shippingAddressLast.streetAddress1,
                                                city: shippingAddressLast.city,
                                                phone: shippingAddressLast.phone,
                                                postalCode: shippingAddressLast.postalCode,
                                                country: maybe(
                                                  () => "PE",
                                                  "PE"
                                                ) as CountryCode
                                              }
                                            }
                                          }
                                        });
                                      }
                                    } else {
                                      if (checkout && user && id) {
                                        const shippingAddressLast = user.addresses.filter(
                                          a => a.id == id
                                        )[0];
                                        await updateShippingAddress[0]({
                                          checkoutId: checkout.id,
                                          email: user.email,
                                          shippingAddress: {
                                            firstName:
                                              shippingAddressLast.firstName,
                                            lastName:
                                              shippingAddressLast.lastName,
                                            streetAddress1:
                                              shippingAddressLast.streetAddress1,
                                            phone: shippingAddressLast.phone,
                                            city: shippingAddressLast.city,
                                            postalCode:
                                              shippingAddressLast.postalCode,
                                            country: maybe(
                                              () => "PE",
                                              "PE"
                                            ) as CountryCode
                                          }
                                        });
                                        await updateBillingAdress[0]({
                                          checkoutId: checkout.id,
                                          billingAddress: {
                                            firstName:
                                              shippingAddressLast.firstName,
                                            lastName:
                                              shippingAddressLast.lastName,
                                            streetAddress1:
                                              shippingAddressLast.streetAddress1,
                                            phone: shippingAddressLast.phone,
                                            city: shippingAddressLast.city,
                                            postalCode:
                                              shippingAddressLast.postalCode,
                                            country: maybe(
                                              () => "PE",
                                              "PE"
                                            ) as CountryCode
                                          }
                                        });

                                        await update({
                                          shippingAsBilling: true
                                        });
                                        window.location.reload();
                                      }
                                    }
                                  }}
                                  onUpdateShipping={async id => {
                                    const shippingMethods =
                                      checkout.availableShippingMethods || null;
                                    if (
                                      shippingMethods &&
                                      id &&
                                      checkout.lines.length > 0
                                    ) {
                                      await updateCheckoutShippingOptions({
                                        variables: {
                                          checkoutId: checkout.id,
                                          shippingMethodId: id
                                        }
                                      });
                                    } else {
                                      console.log(
                                        "Invalid Shipping option",
                                        checkout
                                      );
                                    }
                                  }}
                                />
                              )}
                            </TypedCompleteCheckoutMutation>
                          )}
                        </TypedPaymentMethodCreateMutation>
                      )}
                    </TypedUpdateCheckoutShippingOptionsMutation>
                  )}
                </TypedCreateCheckoutMutation>
              );
            }}
          </CartContext.Consumer>
        )}
      </CheckoutContext.Consumer>
    </>
  );
};

class Step7Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNewModal: false,
      showLogin: false,
      contentModal: "login",
      shippingmethodSelected: null,
      addNewShipping: false,
      lastShipping: null,
      culqi: () => {},
      setAmount: () => {}
    };
    this.setDisplayNewModal = this.setDisplayNewModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setCulqi = this.setCulqi.bind(this);
    this.setContentModal = this.setContentModal.bind(this);
    this.selectShippingMethod = this.selectShippingMethod.bind(this);
    this.addShippingMethod = this.addShippingMethod.bind(this);
    this.onNewShipping = this.onNewShipping.bind(this);
    this.onAddLastShipping = this.onAddLastShipping.bind(this);
  }
  async setCulqi(culqi, setAmount) {
    this.setState({
      culqi,
      setAmount
    });
    const { checkout } = this.props;
    if (checkout && checkout.shippingAddress && checkout.shippingMethod) {
      const total = (
        checkout.subtotalPrice.gross.amount +
        checkout.shippingPrice.gross.amount
      ).toFixed(2);
      await setAmount(total * 100);
      await culqi();
    } else {
      if (!this.props.user) {
        this.setContentModal("login");
        this.setDisplayNewModal(true);
      } else {
        if (!checkout) {
          this.setContentModal("shippingaddress");
          this.setDisplayNewModal(true);
        } else if (
          checkout &&
          !checkout.shippingMethod &&
          checkout.availableShippingMethods.length > 0
        ) {
          this.setContentModal("shippingmethod");
          this.setDisplayNewModal(true);
        }
      }
    }
  }
  onNewShipping(newShipping = true) {
    this.setState({
      addNewShipping: newShipping
    });
  }
  onAddLastShipping(id) {
    this.setState({
      lastShipping: id
    });
  }
  setContentModal(state) {
    this.setState({
      contentModal: state
    });
  }
  setDisplayNewModal(modal) {
    this.setState({
      displayNewModal: modal
    });
  }
  selectShippingMethod(id) {
    this.setState({
      shippingmethodSelected: id
    });
  }
  addShippingMethod() {
    const { shippingmethodSelected } = this.state;
    if (shippingmethodSelected) {
      this.setDisplayNewModal(false);
      this.props.onUpdateShipping(shippingmethodSelected);
    }
  }
  onSubmit(data) {
    if (this.props.user) {
      this.setDisplayNewModal(false);
      const dataShippingAdress = {
        firstName: data.firstName,
        lastName: data.lastName,
        streetAddress1: data.streetAddress1,
        city: data.city,
        postalCode: data.postalCode,
        phone: data.phone,
        comment: data.comment || ""
      };
      this.props.onCreateCheckout(dataShippingAdress);
    } else {
      this.shippingaddress("login");
    }
  }
  getStepText(checkout) {
    if (checkout) {
      if (!checkout.shippingAddress) {
        return "Add Shipping Address";
      }
      if (!checkout.shippingMethod) {
        return "Add Shipping Method";
      }
      return "Checkout";
    } else {
      return "Add Shipping Address";
    }
  }
  renderContentShipping() {
    const { lastShipping } = this.state;
    return (
      <div>
        {this.props.user &&
        !this.state.addNewShipping &&
        this.props.user.addresses.length > 0 ? (
          <div>
            <div className="container-items-shipping">
              {this.props.user.addresses.map(a => (
                <div
                  className={
                    this.state.lastShipping == a.id
                      ? "item-selected-shipping-last"
                      : "item-selected-shipping-last-gris"
                  }
                  onClick={() => this.onAddLastShipping(a.id)}
                  style={{position: "relative"}}
                >
                <img
                  src={DeleteIcon}
                  onClick={ ()=>{
                    if (window.confirm("Do you really want to delete address?")) { 
                      this.props.setDeleteUserAddress({addressId: a.id})
                    }
                  }}
                  style={{
                    width: 16,
                    right: 20,
                    position: "absolute",
                    cursor: "pointer"
                  }}
                />
                  <p style={{ margin: 0 }}>
                    {a.firstName}&nbsp;{a.lastName}
                  </p>
                  <p style={{ margin: 0 }}>{a.streetAddress1}</p>
                  <p style={{ margin: 0 }}>
                    {a.city}, {a.postalCode}
                  </p>
                  <p style={{ margin: 0 }}>{a.country.country}</p>
                  <p style={{ margin: 0 }}>{a.phone}</p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "#628a06",
                      fontWeight: 500
                    }}
                  >
                    {this.state.lastShipping == a.id
                      ? "Deliver to this address"
                      : null}
                  </p>
                </div>
              ))}
              <div
                style={{
                  border: "solid 1px",
                  width: 280,
                  padding: 11,
                  borderRadius: 8,
                  fontSize: 12,
                  cursor: "pointer",
                  marginTop: 20
                }}
                onClick={this.onNewShipping}
              >
                &#43; Add New Shipping Address
              </div>
            </div>
            <div
              className={
                lastShipping ? "btn-Shippinglast" : "btn-Shippinglast-gris"
              }
              onClick={
                lastShipping
                  ? () => {
                      this.props.onCreateCheckoutWithLastShipping(lastShipping);
                      this.setDisplayNewModal(false);
                    }
                  : () => {}
              }
            >
              Continue to Shipping
            </div>
          </div>
        ) : (
          <ShippingAdressForm
            hide={() => this.setDisplayNewModal(false)}
            buttonText="Add Shipping Address"
            onSubmit={data => this.onSubmit(data)}
          >
            <div>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: 18,
                  padding: "0 20px"
                }}
              >
                <span onClick={() => this.onNewShipping(false)}>&#8592;</span>
                Shipping Address
              </p>
              <br />
              <br />
            </div>
          </ShippingAdressForm>
        )}
      </div>
    );
  }
  renderContentModal() {
    const { contentModal, addNewShipping } = this.state;
    const { checkout } = this.props;
    switch (contentModal) {
      case "login":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <button
              style={{
                fontWeight: 500,
                fontSize: 18,
                padding: "0 20px"
              }}
            >
              Sign In
            </button>
            <br />
            <LoginForm
              hide={() => {
                this.setDisplayNewModal(false);
                this.setContentModal("shippingaddress");
              }}
            />
          </div>
        );
      case "shippingaddress":
        return this.renderContentShipping();
      case "shippingmethod":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%"
            }}
          >
            <p
              style={{
                fontWeight: 500,
                fontSize: 18,
                padding: "0 20px"
              }}
            >
              Shipping Method
            </p>
            <br />
            <div style={{ width: "100%", height: 286, overflowY: "scroll" }}>
              {checkout && checkout.availableShippingMethods
                ? checkout.availableShippingMethods.map(method => (
                    <div
                      className={
                        this.state.shippingmethodSelected == method.id
                          ? "item-shipping-method-s "
                          : "item-shipping-method"
                      }
                      onClick={() => this.selectShippingMethod(method.id)}
                    >
                      <span>{method.name}</span>
                      <span>$ {method.price.amount}</span>
                    </div>
                  ))
                : null}
            </div>
            <div>
              <button
                className="btn-add-shipping-method"
                onClick={this.addShippingMethod}
                disabled={!this.state.shippingmethodSelected}
              >
                Add Shipping Method
              </button>
              <br />
            </div>
          </div>
        );
    }
  }
  render() {
    const { checkout, cart, user } = this.props;
    const total = checkout ? checkout.totalPrice.gross.amount : 0;
    const shippingPrice = 0;
    const { displayNewModal } = this.state;
    return (
      <div className="container">
        <CulqiProvider
          publicKey="pk_live_ssu1ZoKqgU7HQQqV"
          amount={(total + shippingPrice) * 100}
          title="HackPacking"
          currency="USD"
          description="Travel luggage free from anywhere in the World"
          onToken={token => {
            checkout.token = token;
            this.props.onPayment();
            // window.location.href = "/order-history/";
          }}
          onError={error => {
            console.error("something bad happened", error);
            alert("Error");
          }}
          options={{
            lang: "en",
            style: {
              maincolor: "#84BD00",
              buttontext: "#FFFFFF",
              maintext: "#000000",
              desctext: "#575656",
              logo:
                "https://firebasestorage.googleapis.com/v0/b/tariy-ra.appspot.com/o/HackPackingx512.png?alt=media&token=5a1985b2-86af-4a9a-b597-1c07de378a97"
            }
          }}
        >
          <p style={{ fontSize: 18, fontWeight: "500" }}>Overview</p>
          <div className="containr-overview">
            <div className="c-overview">
              <CartSummary checkout={this.props.checkout}></CartSummary>
            </div>
            {this.props.errors.map(err => (
              <p style={{ color: "red", fontSize: 12 }}>{err.message}</p>
            ))}
          </div>

          {checkout && checkout.lines.length > 0 ? (
            <ComponentCheckout
              checkout={checkout}
              onEditShipping={() => {
                this.setDisplayNewModal(true);
                this.setContentModal("shippingaddress");
              }}
              onEditShippingMethod={() => {
                this.setDisplayNewModal(true);
                this.setContentModal("shippingmethod");
              }}
            />
          ) : null}
          <Culqi>
            {({ openCulqi, setAmount, amount }) => {
              return (
                <div className="cnt-btn-checkout">
                  {( (checkout && checkout.lines.length > 0) ||
                  (!checkout && cart.lines.length > 0) &&
                  !this.props.checkoutLoading ) ?
                  (
                    <button
                      id="openculqi"
                      onClick={() => this.setCulqi(openCulqi, setAmount)}
                      disabled={
                        (checkout && !(checkout.lines.length > 0)) ||
                        (!checkout && !(cart.lines.length > 0))
                      }
                    >
                      {this.getStepText(checkout)}
                    </button>
                  ) : null}
                </div>
              );
            }}
          </Culqi>
          <br />
          <br />
          {(checkout && !(checkout.lines.length > 0)) ||
          (!checkout && !(cart.lines.length > 0)) ? (
            <center>
              <a href="/start?step=upperwear"
              style={{
                padding: "10px 20px",
                backgroundColor: "black",
                color: "white",
                borderRadius: 20,
              }}
              >Start Packing</a>
            </center>
          ) : null}
          <br />
          <br />
          <br />
          <br />
        </CulqiProvider>
        <Modal
          loading={false}
          title=""
          hide={() => this.setDisplayNewModal(false)}
          show={displayNewModal}
        >
          <div className="popup-container">
            <div className="btn-closemodal"
            onClick={() =>this.setDisplayNewModal(false)}
            >
              &#10005;
            </div>
            <div
              style={{
                padding: 20,
                display: "flex",
                justifyContent: "center",
                marginTop: 30
              }}
            >

              {this.renderContentModal()}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Step7;
