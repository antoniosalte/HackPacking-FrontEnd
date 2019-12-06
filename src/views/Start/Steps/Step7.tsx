import * as React from "react";
import "../styles/styles.scss";
import { CulqiProvider, Culqi } from "react-culqi";

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
            <td style={{ textAlign: "center" }}>M</td>
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

const Step7 = props => {
  const { step2, step3, step4, step5, step6 } = props.data;
  const allItems = [
    ...step2.items,
    ...step3.items,
    ...step4.items,
    ...step5.items,
    ...step6.items
  ];
  const total = getTotal(allItems);
  const shippingPrice = 5;
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
        }}
        onError={error => {
          console.error("something bad happened", error);
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
              {renderItem(step2.items, "Upperwear", "step2", props)}
              {renderItem(step3.items, "Lowerwear", "step3", props)}
              {renderItem(step4.items, "Underwear", "step4", props)}
              {renderItem(step5.items, "Socks", "step5", props)}
              {renderItem(step6.items, "Accesories", "step6", props)}
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
                // Antes de Culqi deberia pedirte los datos de Envio // Luego
                verificar si estas logeado o no, sino no estas Logeado deberias
                logearte para pagar // Luego de logearte se abre el Checkout
                <button onClick={openCulqi}>Checkout</button>
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
    </div>
  );
};
export default Step7;
