import * as React from "react";
import "../styles/styles.scss";
import { CulqiProvider, Culqi } from "react-culqi";
import { MutationFn } from "react-apollo";
import Modal from "../../../components/Modal";
import ShippingAdressForm from "../../../components/ShippingAddressForm";
import LoginForm from "../../../components/LoginForm";
import {
  useUserDetails } from "@sdk/react";
import { TypedCreateCheckoutMutation } from "../../../checkout/queries";
import { maybe } from "../../../core/utils";
import { CheckoutContext } from "../../../checkout/context";
import { CartContext } from "../../../components/CartProvider/context";
import { CountryCode } from "types/globalTypes";

import { TypedPaymentMethodCreateMutation } from "../../../checkout/views/Payment/queries";
import { createPayment, createPaymentVariables } from "../../../checkout/views/Payment/types/createPayment";

const getTotal = items => {
  let total = 0;
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const price = item.price.amount;
    const count = item.details.countItem;
    total += price * count;
  }
  return total;
};

const deleteCount = (it, step, props) => {
  let { items } = props.data[step];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.id === it.id && item.details.countItem > 0) {
      item.details.countItem -= 1;
    }
  }
  props.setData({ [step]: { items } });
};
const addCount = (it, step, props) => {
  let { items } = props.data[step];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.id === it.id) {
      item.details.countItem += 1;
    }
  }
  props.setData({ [step]: { items } });
};
const deleteItem = (id, step, props) => {
  let { items } = props.data[step];
  let newItems = items.filter(i => i.id !== id);
  props.setData({ [step]: { items: newItems } });
};

