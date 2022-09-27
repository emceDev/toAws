import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";
import { cartProductsVar } from "../apolloState/client";

// one here
const GET_PD_FOR_CART = gql`
	query GetProductForCart($pid: String!) {
		product(id: $pid) {
			id
			inStock
			attributes {
				id
				items {
					value
					id
				}
			}
			setAttrs @client {
				attrId
				attrValue
			}
			isInCart @client
			cartQuantity @client
			prices {
				currency {
					symbol
					label
				}
				amount
			}
		}
	}
`;
// This function adds/removes product to/from cart and handles modified product
export const handleCart = (Component) => {
	return function WrappedComponent(props) {
		const currentCart = useReactiveVar(cartProductsVar);
		const [isInCart, setIsInCart] = useState(false);
		const product = useQuery(GET_PD_FOR_CART, {
			variables: { pid: props.productId },
		});

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
		return (
			<Component {...props} click={() => addRemove()} isInCart={isInCart} />
		);
	};
};
