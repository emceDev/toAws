import { useQuery, useReactiveVar } from "@apollo/client";
import { selectedCurrencyVar } from "../apolloState/client";
import { GET_CURRENCIES } from "../apolloState/queries";

export const getCurrencies = (Component) => {
	return function WrappedComponent(props) {
		const { data } = useQuery(GET_CURRENCIES);
		const currenc = useReactiveVar(selectedCurrencyVar);
		function selectCurrency(currency) {
			selectedCurrencyVar(currency);
		}

		if (data) {
			return (
				<Component
					{...props}
					data={data}
					selectCurrency={(x) => selectCurrency(x)}
					currenc={currenc}
				/>
			);
		} else {
			return <p>Loading prices</p>;
		}
	};
};
