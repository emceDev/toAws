import { gql } from "@apollo/client";

export const GET_CART = gql`
	query getCart {
		cart @client
	}
`;

export const GET_CATEGORIES = gql`
	query GetCategories {
		categories {
			name
		}
	}
`;
export const GET_PRODUCTS = gql`
	query GetProducts($pid: String!) {
		category(input: { title: $pid }) {
			name
			products {
				id
				name
				gallery
				inStock
				isInCart @client

				prices {
					currency {
						symbol
						label
					}
					amount
				}
			}
		}
	}
`;
export const GET_PRODUCT_DETAILS = gql`
	query GetProduct($pid: String!) {
		product(id: $pid) {
			name
			id
			brand
			description
			gallery
			inStock
			isInCart @client
			attributes {
				name
				items {
					id
					value
					displayValue
				}
			}
			setAttrs @client {
				attrId
				attrValue
			}

			isInCart @client
			inCartQuantity @client
			prices {
				currency {
					symbol
					label
				}
				amount
			}
		}
	}
`;
export const GET_PRODUCT_ATTRS = gql`
	query getAttrs($pid: String!) {
		product(id: $pid) {
			attributes {
				name
				items {
					id
					value
					displayValue
				}
			}
			setAttrs @client {
				attrId
				attrValue
			}
		}
	}
`;
export const GET_PD_FOR_CART = gql`
	query GetProductForCart($pid: String!) {
		product(id: $pid) {
			id
			inStock
			attributes {
				id
				items {
					value
					id
				}
			}
			setAttrs @client {
				attrId
				attrValue
			}
			isInCart @client
			cartQuantity @client
			prices {
				currency {
					symbol
					label
				}
				amount
			}
		}
	}
`;
export const GET_CURRENCIES = gql`
	{
		currencies {
			label
			symbol
		}
	}
`;
