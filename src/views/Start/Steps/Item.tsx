import * as React from "react";
import {} from "react"

const ImageDefault = "https://cdn11.bigcommerce.com/s-hcp6qon/stencil/01eb2250-b30a-0137-ba33-0242ac110046/icons/icon-no-image.svg";

function createMarkup( html ) {
    return {__html: html};
}

class ItemSteps extends React.Component {
    constructor(props){
        super(props);
        this.state={
            countItem: 0,
            variant: null,
            stockQuantity:100,
            totalitem: null,
        }
        this.onAdd = this.onAdd.bind( this );
        this.onRemove = this.onRemove.bind( this );
        this.setVariant = this.setVariant.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.changeTotalItems = this.changeTotalItems.bind(this);
        this.onSetCount = this.onSetCount.bind( this );
    }
    componentDidMount(){
        this.setState({
            countItem: Number(this.props.countItem),
            variant: this.props.variant,
        })
    }
    componentWillReceiveProps( newProps ){
        if( this.props !== newProps){
            this.setState({
                countItem: Number(this.props.countItem),
            })
        }
    }
    onChangeInput( e ){
        const { value } = e.target;
        let { countItem,variant } =this.state;
        if( Number(value) != countItem ){
            this.props.onChangeInput(variant,Number(value),Number(countItem))
            this.setState({
                countItem:Number(value),
            })
        }
        
    }
    onSetCount(){
        let { totalitem, variant } =this.state;
        this.props.onSet(variant, totalitem)
    }
    onRemove(){
        let { countItem, variant } =this.state;
        if ( countItem > 0 ) {
            countItem -= 1;
            this.setState({
                countItem,
                totalitem: null
            })
            this.props.onRemove(variant)
        }
        
    }
    onAdd(){
        let { countItem,variant,stockQuantity } =this.state;
        if ( countItem < stockQuantity ) {
            countItem += 1;
            this.setState({
                countItem,
                totalitem: null,
            })
            this.props.onAdd(variant)
        }
        
    }
    setVariant( e){
        const { variant } = this.state;
        const newvariant = e.target.value
        this.props.cart.remove( variant )
        this.setState({
            variant: newvariant,
            countItem: 0,
        })
    }
    changeTotalItems( e ){
        this.setState({
            totalitem: Number(e.target.value)
        })
    }
    render() {
        const item = this.props.item.node
        const { variant: variantId , totalitem } = this.state;
        const {variants} = item;
        const { loading } = this.props.cart;
        const { countItem,stockQuantity } = this.props;
        const tItems = totalitem ? totalitem : countItem
        return (
            <div className="container-wears__item"
            style={
                totalitem ?
                {
                    height: 330
                } :
                {
                    height: 310
                }
            }
            >
                <img src={ item.images[0] ? item.images[0].url : ImageDefault } alt="image"/>
                <div className="details-item">
                    <div className="title-colors">
                        <span className="title-colors__c1">
                            { item.name }
                        </span>
                    </div>
                    <p className="description-item"
                    dangerouslySetInnerHTML={createMarkup( item.description )} />
                    <div className="details-wear-item">
                        <div>
                            <span className="count-item">
                                <span
                                    onClick={ !loading?this.onRemove : () =>{}}
                                    className="plus-i"
                                    style={
                                        loading?{
                                            color:"#84bd005c",
                                            fontSize: 50
                                        }:{fontSize: 50}
                                    }
                                >-</span>
                                <input 
                                    type="number"
                                    value={ tItems }
                                    onChange={ this.changeTotalItems }
                                />
                                <span onClick={ !loading?this.onAdd : () =>{}}
                                style={
                                    loading?{
                                        color:"#84bd005c"
                                    }:{}
                                }
                                className="plus-i">+</span>
                            </span>
                            {
                                variants.length > 1 ?
                                <>
                                    <div className="verticalline" />
                                    <span className="talla-item">
                                        <select name="select"
                                        onChange={ !loading? this.setVariant : () =>{}}
                                        >
                                            {
                                                variants.map( (variant,index) =>{
                                                    return(
                                                        <option
                                                        key={ `sizes-${index}`}
                                                        value={ variant.id }
                                                        selected={ variant.id == variantId }
                                                        >
                                                            {variant.name}
                                                        </option> 
                                                    )
                                                } )
                                            }
                                        </select>
                                    </span>
                                </>: null
                            }
                        </div>
                        <span className="price-item">$ { item.price.amount }</span>
                    </div>
                    <div
                    style={
                        totalitem ?
                        {
                            display: "flex"
                        } :
                        {
                            display: "none"
                        }
                    }
                    className="button-confirm-item"
                    onClick={ this.onSetCount }
                    >
                            add
                    </div>
                </div>
            </div>
        )
    }
}
export default ItemSteps;
