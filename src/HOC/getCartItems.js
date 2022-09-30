import { taxVar } from "../apolloState/client";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_CART } from "../apolloState/queries";

export const getCartItems = (Component) => {
	return function WrappedComponent(props) {
		const tax = useReactiveVar(taxVar);
		const [totalPrices, setTotalPrices] = useState([]);
		const [quantity, setQuantity] = useState(0);
		// const cart = useReactiveVar(cartProductsVar);
		const { data, loading, error } = useQuery(GET_CART);
		const cart = data.cart;
		useEffect(() => {
			const sum = () => {
				let total = 0;
				let amounts = [];
				if (cart[0] !== undefined) {
					cart[0].prices.map((price) =>
						amounts.push({ amount: 0, currency: price.currency })
					);
					cart.map((item) => {
						total = total + item.inCartQuantity;
						setQuantity(total);
						return item.prices.map((price) =>
							amounts.map((am, index) =>
								price.currency.label === am.currency.label
									? (amounts[index].amount =
											item.inCartQuantity *
											(amounts[index].amount + price.amount))
									: null
							)
						);
					});
					return setTotalPrices(amounts);
				} else {
				}
			};

			return cart !== undefined ? sum() : null;
		}, [cart]);

		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
			return (
				<Component
					{...props}
					items={cart}
					quantity={quantity}
					tax={tax}
					totalPrices={totalPrices}
				/>
			);
		}
	};
};
