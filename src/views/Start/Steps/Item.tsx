import * as React from "react";
import {} from "react"

const ImageDefault = "https://cdn11.bigcommerce.com/s-hcp6qon/stencil/01eb2250-b30a-0137-ba33-0242ac110046/icons/icon-no-image.svg";

class ItemSteps extends React.Component {
    constructor(props){
        super(props);
        this.state={
            countItem: 0,
            variant: null,
        }
        this.onAdd = this.onAdd.bind( this );
        this.onRemove = this.onRemove.bind( this );
        this.setVariant = this.setVariant.bind(this);
    }
    componentDidMount(){
        this.setState({
            countItem: this.props.countItem,
            variant: this.props.variant,
        })
    }
    onRemove(){
        let { countItem, variant } =this.state;
        if ( countItem > 0 ) {
            countItem -= 1;
            this.props.onRemove(variant)
        }
        this.setState({
            countItem,
        })
    }
    onAdd(){
        let { countItem,variant } =this.state;
        if ( countItem < 100 ) {
            countItem += 1;
            this.props.onAdd(variant)
        }
        this.setState({
            countItem,
        })
    }
    setVariant( e){
        const { variant } = this.state;
        const newvariant = e.target.value
        this.setState({
            variant: newvariant,
            countItem: 0,
        })
        this.props.cart.remove( variant )
    }
    render() {
        const item = this.props.item.node
        const { countItem, variant: variantId } = this.state;
        const {variants} = item;
        return (
            <div className="container-wears__item">
                <img src={ item.images[0] ? item.images[0].url : ImageDefault } alt="image"/>
                <div className="details-item">
                    <div className="title-colors">
                        <span className="title-colors__c1">
                            { item.name }
                        </span>
                    </div>
                    <p className="description-item">
                        { item.description }
                    </p>
                    <div className="details-wear-item">
                        <div>
                            <span className="count-item">
                                <span
                                    onClick={ this.onRemove }
                                    className="plus-i"
                                    style={{ fontSize: 50}}
                                >-</span>
                                <div>{ countItem }</div>
                                <span onClick={ this.onAdd }
                                className="plus-i">+</span>
                            </span>
                            <div className="verticalline" />
                            <span className="talla-item">
                                <select name="select"
                                onChange={ this.setVariant}
                                >
                                    {
                                        variants.map( (variant,index) =>{
                                            return(
                                                <option
                                                key={ `sizes-${index}`}
                                                value={ variant.id }
                                                selected={ variant.id == variantId }
                                                >
                                                    {variant.name.split("/").pop()}
                                                </option> 
                                            )
                                        } )
                                    }
                                </select>
                            </span>
                        </div>
                        <span className="price-item">$ { item.price.amount }</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default ItemSteps;