const renderItem = (item, type, step, props) => {

  return (
    <React.Fragment>
      {item.map(item => {
        const size = item.variants.find( x => x.id === item.details.selectedSize)
        return (
          <tr>
            <td style={{ textAlign: "start" }}>{item.name}</td>
            <td style={{ textAlign: "center", display: "flex" }}>
              <div
                className="color-point"
                onClick={() => deleteCount(item, step, props)}
                style={{
                  backgroundColor: "#84BD00",
                  color: "white",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "none"
                }}
              >
                -
              </div>
              {item.details.countItem}
              <div
                className="color-point"
                onClick={() => addCount(item, step, props)}
                style={{
                  backgroundColor: "#84BD00",
                  color: "white",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "none"
                }}
              >
                +
              </div>
            </td>
            <td style={{ textAlign: "center" }}>{type}</td>
            <td style={{ textAlign: "center" }}>
              <div
                className="color-point"
                style={{
                  backgroundColor: "white",
                  margin: "0 auto"
                }}
              />
            </td>
            <td style={{ textAlign: "center" }}>{size.name}</td>
            <td style={{ textAlign: "end" }}>
              $ {item.price.amount * item.details.countItem}
            </td>
            <td>
              <div
                className="color-point"
                onClick={() => deleteItem(item.id, step, props)}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                x
              </div>
            </td>
          </tr>
        );
      })}
    </React.Fragment>
  );
};
const Step7 = (props) => {
  const { data: user } = useUserDetails();
  return(
  <>
  <CheckoutContext.Consumer>
      {({ checkout, update, loading: checkoutLoading }) => (
        <CartContext.Consumer>
          {cart => { 
            console.log( cart )
            return(
        <TypedCreateCheckoutMutation
          onCompleted={async ({ checkoutCreate: { checkout, errors } }) => {
            if (!errors.length) {
              await update({ checkout });
            }
            console.log( "checkout",update, checkout, errors );
          }}
        >
          {(createCheckout, { loading: mutationLoading }) => (
            <Step7Container { ...props }
              cart={cart}
              checkoutId={maybe(() => checkout.id, null)}
              user={user}
              checkout={checkout}
              createCheckout={createCheckout}
              onClick={(data) => {
                if (user && !checkout) {
                  const { destination, arrival, departure,
                  } = props.data.step1;
                  createCheckout({
                    variables: {
                      checkoutInput: { 
                        email: data.email,
                        lines: data.items,
                        destination: destination,
                        arrival: new Date(arrival).toISOString().split("T")[0],
                        departure: new Date(departure).toISOString().split("T")[0],
                        shippingAddress: {
                          firstName: data.firstName,
                          lastName: data.lastName,
                          streetAddress1: data.streetAddress1,
                          city: data.city,
                          postalCode: data.postalCode,
                          country: maybe(() => "PE", "PE" ) as CountryCode
                        }
                      },
                    },
                  });
                } else {
                  update({ checkout })
                  console.log( "ya existe checkout",update, this.props, checkout, cart )
                }
              }}
             />
          )}
        </TypedCreateCheckoutMutation>
        )}}
        </CartContext.Consumer>
      )}
    </CheckoutContext.Consumer>
  </> )
}
const getLines = (items) => {
  let lines = []
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const variant = item.variants ? item.variants[0] : null;
    const id = variant ? variant.id : null
    if ( id ) {
      const object = {
        quantity: 1,
        variantId: id
      }
      lines.push(object)
    }
  }
  return lines;
} 
class  Step7Container extends React.Component {
  constructor( props ){
    super( props );
    this.state={
      displayNewModal: false,
      showLogin: false,
      culqi: ()=>{},
    }
    this.setLogin = this.setLogin.bind(this);
    this.setDisplayNewModal = this.setDisplayNewModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setCulqi = this.setCulqi.bind(this);
  }
  setCulqi(culqi){
    this.setState({
      culqi,
    })
    this.setDisplayNewModal(true)
  }
  setLogin( login ){
    this.setState({
      showLogin: login,
    })
  }
  setDisplayNewModal( modal ){
    this.setState({
      displayNewModal: modal,
    })
  }
  onSubmit( data ){
    if( this.props.user ){
      this.setDisplayNewModal(false)
      this.props.onClick(
        {
          email: "kevin@gmail.com",
          items: this.props.cart.lines,
          firstName: data.firstName,
          lastName: data.lastName,
          streetAddress1: data.streetAddress1,
          city: data.city,
          postalCode: data.postalCode,
        }
      )
      this.state.culqi();
      console.log("USER", this.props, data)
    }else {
      this.setLogin(true)
      console.log("need login", this.props, data)
    }
  }
  
render(){
  
  const { step2, step3, step4, step5, step6 } = this.props.data;
  const allItems = [
    ...step2.items,
    ...step3.items,
    ...step4.items,
    ...step5.items,
    ...step6.items
  ];
  const total = getTotal(allItems);
  const shippingPrice = 5;
  const { displayNewModal,showLogin  } = this.state;
  console.log( this.props )
  return (
    <div className="container">
      <CulqiProvider
        publicKey="pk_test_6cZH0KR8piY52AOG"
        amount={(total + shippingPrice) * 100}
        title="HackPacking"
        currency="USD"
        description="Travel luggage free from anywhere in the World"
        onToken={token => {
          console.log("token received", token);
          alert("Payment success")
          window.location.href = "/account/";
        }}
        onError={error => {
          console.error("something bad happened", error);
          alert("Error")
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
            <table>
              <tr>
                <th style={{ textAlign: "start" }}>Clothes</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Type</th>
                <th style={{ textAlign: "center" }}>Color</th>
                <th style={{ textAlign: "center" }}>Size</th>
                <th style={{ textAlign: "end" }}>Total</th>
              </tr>
              {renderItem(step2.items, "Upperwear", "step2", this.props)}
              {renderItem(step3.items, "Lowerwear", "step3", this.props)}
              {renderItem(step4.items, "Underwear", "step4", this.props)}
              {renderItem(step5.items, "Socks", "step5", this.props)}
              {renderItem(step6.items, "Accesories", "step6", this.props)}
            </table>
            <hr />
            <center>
              <br />
              <br />
              <p>Shipping Price: $ {shippingPrice}</p>
              <p>Total price: $ {total + 5}</p>
            </center>
            <br />
          </div>
        </div>
        <Culqi>
          {({ openCulqi, setAmount, amount }) => {
            return (
              <div className="cnt-btn-checkout">
                  <button id="openculqi"  onClick={ ()=>this.setCulqi(openCulqi) }>Checkout</button>:
              </div>
            );
          }}
        </Culqi>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </CulqiProvider>
      <Modal
        loading={ false }
        title=""
        hide={ () => this.setDisplayNewModal(false)}
        show={displayNewModal}>
          <div>
            <div
              style={{
                padding: 20,
                display: "flex",
                justifyContent: "center",
                marginTop: 30,                   
              }}
            >
              {
                !showLogin?
                <ShippingAdressForm
                    hide={ () => this.setDisplayNewModal(false) }
                    buttonText="Checkout"
                    onSubmit={ ( data ) => this.onSubmit(data ) }
                    >
                      <div>
                      <button
                        style={{
                          fontWeight:500,
                          fontSize: 18,
                          padding: "0 20px",
                        }}
                        >Shipping Adress</button>
                        <br/>
                        <br/>
                      </div>
                    </ShippingAdressForm> :
                    <div
                    style={{
                      display:"flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                    >
                    <button
                      style={{
                        fontWeight:500,
                        fontSize: 18,
                        padding: "0 20px",
                      }}
                      >Sign In</button>
                      <br/>
                <LoginForm hide={ () =>{
                  this.setDisplayNewModal(false);
                  this.setLogin(false);
                  this.state.culqi();
                } }/>
                </div>

              }
              
            </div>
          </div>
      </Modal>
    </div>
  );
  }
};
export default Step7;
