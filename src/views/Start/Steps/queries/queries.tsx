import gql from "graphql-tag";

import { TypedQuery } from "../../../../core/queries";
import { TypedMutation } from "../../../../core/mutations";
import { ProductsList, Checkout } from "../types/ProductsList";

// STEP Upperwer

export const Step2Query = gql`
  query {
    products(first: 100, filter: { categories: ["Q2F0ZWdvcnk6MjY="] }) {
      edges {
        node {
          id
          name
          category {
            id
            name
          }
          descriptionJson
          variants {
            id
            stockQuantity
            name
            images {
              url
            }
          }
          collections {
            name
          }
          price {
            amount
          }
          images {
            url
          }
        }
      }
    }
  }
`;

export const TypedStep2Query = TypedQuery<ProductsList, {}>(Step2Query);

// STEP 3 Lowerwear
export const Step3Query = gql`
  query {
    products(first: 100, filter: { categories: ["Q2F0ZWdvcnk6Mjc="] }) {
      edges {
        node {
          id
          name
          category {
            id
            name
          }
          descriptionJson
          variants {
            id
            stockQuantity
            name
            images {
              url
            }
          }
          collections {
            name
          }
          price {
            amount
          }
          images {
            url
          }
        }
      }
    }
  }
`;

export const TypedStep3Query = TypedQuery<ProductsList, {}>(Step3Query);

// STEP 4 underwear
export const Step4Query = gql`
  query {
    products(first: 100, filter: { categories: ["Q2F0ZWdvcnk6Mjg="] }) {
      edges {
        node {
          id
          name
          category {
            id
            name
          }
          descriptionJson
          variants {
            id
            stockQuantity
            name
            images {
              url
            }
          }
          collections {
            name
          }
          price {
            amount
          }
          images {
            url
          }
        }
      }
    }
  }
`;

export const TypedStep4Query = TypedQuery<ProductsList, {}>(Step4Query);

// STEP 5 socks
export const Step5Query = gql`
  query {
    products(first: 100, filter: { categories: ["Q2F0ZWdvcnk6Mjk="] }) {
      edges {
        node {
          id
          name
          category {
            id
            name
          }
          descriptionJson
          variants {
            id
            stockQuantity
            name
            images {
              url
            }
          }
          collections {
            name
          }
          price {
            amount
          }
          images {
            url
          }
        }
      }
    }
  }
`;

export const TypedStep5Query = TypedQuery<ProductsList, {}>(Step5Query);

// STEP 6 accesories
export const Step6Query = gql`
  query {
    products(first: 100, filter: { categories: ["Q2F0ZWdvcnk6MTA="] }) {
      edges {
        node {
          id
          name
          category {
            id
            name
          }
          descriptionJson
          variants {
            id
            stockQuantity
            name
            images {
              url
            }
          }
          collections {
            name
          }
          price {
            amount
          }
          images {
            url
          }
        }
      }
    }
  }
`;

export const TypedStep6Query = TypedQuery<ProductsList, {}>(Step6Query);

export const Step7Query = gql`
  mutation {
    checkoutCreate(
      input: {
        email: "antonio@dreamlabs.pe"
        destination: "Lima"
        arrival: "2019-10-01"
        departure: "2019-10-10"
        lines: [{ quantity: 1, variantId: "UHJvZHVjdFZhcmlhbnQ6Mjk3" }]
        comment: ""
      }
    ) {
      checkout {
        id
        totalPrice {
          gross {
            amount
            currency
          }
        }
        isShippingRequired
        availableShippingMethods {
          id
          name
        }
        availablePaymentGateways {
          name
          config {
            field
            value
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
export const TypedStep7Query = TypedMutation<Checkout, {}>(Step7Query);
