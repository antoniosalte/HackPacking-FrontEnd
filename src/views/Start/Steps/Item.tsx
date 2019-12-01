import * as React from "react";
import {} from "react"

const ImageDefault = "https://cdn11.bigcommerce.com/s-hcp6qon/stencil/01eb2250-b30a-0137-ba33-0242ac110046/icons/icon-no-image.svg";

class ItemSteps extends React.Component {
    constructor(props){
        super(props);
        
        this.state={
            selectedColor: 1,
            countItem: 0,
            selectedSize: 1,
        }
        this.setSelectedColor = this.setSelectedColor.bind(this);
        this.setCountItem = this.setCountItem.bind( this );
        this.setSelectedSize = this.setSelectedSize.bind(this);
    }
    componentDidMount(){
        const { selectedColor,countItem,selectedSize } = this.props.details ?
        this.props.details :{ selectedColor:null,countItem:null,selectedSize:null };
        this.setState({
            selectedColor:  selectedColor  ||  1,
            countItem: countItem || 0,
            selectedSize: selectedSize || 1,
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
    setSelectedSize( selectedSize){
        this.setState({
            selectedSize
        }, () => this.props.onAddItem( this.state )) 
    }
    render() {
        const item = this.props.item.node
        const { countItem, selectedColor, selectedSize } = this.state;
        const colors = [ { color: "black",id: 1 }, { color: "white", id: 2} ]
        const sizes = [ { name: "S",id: 1 }, { name: "M", id: 2}, { name: "L", id: 3} ]
        return (
            <div className="container-wears__item">
                <img src={ item.images[0] ? item.images[0].url : ImageDefault } alt="image"/>
                <div className="details-item">
                    <div className="title-colors">
                        <span className="title-colors__c1">
                            { item.name }
                        </span>
                        <span className="title-colors__c2">
                            {
                                colors.map( (item,i) =>{
                                    return <div
                                        key={`coloritem-${i}`}
                                        className={ item.id === selectedColor ? "item-color selected-color" : "item-color" }
                                        style={{
                                            backgroundColor: item.color
                                        }}
                                        onClick={ () => this.setSelectedColor(item.id) }
                                    />
                                } )
                            }
                        </span>
                    </div>
                    <p className="description-item">
                        { item.description }
                    </p>
                    <div className="details-wear-item">
                        <div>
                            <span className="count-item">
                                <span
                                    onClick={ () => this.setCountItem(countItem-1)}
                                    className="plus-i"
                                    style={{ fontSize: 50}}
                                >-</span>
                                <div>{ countItem }</div>
                                <span onClick={ () => this.setCountItem(countItem+1) }
                                className="plus-i">+</span>
                            </span>
                            <div className="verticalline" />
                            <span className="talla-item">
                                <select name="select">
                                    {
                                        sizes.map( (size,index) =>{
                                            return(
                                                <option
                                                key={ `sizes-${index}`}
                                                value={ size.id }
                                                selected={ size.id === selectedSize }
                                                onChange={ ()=>this.setSelectedSize(size.id)}>
                                                    {size.name}
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
