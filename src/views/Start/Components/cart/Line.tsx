import * as React from "react";

import { LineI } from "../../../../components/CartTable/ProductRow";

const Line: React.FC<Omit<LineI, "totalPrice">> = (props) => { 
  const { id,
  product,
  pricing,
  name,
  quantity,
  cart
} = props;
  return(
  <tr key={id}>
      <td style={{ textAlign: "start" }}>{product.name}</td>
      <td style={{ textAlign: "center"}}>
        {quantity}
      </td>
      <td style={{ textAlign: "center" }}>{ "-" }</td>
      <td style={{ textAlign: "center" }}>
        <div
          className="color-point"
          style={{
            backgroundColor: "white",
            margin: "0 auto"
          }}
        />
      </td>
      <td style={{ textAlign: "center" }}>{name ? `(${name})` : null}</td>
      <td style={{ textAlign: "end" }}>
        {pricing.price.gross.localized}
      </td>
      <td
      >
        <div
          onClick={ () => cart.remove(id)}
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
        >&#10005;</div>
      </td>
    </tr>
  );
}
export default Line;
