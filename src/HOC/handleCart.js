import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";

// This function adds/removes product to/from cart and handles modified product
export const handleCart = (Component) => {
	return function WrappedComponent(props) {
		const [isInCart, setIsInCart] = useState(false);
		const currentCart = useReactiveVar(cartItemsVar);
		const currModified = useReactiveVar(currentlyModified);

		useEffect(() => {
			// firstly checks whether product is already in cart
			let inCart = inCartCheck(props.productId);
			setIsInCart(inCart);
		}, [currentCart]);

		useEffect(() => {
			// Setting variable(currently modified) to default
			// when component loads with attributes given from props
			if (props.attributes) {
				// console.log(props.attributes);
				let modified = {
					id: props.id,
					attributes: [],
				};
				props.attributes.map((attr) =>
					modified.attributes.push({ id: attr.id, value: attr.items[0].value })
				);
				currentlyModified(modified);
			}
		}, []);

		// simple check if product is already in cart
		const inCartCheck = (id) => {
			return currentCart.some((product) => product.productId === id);
		};

		// check whether pushed product is in reactive variable ? push with variable contents : push with default
		function addRemove() {
			let attributes = [];
			if (currModified.productId === props.productId) {
				attributes = currModified.attributes;
			} else {
				props.attributes.map((attr) =>
					attributes.push({ id: attr.id, value: attr.items[0].value })
				);
			}
			// Adding and deleting from cart: in cart===true ? remove : push to cart
			cartItemsVar(
				isInCart
					? currentCart.filter((x) => x.productId !== props.productId)
					: [
							...currentCart,
							{
								productId: props.productId,
								count: 1,
								attributes,
								prices: props.prices,
							},
					  ]
			);
		}

		return (
			<Component {...props} click={() => addRemove()} isInCart={isInCart} />
		);
	};
};
