import { cartItemsVar, taxVar } from "../apolloState/client";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";

export const getCartItems = (Component) => {
	return function WrappedComponent(props) {
		const currentCart = useReactiveVar(cartItemsVar);
		const tax = useReactiveVar(taxVar);
		const [totalPrices, setTotalPrices] = useState([]);
		const [quantity, setQuantity] = useState(0);

		useEffect(() => {
			return currentCart !== undefined ? sum() : null;
		}, [currentCart]);

		const sum = () => {
			let total = 0;
			let amounts = [];
			if (currentCart[0] !== undefined) {
				currentCart[0].prices.map((price) =>
					amounts.push({ amount: 0, currency: price.currency })
				);

				currentCart.map((item) => {
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
		const cartItems = useReactiveVar(cartItemsVar);
		return (
			<Component
				{...props}
				items={cartItems}
				quantity={quantity}
				tax={tax}
				totalPrices={totalPrices}
			/>
		);
	};
};
