import * as React from "react";

import { Money } from "@components/containers";

import { CartInterface } from "../../../../components/CartProvider/context";
import { TypedProductVariantsQuery } from "../../../../views/Product/queries";
import { Checkout } from "../../../../checkout/types/Checkout";
import Line from "./Line";
import Subtotal from "./Subtotal";

const Cart: React.FC<{
  cart: CartInterface;
  checkout: Checkout | null;
}> = ({ cart: { lines }, checkout }) => {
  return (
    <>
      {!checkout ? (
        <TypedProductVariantsQuery
          variables={{ ids: lines.map(line => line.variantId) }}
        >
          {({ data, loading }) => (
            <>
              <div style={{ height: 250, overflowY: "scroll" }}>
                {lines.length > 0 ? (
                  data.productVariants.edges.map(({ node }) => (
                    <Line
                      key={node.id}
                      {...node}
                      quantity={
                        lines.find(({ variantId }) => variantId === node.id)
                          ? lines.find(({ variantId }) => variantId === node.id)
                              .quantity
                          : 0
                      }
                    />
                  ))
                ) : (
                  <p>You haven't added items yet</p>
                )}
              </div>
              {!loading && (
                <Subtotal checkout={checkout} variants={data} lines={lines} />
              )}
            </>
          )}
        </TypedProductVariantsQuery>
      ) : (
        <>
          <div style={{ height: 200, overflowY: "scroll" }}>
            {checkout.lines.map(({ variant, quantity, id }) => (
              <Line key={id} {...variant} quantity={quantity} />
            ))}
          </div>
          <Subtotal checkout={checkout} lines={lines} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                margin: "5px 0",
              }}
            >
              Shipping Price:&nbsp;
              <Money defaultValue="-" money={checkout.shippingPrice.gross} />
            </p>
            <p
              style={{
                margin: "5px 0",
              }}
            >
              Total Price:&nbsp; ${" "}
              {(
                checkout.subtotalPrice.gross.amount +
                checkout.shippingPrice.gross.amount
              ).toFixed(2)}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
