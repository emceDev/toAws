import { Component } from "react";
import ProductCard from "./ProductCard";
import { useReactiveVar, gql, useQuery } from "@apollo/client";
import { currentCategoryVar } from "../apolloState/client";

const GET_PRODUCTS = gql`
	query GetProducts($pid: String!) {
		category(input: { title: $pid }) {
			name
			products {
				id
				name
				brand
				description
				gallery
				inStock
				attributes {
					name
					items {
						value
					}
				}
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

export const getProducts = (Component) => {
	return function WrappedComponent(props) {
		const currCat = useReactiveVar(currentCategoryVar);
		const { data, loading, err } = useQuery(GET_PRODUCTS, {
			variables: { pid: currCat },
		});

		return <Component {...props} products={data} selected={currCat} />;
	};
};

class ProductList extends Component {
	state = {};
	render() {
		if (this.props.products !== undefined) {
			return (
				<div className="ProductList">
					{this.props.products.category.products.map((product) => {
						return <ProductCard product={product} key={product.id} />;
					})}
				</div>
			);
		} else {
			return <div className="ProductList">LoadingProducts</div>;
		}
	}
}

export default getProducts(ProductList);
