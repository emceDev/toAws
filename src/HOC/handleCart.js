import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";

// This function adds/removes product to/from cart and handles modified product
export const handleCart = (Component) => {
	return function WrappedComponent(props) {
		const [isInCart, setIsInCart] = useState(false);
		const currentCart = useReactiveVar(cartItemsVar);

		useEffect(() => {
			// firstly checks whether product is already in cart
			let inCart = inCartCheck(props.productId);
			setIsInCart(inCart);
		}, [currentCart]);

		// simple check if product is already in cart
		const inCartCheck = (id) => {
			return currentCart.some((product) => product.productId === id);
			// //console.log("checkin if in cart", id, x);
		};

		// check whether pushed product is in reactive variable ? push with variable contents : push with default
		function addRemove() {
			// Adding and deleting from cart: in cart===true ? remove : push to cart
			cartItemsVar(
				isInCart
					? currentCart.filter((x) => x.productId !== props.productId)
					: [
							...currentCart,
							{
								productId: props.productId,
							},
					  ]
			);
		}
		//console.log("HANDLE CART HOC ", currentCart);
		return (
			<Component {...props} click={() => addRemove()} isInCart={isInCart} />
		);
	};
};
