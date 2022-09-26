import { cartItemsVar, taxVar } from "../apolloState/client";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
const GET_CART = gql`
	query GetCart {
		cart @client {
			productId
			count
			attributes
			prices
		}
	}
`;
export const getCartItems = (Component) => {
	return function WrappedComponent(props) {
		const tax = useReactiveVar(taxVar);
		const [totalPrices, setTotalPrices] = useState([]);
		const [quantity, setQuantity] = useState(0);
		const { data, loading, error } = useQuery(GET_CART);
		useEffect(() => {
			return data !== undefined ? sum() : null;
		}, [data]);

		const sum = () => {
			let total = 0;
			let amounts = [];
			if (data[0] !== undefined) {
				data[0].prices.map((price) =>
					amounts.push({ amount: 0, currency: price.currency })
				);

				data.map((item) => {
					total = total + item.count;
					setQuantity(total);
					item.prices.map((price) =>
						amounts.map((am, index) =>
							price.currency.label === am.currency.label
								? (amounts[index].amount =
										item.count * (amounts[index].amount + price.amount))
								: null
						)
					);
				});

				return setTotalPrices(amounts);
			} else {
			}
		};
		if (error) {
			<p>errro</p>;
		} else if (loading === true) {
			<p>loading</p>;
		} else if (data !== undefined) {
			return (
				<>
					<Component
						{...props}
						items={data.cart}
						quantity={quantity}
						tax={tax}
						totalPrices={totalPrices}
					/>
				</>
			);
		}
	};
};
