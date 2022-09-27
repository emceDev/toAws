import { cartItemsVar, taxVar } from "../apolloState/client";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { cartProductsVar } from "../apolloState/client";
const GET_CART = gql`
	query getCart {
		cart @client
	}
`;

export const getCartItems = (Component) => {
	return function WrappedComponent(props) {
		const tax = useReactiveVar(taxVar);
		const [totalPrices, setTotalPrices] = useState([]);
		const [quantity, setQuantity] = useState(0);
		// const cart = useReactiveVar(cartProductsVar);
		const { data, loading, error } = useQuery(GET_CART);
		const cart = data.cart;
		useEffect(() => {
			console.log("Cart change", cart);
			return cart !== undefined ? sum() : console.log("empy");
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
				console.log("total", amounts);
				return setTotalPrices(amounts);
			} else {
			}
		};

		if (cart.length !== 0) {
			return (
				<>
					<p>asd</p>
					<Component
						{...props}
						items={cart}
						quantity={quantity}
						tax={tax}
						totalPrices={totalPrices}
					/>
				</>
			);
		}
	};
};
