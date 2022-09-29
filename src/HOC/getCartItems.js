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
		const { data } = useQuery(GET_CART);
		const cart = data.cart;
		useEffect(() => {
			return cart !== undefined ? sum() : null;
		}, [cart]);

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
					item.prices.map((price) =>
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

		return (
			<>
				<Component
					{...props}
					items={cart}
					quantity={quantity}
					tax={tax}
					totalPrices={totalPrices}
				/>
			</>
		);
	};
};
