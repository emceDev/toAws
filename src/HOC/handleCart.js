import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { cartProductsVar } from "../apolloState/client";
import { GET_PD_FOR_CART } from "../apolloState/queries";

// This function adds/removes product to/from cart and handles modified product
export const handleCart = (Component) => {
	return function WrappedComponent(props) {
		const currentCart = useReactiveVar(cartProductsVar);
		const [isInCart, setIsInCart] = useState(false);
		const { data, loading, error } = useQuery(GET_PD_FOR_CART, {
			variables: { pid: props.productId },
		});
		const product = data.product;
		useEffect(() => {
			if (product.data !== undefined) {
				setIsInCart(product.data.product.isInCart);
			}
		}, [product]);
		// check whether pushed product is in reactive variable ? push with variable contents : push with default
		function addRemove() {
			const p = product.data.product;
			const isInCart = product.data.product.isInCart;
			const cartProduct = { productId: p.id, count: 1, prices: p.prices };
			// Adding and deleting from cart: in cart===true ? remove : push to cart
			cartProductsVar(
				isInCart
					? currentCart.filter((x) => x.productId !== props.productId)
					: [...currentCart, cartProduct]
			);
		}
		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
			return (
				<Component {...props} click={() => addRemove()} isInCart={isInCart} />
			);
		}
	};
};
