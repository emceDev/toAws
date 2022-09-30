import { useReactiveVar, useQuery } from "@apollo/client";
import { currentCategoryVar } from "../apolloState/client";
import { GET_CATEGORIES } from "../apolloState/queries";

export const getCategories = (Component) => {
	return function WrappedComponent(props) {
		const { data, loading, error } = useQuery(GET_CATEGORIES);
		const currCat = useReactiveVar(currentCategoryVar);
		const select = (arg) => {
			currentCategoryVar(arg);
		};
		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
			return (
				<Component
					{...props}
					categories={data}
					selected={currCat}
					select={(arg) => {
						select(arg);
					}}
				/>
			);
		}
	};
};
