import * as React from "react";
import { Loader, MetaWrapper } from "../../../components";
import { maybe } from "../../../core/utils";
import { TypedStep5Query } from "./queries/queries";
import { ProductsList } from "./types/ProductsList";
import { CartContext } from "../../../components/CartProvider/context";

import "./stylesteps.scss";
import Item from "./Item";

const canDisplay = (data: ProductsList) =>
  maybe(() => !!data.products);

class Step5 extends React.Component{
    constructor( props ){
        super( props );
        this.onAddItem = this.onAddItem.bind( this )
    }
    onAddItem( item, details, cart ){
        cart.remove( details.selectedSize )
        if ( details.countItem > 0 ){
            cart.add(details.selectedSize,details.countItem)
        }
        let { items } = this.props.data.step5;
        let newItems = items.filter( i => i.id !== item.id)
        if ( details.countItem > 0){
            const newI = {
                ...item,
                details: details
            
            }
            newItems.push( newI )
        }
        const step5 = {
            items:newItems
        }
        this.props.setData( { step5 } );
    }
    render(){
        const { items } = this.props.data.step5;

        return (
            <div className="container">
                <CartContext.Consumer>
                {cart => (
                <TypedStep5Query alwaysRender displayLoader={false} errorPolicy="all">
                    {({ data, loading }) => {
                        if (canDisplay(data)) {
                        return (
                            <MetaWrapper
                            meta={{
                                description: "Step 5",
                                title: "HackPacking - Socks",
                            }}
                            >
                            <React.Fragment>
                                <br/>
                                <p className="title-steps">Choose your socks</p>
                                <div className="container-wears">
                                    {
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
                                                        onAddItem={ (details) => this.onAddItem(item.node,details, cart) }
                                                        details={ line ? {
                                                            countItem: line.quantity,
                                                            selectedSize: line.variantId,
                                                        } : null }
                                                    />
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </React.Fragment>
                            </MetaWrapper>
                        );
                        }

                        return <Loader full />;
                    }}
                </TypedStep5Query>)}
                </CartContext.Consumer>
            </div>
        )
    }
}
export default Step5;
