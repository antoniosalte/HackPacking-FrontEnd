import * as React from "react";

import { Money } from "@components/containers";

import { CartInterface } from "../../../../components/CartProvider/context";
import { TypedProductVariantsQuery } from "../../../../views/Product/queries";
import { Checkout } from "../../../../checkout/types/Checkout"
import Line from "./Line";
import Subtotal from "./Subtotal";

const removeToItem = async ( cart ,id)=>{
  await cart.clearErrors()
    await cart.subtract(id) 
}
const addToItem= async (cart, id )=>{
  await cart.clearErrors()
    await cart.add(id) 
}
const replaceItem = async (cart, id, newId, quantity) => {
  await cart.clearErrors();
  await cart.remove(id);
  await cart.add(newId, quantity);
};
const Cart: React.FC<{
  cart: CartInterface;
  checkout: Checkout | null;
}> = ({ cart, checkout }) => {
  const { lines } = cart;
  return (
    <>
      {!checkout ? (
        <TypedProductVariantsQuery
          variables={{ ids: lines.map(line => line.variantId) }}
        >
          {(response) => 
          {
            const { data } = response;
            return(
            <>
            <table>
              <tr>
                <th style={{ textAlign: "start" }}>Clothes</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Stock</th>
                <th style={{ textAlign: "center" }}>Color</th>
                <th style={{ textAlign: "center" }}>Size</th>
                <th style={{ textAlign: "end" }}>Total</th>
              </tr>
              {
                lines.length > 0 && data.productVariants ?
                data.productVariants.edges.map(({ node }) =>(
                  <Line
                    key={node.id}
                    {...node}
                    variants={node.product.variants}
                    quantity={
                      lines.find(({ variantId }) => variantId === node.id) ?
                      lines.find(({ variantId }) => variantId === node.id).quantity : 0
                    }
                    cart={cart}
                    removeToItem={ ( id )=> removeToItem( cart, id ) }
                    addToItem={ ( id )=> addToItem( cart, id ) }
                    onChangeItem={(id, newId, quantity) => replaceItem(cart, id, newId, quantity)}
                  />)
                ) :
                null
              }
              </table>
              {
                lines.length > 0 ?
                <Subtotal checkout={checkout} variants={data} lines={lines} /> :
                <center>
                  <br /><br /><br />
                  <p>You haven't added items yet</p>
                </center>
              }
            </>
          )}}
        </TypedProductVariantsQuery>
      ) : (
        <>
        <table>
              <tr>
                <th style={{ textAlign: "start" }}>Clothes</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Stock</th>
                <th style={{ textAlign: "center" }}>Color</th>
                <th style={{ textAlign: "center" }}>Size</th>
                <th style={{ textAlign: "end" }}>Total</th>
              </tr>
              {checkout.lines.map(({ variant, quantity, id }) => (
                  <>
                    {console.log(variant.product)}
            <Line
                key={id}
                {...variant}
                variants={variant.product.variants}
                quantity={quantity}
                cart={cart}
                removeToItem={ ( id )=> removeToItem( cart, id ) }
                addToItem={ ( id )=> addToItem( cart, id ) }
                onChangeItem={(id, newId, quantity) => replaceItem(cart, id, newId, quantity)}
            />
            </>
          ))}
          </table>
          

          {
            lines.length > 0 ? 
           <> <Subtotal checkout={checkout} lines={lines} />
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
          </div> </>: 
          <center>
            <br /><br /><br />
            <p>You haven't added items yet</p>
          </center>
          }
           
        </> 
      )}
    </>
  );
};

export default Cart;
