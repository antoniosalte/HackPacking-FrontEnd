import * as React from "react";
import { MetaWrapper } from "../../../components";
import "./stylesteps.scss";
import Item from "./Item";

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  onAdd(cart, variant) {
    cart.add(variant) 
    cart.clearErrors()
  }
  onRemove(cart, variant) {
    cart.subtract(variant);
    cart.clearErrors()
  }
  render() {
    const { data, title, subTitle, meta, cart } = this.props;
    return (
      <MetaWrapper
        meta={{
          description: meta.description,
          title: "HackPacking - " + meta.title
        }}
      >
        <React.Fragment>
          <br />
          <p className="title-steps">{title}</p>
          <p className="sub-title-steps">{subTitle}</p>
          <div className="container-wears">
            {data.products.edges && data.products.edges.length > 0
              ? data.products.edges.map((item, index) => {
                  if (item.node.variants && item.node.variants.length > 0) {
                    let line = null;
                    for (let index = 0; index < cart.lines.length; index++) {
                      const li = cart.lines[index];
                      for (let i = 0; i < item.node.variants.length; i++) {
                        const variant = item.node.variants[i];
                        if (li.variantId === variant.id) {
                          line = li;
                        }
                      }
                    }
                    return (
                      <Item
                        item={item}
                        key={`item-step2-${index}`}
                        onAdd={variant => this.onAdd(cart, variant)}
                        onRemove={variant => this.onRemove(cart, variant)}
                        cart={cart}
                        variant={
                          line ? line.variantId : item.node.variants[0].id
                        }
                        countItem={line ? line.quantity : 0}
                        stockQuantity={
                          line ? 100 : item.node.variants[0].stockQuantity
                        }
                      />
                    );
                  }
                })
              : null}
          </div>
          {cart.errors ? cart.errors.map(err => (
              <p style={{ color: "red", fontSize: 12 }}>{err.message}</p>
            )):null
          }
        </React.Fragment>
      </MetaWrapper>
    );
  }
}
export default Wrapper;
