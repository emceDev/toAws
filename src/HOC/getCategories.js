import { useReactiveVar, useQuery } from "@apollo/client";
import { currentCategoryVar } from "../apolloState/client";
import { GET_CATEGORIES } from "../apolloState/queries";

export const getCategories = (Component) => {
	return function WrappedComponent(props) {
		const { data } = useQuery(GET_CATEGORIES);
		const currCat = useReactiveVar(currentCategoryVar);
		const select = (arg) => {
			currentCategoryVar(arg);
		};
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
	};
};
