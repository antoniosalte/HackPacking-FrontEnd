import * as React from "react";
import "../styles/styles.scss";

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
const renderItem = (item, type) =>{
    return(
        <React.Fragment>
            {
                item.map( item => {
                    return (
                        <tr>
                            <td>{ item.name}</td>
                            <td>{item.details.countItem}</td>
                            <td>{ type }</td>
                            <td>
                                <div className="color-point"
                                style={{
                                    backgroundColor: "white"
                                }} />
                            </td>
                            <td>M</td>
                            <td>$ {item.price.amount * item.details.countItem}</td>
                            <td>x</td>
                        </tr>
                    )
                })
            }

        </React.Fragment>
        
    )
}

const Step7 = ( props ) => {
    const { step2,step3,step4,step5,step6 } = props.data;
    const allItems = [ ...step2.items,...step3.items,...step4.items,
        ...step5.items,...step6.items ]
    const total = getTotal(allItems)
    return (
        <div className="container">
            <p style={{fontSize: 18,fontWeight: "500"}}>Overview</p>
            <div className="containr-overview">
                <div className="c-overview">
                    <table>
                        <tr>
                            <th>Clothes</th>
                            <th>Quantity</th> 
                            <th>Type</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Total</th>
                        </tr>
                        {
                            renderItem( step2.items, "Upperwear" )
                        }
                        {
                            renderItem( step3.items, "Lowerwear" )
                        }
                        {
                            renderItem( step4.items, "Underwear" )
                        }
                        {
                            renderItem( step5.items, "Socks" )
                        }
                        {
                            renderItem( step6.items, "Accesories" )
                        }
                    </table>
                    <hr/>
                    <center>
                        <p>Total price: ${total}</p>
                    </center>
                    <br /><br /><br />
                </div>
            </div>
            <div className="cnt-btn-checkout">
                <button onClick={ () => { alert("checkout") } }>
                    Checkout 
                </button>
            </div>
            <br /><br /><br /><br /><br /><br />
        </div>
    )
}
export default Step7;
