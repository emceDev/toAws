import { useReactiveVar, gql, useQuery } from "@apollo/client";
import { currentCategoryVar } from "../apolloState/client";

// gets products from specified category
const GET_PRODUCTS = gql`
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

export const getProducts = (Component) => {
	return function WrappedComponent(props) {
		const currCat = useReactiveVar(currentCategoryVar);
		const { data, loading, err } = useQuery(GET_PRODUCTS, {
			variables: { pid: currCat },
		});

		return <Component {...props} products={data} selected={currCat} />;
	};
};
