import * as React from "react";

import { LineI } from "../../../../components/CartTable/ProductRow";

const Line: React.FC<Omit<LineI, "totalPrice">> = props => {
  const { id, product, pricing, name, quantity, variants, cart } = props;
  const { loading } = cart;
  let productVariant = [];
  if (variants) {
    productVariant = variants.filter(variant => variant.isAvailable);
  }
  const colors = [
    "white",
    "blue",
    "orange",
    "black",
    "cyan",
    "gray",
    "red",
    "brown",
    "green",
    "yellow",
    "pink",
    "purple",
  ];
  let color = "white";

  const split = name.split("/");
  split.forEach(element => {
    const re = / /gi;
    element = element.replace(re, "").toLowerCase();
    colors.forEach(element_color => {
      if (element_color === element) {
        color = element;
      }
    });
  });
  const width = window.innerWidth;
  const show = width >= 500 ? true : false;
  return (
    <tr key={id}>
      <td align="center" style={{ textAlign: "start" }}>
        {product.name}
      </td>
      <td align="center" style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex" }}>
          <div
            className="btn-add-count-quantity"
            style={
              loading
                ? {
                    backgroundColor: "#84bd005c",
                  }
                : {}
            }
            onClick={() => (!loading ? props.removeToItem(id) : null)}
          >
            -
          </div>
          <span style={{ margin: "0 10px" }}> {quantity} </span>
          <div
            className="btn-minus-count-quantity"
            style={
              loading
                ? {
                    backgroundColor: "#84bd005c",
                  }
                : {}
            }
            onClick={() => (!loading ? props.addToItem(id) : null)}
          >
            +
          </div>
        </div>
      </td>

      {show ? (
        <td style={{ textAlign: "center" }} align="center">
          {props.stockQuantity ? props.stockQuantity : "-"}
        </td>
      ) : null}

      {show ? (
        <td style={{ textAlign: "center" }}>
          <div
            className="color-point"
            style={{
              backgroundColor: color,
              margin: "0 auto",
            }}
          />
        </td>
      ) : null}
      <td style={{ textAlign: "center" }} align="center">
        {productVariant.length < 2 ? (
          name ? (
            `(${name})`
          ) : null
        ) : (
          <span className="overview-talla-item">
            <select
              name="select"
              onChange={
                !loading
                  ? e => props.onChangeItem(id, e.target.value, quantity)
                  : () => {}
              }
            >
              {productVariant.map((variant, index) => {
                return (
                  <option
                    key={`sizes-${index}`}
                    value={variant.id}
                    selected={variant.id === id}
                  >
                    {variant.name}
                  </option>
                );
              })}
            </select>
          </span>
        )}
      </td>
      <td style={{ paddingLeft: 0, paddingRight: 0, textAlign: "end" }}>
        <span>
          $ {(Number(pricing.price.gross.amount) * Number(quantity)).toFixed(2)}
        </span>
      </td>
      <td>
        <div
          onClick={() => cart.remove(id)}
          style={{
            color: "white",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            width: 20,
            cursor: "pointer",
            height: 20,
            fontSize: 10,
          }}
        >
          &#10005;
        </div>
      </td>
    </tr>
  );
};
export default Line;
