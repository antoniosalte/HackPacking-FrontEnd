import * as React from "react";
import { Loader, MetaWrapper } from "../../../components";
import { maybe } from "../../../core/utils";
import { ProductsList } from "./types/ProductsList";

import "./stylesteps.scss";
import Item from "./Item";


const canDisplay = (data: ProductsList) =>
  maybe(() => !!data.products);

class Wrapper extends React.Component{
    constructor( props ){
        super( props );
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }
    onAdd(cart, variant){
        cart.add(variant)
    }
    onRemove(cart,variant){
        cart.subtract(variant)
    }
    render(){
        const {
            TypedQuery,
            title,
            meta,
            cart,
        } = this.props;
        return (
            <TypedQuery alwaysRender displayLoader={false} errorPolicy="all">
                {({ data, loading }) => {
                    if (canDisplay(data)) {
                    return (
                        <MetaWrapper
                        meta={{
                            description: meta.description,
                            title: "HackPacking - "+meta.title,
                        }}
                        >
                        <React.Fragment>
                            <br/>
                            <p className="title-steps">{title}</p>
                            <div className="container-wears">
                                {
                                    data.products.edges && data.products.edges.length > 0 ?
                                    data.products.edges.map( (item,index) => {
                                        if ( item.node.variants &&  item.node.variants.length > 0){
                                            let line = null;
                                            for (let index = 0; index < cart.lines.length; index++) {
                                                const li = cart.lines[index];
                                                for (let i = 0; i < item.node.variants.length; i++) {
                                                    const variant = item.node.variants[i];
                                                    if(li.variantId === variant.id ){
                                                        line = li;
                                                    }
                                                }
                                            }
                                            return (
                                                <Item
                                                    item={item}
                                                    key={`item-step2-${index}`}
                                                    onAdd={ (variant) => this.onAdd(cart, variant) }
                                                    onRemove={ (variant) => this.onRemove(cart, variant) }
                                                    cart={cart}
                                                    variant= { line ? line.variantId : item.node.variants[0].id }
                                                    countItem= { line? line.quantity : 0 }
                                                />
                                            )
                                        }
                                    }) : null
                                }
                            </div>
                        </React.Fragment>
                        </MetaWrapper>
                    );
                    }

                    return <Loader full />;
                }}
            </TypedQuery>
        )
    }
}
export default Wrapper;