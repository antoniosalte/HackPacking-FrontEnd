import * as React from "react";

import { LineI } from "../../../../components/CartTable/ProductRow";

const Line: React.FC<Omit<LineI, "totalPrice">> = ({
  id,
  product,
  pricing,
  name,
  quantity,
}) => (
  <div className="contianer-item-s" key={id}>
      <div>
          <span>{quantity}</span>
          <span>{product.name}</span>
      </div>
      <div>
          <span>${ (Number( pricing.price.gross.amount) * Number(quantity)).toFixed(2)}</span>
      </div>
  </div>
  );
export default Line;
