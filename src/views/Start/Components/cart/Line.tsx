import * as React from "react";

import { LineI } from "../../../../components/CartTable/ProductRow";

const Line: React.FC<Omit<LineI, "totalPrice">> = ({
  id,
  product,
  pricing,
  name,
  quantity,
}) => (
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
    </tr>
  );
export default Line;
