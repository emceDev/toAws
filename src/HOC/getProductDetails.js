import AdjustButtons from "../Components/AdjustButtons";
import { Component } from "react";
import { useQuery, gql } from "@apollo/client";
import AddToCartButton from "../Components/AddToCartButton.js";
import { useParams } from "react-router-dom";
import Price from "../Components/Price";
import PNames from "../Components/PNames";

const GET_PRODUCT_DETAILS = gql`
	query GetProduct($pid: String!) {
		product(id: $pid) {
			name
			id
			brand
			description
			gallery
			inStock
			attributes {
				name
				id
				items {
					value
					displayValue
				}
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
		const { data, loading, err } = useQuery(GET_PRODUCT_DETAILS, {
			variables: { pid: params === undefined ? props.item : params },
		});

		if (data) {
			return <Component {...props} data={data} />;
		} else {
			return <p>Loading details...</p>;
		}
	};
};
