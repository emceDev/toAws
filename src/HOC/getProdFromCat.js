import { useReactiveVar, useQuery } from "@apollo/client";
import { currentCategoryVar } from "../apolloState/client";
import { GET_PRODUCTS } from "../apolloState/queries";

// gets products from specified category

export const getProducts = (Component) => {
	return function WrappedComponent(props) {
		const currCat = useReactiveVar(currentCategoryVar);
		const { data, loading, error } = useQuery(GET_PRODUCTS, {
			variables: { pid: currCat },
		});
		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
			return <Component {...props} products={data} selected={currCat} />;
		}
	};
};
