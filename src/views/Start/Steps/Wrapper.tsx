import * as React from "react";
import { MetaWrapper } from "../../../components";
import Item from "./Item";
import "./stylesteps.scss";

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  async onAdd(cart, variant, count = 1) {
    await cart.clearErrors();
    await cart.add(variant, count);
  }
  async onRemove(cart, variant, count = 1) {
    await cart.clearErrors();
    await cart.subtract(variant, count);
  }
  async onSet(cart, variant, count = 1) {
    await cart.clearErrors();
    await cart.remove(variant);
    await cart.add(variant, count);
  }
  filterProduct(x) {
    const { male } = this.props;
    if (x.node.collections.length < 1) {
      return null; // this product dont have collections
    }
    if (male) {
      if (
        x.node.collections.length === 1 &&
        x.node.collections[0].name === "Men"
      ) {
        return x; // this product have only one collection
      }
      if (
        x.node.collections.length === 2 &&
        (x.node.collections[0].name === "Men" ||
          x.node.collections[1].name === "Men")
      ) {
        return x; // this product have 2 collection
      }
    } else {
      if (
        x.node.collections.length === 1 &&
        x.node.collections[0].name === "Women"
      ) {
        return x; // this product have only one collection
      }
      if (
        x.node.collections.length === 2 &&
        (x.node.collections[0].name === "Women" ||
          x.node.collections[1].name === "Women")
      ) {
        return x; // this product have 2 collection
      }
    }
    return null;
  }
  render() {
    const { data, title, subTitle, meta, cart, male } = this.props;
    const edges = data.products.edges.filter(x => this.filterProduct(x));
    return (
      <MetaWrapper
        meta={{
          description: meta.description,
          title: "HackPacking - " + meta.title,
        }}
      >
        <React.Fragment>
          <br />
          <p className="sub-title-steps">{subTitle}</p>
          <div className="container-wears">
            {edges && edges.length > 0
              ? edges.map((item, index) => {
                  if (item.node.variants && item.node.variants.length > 0) {
                    let line = null;
                    for (const li of cart.lines) {
                      for (const variant of item.node.variants) {
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
                        onSet={(variant, c) => this.onSet(cart, variant, c)}
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
          {cart.errors
            ? cart.errors.map(err => (
                <p style={{ color: "red", fontSize: 12 }}>{err.message}</p>
              ))
            : null}
        </React.Fragment>
      </MetaWrapper>
    );
  }
}
export default Wrapper;
