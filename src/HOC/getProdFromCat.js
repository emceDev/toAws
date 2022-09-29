import { useReactiveVar, useQuery } from "@apollo/client";
import { currentCategoryVar } from "../apolloState/client";
import { GET_PRODUCTS } from "../apolloState/queries";

// gets products from specified category

export const getProducts = (Component) => {
	return function WrappedComponent(props) {
		const currCat = useReactiveVar(currentCategoryVar);
		const { data } = useQuery(GET_PRODUCTS, {
			variables: { pid: currCat },
		});

		return <Component {...props} products={data} selected={currCat} />;
	};
};
