export interface ProductsList {
    products: ProductsList_products | null;
}
  
export interface Checkout {
    checkout: Checkout | null;
}
export interface Shipping {
    addresses?: ShippingList |null;
}