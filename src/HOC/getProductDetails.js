import AdjustButtons from "../Components/AdjustButtons";
import { Component, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import AddToCartButton from "../Components/AddToCartButton.js";
import { useParams } from "react-router-dom";
import Price from "../Components/Price";
import PNames from "../Components/PNames";
// choosen field prevents selected attributes to change in cache leading tp mismatches
// I fugred it out after four days of rounding around the problem
const GET_PRODUCT_DETAILS = gql`
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
				id
				items {
					value
					displayValue
				}
			}
			xf @client {
				id
			}

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

export const getProduct = (Component) => {
	return function WrappedComponent(props) {
		let params = useParams().id;
		// if rendered in product details, params will be delivered else not.
		// !!!check here
		const { data, loading, err } = useQuery(GET_PRODUCT_DETAILS, {
			// variables: { pid: params === undefined ? props.item : params },
			variables: { pid: props.place === "product" ? params : props.item },
		});

		if (loading !== true) {
			return <Component {...props} data={data} />;
		} else {
			return <p>Loading details...</p>;
		}
	};
};
