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
        }
        this.onAdd = this.onAdd.bind( this );
        this.onRemove = this.onRemove.bind( this );
        this.setVariant = this.setVariant.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
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
    onRemove(){
        let { countItem, variant } =this.state;
        if ( countItem > 0 ) {
            countItem -= 1;
            this.setState({
                countItem,
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
    render() {
        const item = this.props.item.node
        const { variant: variantId } = this.state;
        const {variants} = item;
        const { loading } = this.props.cart;
        const { countItem,stockQuantity } = this.props;
        return (
            <div className="container-wears__item">
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
                                <div>{ countItem }</div>
                                <span onClick={ !loading?this.onAdd : () =>{}}
                                style={
                                    loading?{
                                        color:"#84bd005c"
                                    }:{}
                                }
                                className="plus-i">+</span>
                            </span>
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
                        </div>
                        <span className="price-item">$ { item.price.amount }</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default ItemSteps;
