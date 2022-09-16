import { useReactiveVar, gql, useQuery } from "@apollo/client";
import { currentCategoryVar } from "../apolloState/client";

const GET_CATEGORIES = gql`
	query GetCategories {
		categories {
			name
		}
	}
`;

export const getCategories = (Component) => {
	return function WrappedComponent(props) {
		const { data, loading, err } = useQuery(GET_CATEGORIES);
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
