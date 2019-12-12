import * as React from "react";
import {} from "react"

const ImageDefault = "https://cdn11.bigcommerce.com/s-hcp6qon/stencil/01eb2250-b30a-0137-ba33-0242ac110046/icons/icon-no-image.svg";

class ItemSteps extends React.Component {
    constructor(props){
        super(props);
        
        this.state={
            selectedColor: 1,
            countItem: 0,
            selectedSize: null,
        }
        this.setSelectedColor = this.setSelectedColor.bind(this);
        this.setCountItem = this.setCountItem.bind( this );
        this.setSelectedSize = this.setSelectedSize.bind(this);
    }
    componentDidMount(){
        const { selectedColor,countItem,selectedSize } = this.props.details ?
        this.props.details :{ selectedColor:null,countItem:null,selectedSize:null };
        const item = this.props.item.node
        this.setState({
            selectedColor:  selectedColor  ||  1,
            countItem: countItem || 0,
            selectedSize: selectedSize || item.variants[0].id,
        })
    }
    setSelectedColor(selectedColor){
        this.setState({
            selectedColor
        }, () => this.props.onAddItem( this.state ))
    }
    setCountItem(countItem){
        this.setState({
            countItem
        }, () => this.props.onAddItem( this.state )) 
    }
    setSelectedSize( e){
        const selectedSize = e.target.value
        this.setState({
            selectedSize,
            countItem: 0,
        })
    }
    render() {
        const item = this.props.item.node
        const { countItem, selectedColor, selectedSize } = this.state;
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
                                    onClick={ () => this.setCountItem(countItem > 0 ? countItem-1:countItem)}
                                    className="plus-i"
                                    style={{ fontSize: 50}}
                                >-</span>
                                <div>{ countItem }</div>
                                <span onClick={ () => this.setCountItem(countItem+1) }
                                className="plus-i">+</span>
                            </span>
                            <div className="verticalline" />
                            <span className="talla-item">
                                <select name="select"
                                onChange={ this.setSelectedSize}
                                >
                                    {
                                        variants.map( (variant,index) =>{
                                            return(
                                                <option
                                                key={ `sizes-${index}`}
                                                value={ variant.id }
                                                selected={ variant.id == selectedSize }
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
