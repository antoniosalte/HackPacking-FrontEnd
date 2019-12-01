import gql from "graphql-tag";

import { TypedQuery } from "../../../../core/queries";
import { ProductsList } from "../types/ProductsList";

// STEP Upperwer

export const Step2Query = gql`
query {
  products(first: 100, filter: {
    categories: ["Q2F0ZWdvcnk6MjY="]
  }) {
    edges {
      node {
        id,
        name,
        category {
          id
          name
        }
        description,
        attributes {
          attribute {
            name
          }
          values{
            name
          }
        },
	collections {
          name
        },
        price {
          amount
        },
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
  products(first: 100, filter: {
    categories: ["Q2F0ZWdvcnk6Mjc="]
  }) {
    edges {
      node {
        id,
        name,
        category {
          id
          name
        }
        description,
        attributes {
          attribute {
            name
          }
          values{
            name
          }
        },
	collections {
          name
        },
        price {
          amount
        },
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
  products(first: 100, filter: {
    categories: ["Q2F0ZWdvcnk6Mjg="]
  }) {
    edges {
      node {
        id,
        name,
        category {
          id
          name
        }
        description,
        attributes {
          attribute {
            name
          }
          values{
            name
          }
        },
	collections {
          name
        },
        price {
          amount
        },
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
  products(first: 100, filter: {
    categories: ["Q2F0ZWdvcnk6Mjk="]
  }) {
    edges {
      node {
        id,
        name,
        category {
          id
          name
        }
        description,
        attributes {
          attribute {
            name
          }
          values{
            name
          }
        },
        collections {
          name
        },
        price {
          amount
        },
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
    products(first: 100, filter: {
      categories: ["Q2F0ZWdvcnk6MTA=="]
    }) {
      edges {
        node {
          id,
          name,
          category {
            id
            name
          }
          description,
          attributes {
            attribute {
              name
            }
            values{
              name
            }
          }
          price {
            amount
          },
          images {
            url
          }
        }
      }
    }
  }
`;

export const TypedStep6Query = TypedQuery<ProductsList, {}>(Step6Query);