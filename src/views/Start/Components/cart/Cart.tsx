import * as React from "react";

import { Money } from "@components/containers";

import { CartInterface } from "../../../../components/CartProvider/context";
import { TypedProductVariantsQuery } from "../../../../views/Product/queries";
import { Checkout } from "../../../../checkout/types/Checkout"
import Line from "./Line";
import Subtotal from "./Subtotal";

const Cart: React.FC<{
  cart: CartInterface;
  checkout: Checkout | null;
}> = ({ cart: { lines }, checkout }) => {
  console.log( "RENDER CART" )
  return (
    <>
      {!checkout ? (
        <TypedProductVariantsQuery
          variables={{ ids: lines.map(line => line.variantId) }}
        >
          {({ data }) => (
            <>
            <table>
              <tr>
                <th style={{ textAlign: "start" }}>Clothes</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Type</th>
                <th style={{ textAlign: "center" }}>Color</th>
                <th style={{ textAlign: "center" }}>Size</th>
                <th style={{ textAlign: "end" }}>Total</th>
              </tr>
              {
                lines.length > 0 ?
                data.productVariants.edges.map(({ node }) =>(
                  <Line
                    key={node.id}
                    {...node}
                    quantity={
                      lines.find(({ variantId }) => variantId === node.id) ?
                      lines.find(({ variantId }) => variantId === node.id).quantity : 0
                    }
                  />)
                ) : <p>You haven't added items yet</p>
              }
              </table>
              <Subtotal checkout={checkout} variants={data} lines={lines} />
            </>
          )}
        </TypedProductVariantsQuery>
      ) : (
        <>
        <table>
              <tr>
                <th style={{ textAlign: "start" }}>Clothes</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Type</th>
                <th style={{ textAlign: "center" }}>Color</th>
                <th style={{ textAlign: "center" }}>Size</th>
                <th style={{ textAlign: "end" }}>Total</th>
              </tr>
              {checkout.lines.map(({ variant, quantity, id }) => (
            <Line key={id} {...variant} quantity={quantity} />
          ))}
          </table>
          
          <Subtotal checkout={checkout} lines={lines} />

          <div
          style={{display:"flex",
          alignItems:"center",
          flexDirection:"column",
          }}>
            <p
            style={{
            margin: "5px 0",
            }}>Shipping Price:&nbsp;
            <Money defaultValue="-" money={checkout.shippingPrice.gross} />
            </p>
            <p
            style={{
            margin: "5px 0",
            }}>Total Price:&nbsp;
            $ { ( checkout.subtotalPrice.gross.amount +  checkout.shippingPrice.gross.amount ).toFixed(2)  }
            </p>
          </div>
        </> 
      )}
    </>
  );
};

export default Cart;
