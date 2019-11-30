import * as React from "react";

const ItemSteps = ( props ) => {
    const { item } = props
    return (
        <div className="container-wears__item">
            <img src={ item.image } alt="image"/>
            <div className="details-item">
                <div className="title-colors">
                    <span className="title-colors__c1">
                        { item.title }
                    </span>
                    <span className="title-colors__c2">
                        colors
                    </span>
                </div>
                <p className="description-item">
                    { item.description }
                </p>
                <div className="details-wear-item">
                    <div>
                        <span className="count-item">1</span>
                        <span className="talla-item">M</span>
                    </div>
                    <span className="price-item">$ { item.price }</span>
                </div>
            </div>
        </div>
    )
}
export default ItemSteps;
