import * as React from "react";
import { Loader, MetaWrapper } from "../../../components";
import { maybe } from "../../../core/utils";
import { TypedStep4Query } from "./queries/queries";
import { ProductsList } from "./types/ProductsList";

import "./stylesteps.scss";
import Item from "./Item";

const canDisplay = (data: ProductsList) =>
  maybe(() => !!data.products);

class Step4 extends React.Component{
    constructor( props ){
        super( props );
        this.onAddItem = this.onAddItem.bind( this )
    }
    onAddItem( item, details ){
        let { items } = this.props.data.step4;
        let newItems = items.filter( i => i.id !== item.id)
        if ( details.countItem > 0){
            const newI = {
                ...item,
                details: details
            
            }
            newItems.push( newI )
        }
        const step4 = {
            items:newItems
        }
        this.props.setData( { step4 } );
    }
    render(){
        const { items } = this.props.data.step4;
        return (
            <div className="container">
                <TypedStep4Query alwaysRender displayLoader={false} errorPolicy="all">
                    {({ data, loading }) => {
                        if (canDisplay(data)) {
                        return (
                            <MetaWrapper
                            meta={{
                                description: "Step 4",
                                title: "HackPacking - Underwear",
                            }}
                            >
                            <React.Fragment>
                                <br/>
                                <p>Choose your underwear</p>
                                <div className="container-wears">
                                    {
                                        data.products.edges.map( (item,index) => {
                                            const itemSelected = items.find( x => x.id === item.node.id )
                                            return (
                                                <Item
                                                    item={item}
                                                    key={`item-step2-${index}`}
                                                    onAddItem={ (details) => this.onAddItem(item.node,details) }
                                                    details={ itemSelected ? itemSelected.details : null }
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </React.Fragment>
                            </MetaWrapper>
                        );
                        }

                        return <Loader full />;
                    }}
                </TypedStep4Query>
            </div>
        )
    }
}
export default Step4;
