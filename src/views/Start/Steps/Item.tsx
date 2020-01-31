import * as React from "react";
import {} from "react";

const ImageDefault =
  "https://cdn11.bigcommerce.com/s-hcp6qon/stencil/01eb2250-b30a-0137-ba33-0242ac110046/icons/icon-no-image.svg";

function createMarkup(html) {
  return { __html: html };
}

class ItemSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countItem: 0,
      countItemString: "",
      isSelected: false,
      variant: null,
      stockQuantity: 100,
      totalitem: null
    };
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.setVariant = this.setVariant.bind(this);
    this.changeTotalItems = this.changeTotalItems.bind(this);
    this.onSaveTotalItems = this.onSaveTotalItems.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  componentDidMount() {
    this.setState({
      countItem: Number(this.props.countItem),
      variant: this.props.variant
    });
  }
  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({
        countItem: Number(this.props.countItem)
        //variant: newProps.variant,
      });
    }
  }
  onBlur() {
    this.setState({
      isSelected: false,
      countItemString: ""
    });
  }
  onFocus() {
    this.setState({
      isSelected: true
    });
  }
  getItemCount() {
    const { countItem } = this.props;
    const { isSelected, countItemString } = this.state;
    if (isSelected) {
      return countItemString;
    }
    return countItem;
  }
  onRemove() {
    let { countItem, variant } = this.state;
    if (countItem > 0) {
      countItem -= 1;
      this.setState({
        countItem,
        totalitem: null
      });
      this.props.onRemove(variant);
    }
  }
  onAdd() {
    let { countItem, variant, stockQuantity } = this.state;
    if (countItem < stockQuantity) {
      countItem += 1;
      this.setState({
        countItem,
        totalitem: null
      });
      this.props.onAdd(variant);
    }
  }
  setVariant(e) {
    const { variant } = this.state;
    const newvariant = e.target.value;
    this.props.cart.remove(variant);
    this.setState({
      variant: newvariant,
      countItem: 0
    });
  }
  changeTotalItems(e) {
    if (e.target.value.match(/^$|^[0-9]+$/)) {
      this.setState({
        countItemString: e.target.value
      });
    }
  }
  onSaveTotalItems(e) {
    if (
      e.key == "Enter" &&
      this.state.countItemString.length > 0 &&
      Number(this.state.countItemString) !== this.props.countItem
    ) {
      this.props.onSet(this.state.variant, Number(this.state.countItemString));
    }
  }
  render() {
    const item = this.props.item.node;
    const { variant: variantId } = this.state;
    var { variants } = item;
    const { loading } = this.props.cart;
    var variantImage = null;

    variants.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    variants.map((variant, index) => {
      if (variant.id == variantId) {
        if (variant.images.length > 0) {
          variantImage = variant.images[0].url;
        }
      }
    });
    return (
      <div className="container-wears__item">
        <img
          src={
            variantImage != null
              ? variantImage
              : item.images[0]
              ? item.images[0].url
              : ImageDefault
          }
          alt="image"
        />
        <div className="details-item">
          <div className="title-colors">
            <span className="title-colors__c1">{item.name}</span>
          </div>
          <p
            className="description-item"
            dangerouslySetInnerHTML={createMarkup(
              JSON.parse(item.descriptionJson).blocks[0].text
            )}
          />
          <div className="details-wear-item">
            <div>
              <span className="count-item">
                <span
                  onClick={!loading ? this.onRemove : () => {}}
                  className="plus-i"
                  style={
                    loading
                      ? {
                          color: "#84bd005c",
                          fontSize: 50
                        }
                      : { fontSize: 50 }
                  }
                >
                  -
                </span>
                <input
                  value={this.getItemCount()}
                  onChange={this.changeTotalItems}
                  onKeyDown={this.onSaveTotalItems}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                />
                <span
                  onClick={!loading ? this.onAdd : () => {}}
                  style={
                    loading
                      ? {
                          color: "#84bd005c"
                        }
                      : {}
                  }
                  className="plus-i"
                >
                  +
                </span>
              </span>
              {variants.length > 1 ? (
                <>
                  <div className="verticalline" />
                  <span className="talla-item">
                    <select
                      name="select"
                      onChange={!loading ? this.setVariant : () => {}}
                    >
                      {variants.map((variant, index) => {
                        return (
                          <option
                            key={`sizes-${index}`}
                            value={variant.id}
                            selected={variant.id == variantId}
                          >
                            {variant.name}
                          </option>
                        );
                      })}
                    </select>
                  </span>
                </>
              ) : null}
            </div>
            <span className="price-item">$ {item.price.amount}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default ItemSteps;
