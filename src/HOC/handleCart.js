import { makeVar, InMemoryCache, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { Component } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";

export const handleCart = (Component) => {
	return function WrappedComponent(props) {
		const [isInCart, setIsInCart] = useState(false);
		const currentCart = useReactiveVar(cartItemsVar);
		const currModified = useReactiveVar(currentlyModified);

		useEffect(() => {
			let inCart = inCartCheck(props.productId);
			setIsInCart(inCart);
		}, [currentCart]);
		useEffect(() => {
			if (props.attributes) {
				const modified = {
					id: props.id,
					attributes: [],
				};
				props.attributes.map((attr) =>
					modified.attributes.push({ id: attr.id, value: attr.items[0].value })
				);
				currentlyModified(modified);
			}
		}, []);
		const inCartCheck = (id) => {
			return currentCart.some((product) => product.productId === id);
		};
		function addRemove() {
			// attributes handling
			let attributes = [];
			if (currModified.productId === props.productId) {
				attributes = currModified.attributes;
			} else {
				props.attributes.map((attr) =>
					attributes.push({ id: attr.id, value: attr.items[0].value })
				);
			}
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
