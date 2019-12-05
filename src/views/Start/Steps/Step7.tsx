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
const renderItem = (item, type) => {
  return (
    <React.Fragment>
      {item.map(item => {
        return (
          <tr>
            <td>{item.name}</td>
            <td>{item.details.countItem}</td>
            <td>{type}</td>
            <td>
              <div
                className="color-point"
                style={{
                  backgroundColor: "white"
                }}
              />
            </td>
            <td>M</td>
            <td>$ {item.price.amount * item.details.countItem}</td>
            <td>x</td>
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
  return (
    <div className="container">
      <CulqiProvider
        publicKey="pk_test_6cZH0KR8piY52AOG"
        amount={total * 100}
        title="HackPacking"
        description="HackPacking Description"
        onToken={token => {
          console.log("token received", token);
        }}
        onError={error => {
          console.error("something bad happened", error);
        }}
        options={{
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
                <th>Clothes</th>
                <th>Quantity</th>
                <th>Type</th>
                <th>Color</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
              {renderItem(step2.items, "Upperwear")}
              {renderItem(step3.items, "Lowerwear")}
              {renderItem(step4.items, "Underwear")}
              {renderItem(step5.items, "Socks")}
              {renderItem(step6.items, "Accesories")}
            </table>
            <hr />
            <center>
              <p>Total price: ${total}</p>
            </center>
            <br />
            <br />
            <br />
          </div>
        </div>
        <Culqi>
          {({ openCulqi, setAmount, amount }) => {
            return (
              <div className="cnt-btn-checkout">
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
