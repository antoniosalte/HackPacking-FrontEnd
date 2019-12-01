import * as React from "react";
import "./sidebar.scss";

const getTotal = ( items) =>{
    let total = 0;
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const price = item.price.amount;
        const count = item.details.countItem;
        total += price * count;
    }
    return total;
}
class Sidebr extends React.Component{
    constructor( props ){
        super( props );
    }
    onDeleteElement( item, step ){
        let { items } = this.props.data[step];
        let newItems = items.filter( i => i.id !== item.id)
        const newstep = {
            items:newItems
        }
        this.props.setData( {[step]:newstep } );
    }
    renderItems( step = [],name ){
        return (
            <React.Fragment>
                {  
                    step.map( item =>{
                        return(
                            <div className="contianer-item-s">
                                <div>
                                    <span>{item.details.countItem}</span>
                                    <span>{item.name}</span>
                                </div>
                                <div>
                                    <span>$ {item.price.amount}</span>
                                    <span className="button-x"
                                    onClick={ () => this.onDeleteElement( item,name)}
                                    >&#10005;</span>
                                </div>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
        
    }
    render(){
        const { step1,step2,step3,step4,step5,step6 } = this.props.data;
        const allItems = [ ...step2.items,...step3.items,...step4.items,
            ...step5.items,...step6.items ]
        const total = getTotal(allItems)
        return (
            <div className="sidebar-container">
                <p>Trip to: { step1.destination} </p>
                <p>Arriving: { step1.arrival } </p>
                <p>Departing: { step1.departure}</p>
                <hr />
                <div style={{height: 250,overflowY: "scroll"}}>
                    {
                        this.renderItems(step2.items,"step2")
                    }
                    {
                        this.renderItems(step3.items,"step3")
                    }
                    {
                        this.renderItems(step4.items,"step4")
                    }
                    {
                        this.renderItems(step5.items,"step5")
                    }
                    {
                        this.renderItems(step6.items,"step6")
                    }
                </div>
                <div className="cont-botom">
                    <hr />
                    <div className="container-total-price">
                        <div>
                            <span>Shipping Price</span>
                            <span>Total Price</span>
                        </div>
                        <div>
                            <span>$ 5</span>
                            <span>$ {total + 5 }</span>
                        </div>
                    </div>
                    <br />
                    <div className="sidebar-container__button-checkout">
                        <button onClick={ ()=> this.props.toCheckout() }>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        )}
}
export default Sidebr;
