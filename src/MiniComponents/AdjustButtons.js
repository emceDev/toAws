import { Component } from "react";
import { handleCart } from "./AddToCartButton";
import { makeVar, InMemoryCache, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";

const selectAttributes = (Component) => {
	return function WrappedComponent(props) {
		const [isInCart, setIsInCart] = useState(false);
		const currentCart = useReactiveVar(cartItemsVar);
		const currModified = useReactiveVar(currentlyModified);
		// let count = 1;
		function modify(prodId, attrId, attrValue) {
			// checks if product is in cart
			const inCartCheck = (id) => {
				return currentCart.some((product) => product.productId === id);
			};

			// value of the new cart
			const newCart = currentCart.map((prod) =>
				prod.productId === prodId
					? compareAttrs(prodId, attrId, attrValue, prod.count, prod.prices)
					: prod
			);
			// value in reactive variable
			const newVariable = compareAttrs(prodId, attrId, attrValue);
			// console.log(newVariable);
			// checks if modified product is in cart
			// modifies in cart
			// modifies in variable
			return inCartCheck(prodId)
				? cartItemsVar(newCart)
				: currentlyModified(newVariable);
		}

		// compares array of attributes in variable and passed from component
		// if ids match, returns attributes
		// returns product object with updated attributes
		function compareAttrs(prodId, attrId, attrValue, count = 1, prices) {
			let attrs = currModified.attributes.map((attr) =>
				attrId === attr.id ? { id: attrId, value: attrValue, prices } : attr
			);

			return {
				productId: prodId,
				attributes: attrs,
				count: count,
				prices: prices,
			};
		}
		return (
			<Component
				{...props}
				isInCart={isInCart}
				modify={(prodId, attrId, attrValue) => {
					modify(prodId, attrId, attrValue);
				}}
				// count={count}
				// quantity={(sign	) => quantity(sign)}
			/>
		);
	};
};

class AdjustButtons extends Component {
	// state = { params };
	componentDidMount() {}
	render() {
		return (
			<div className="AdjustButtons">
				{this.props.attributes
					? this.props.attributes.map((attr) => {
							return (
								<div key={attr.id} className="AttributeContainer">
									<div>{attr.name}</div>
									<div className="AttributeButtons">
										{attr.items.map((item) => {
											return (
												<div
													className={
														attr.name === "Color"
															? "AttributeButtonColor"
															: "AttributeButtonText"
													}
													onClick={() =>
														this.props.modify(
															this.props.id,
															attr.id,
															item.value
														)
													}
													key={item.value}
													style={{
														backgroundColor:
															attr.name === "Color" ? item.value : "white",
														margin: "2%",
													}}
												>
													{attr.name === "Color" ? null : item.value}
												</div>
											);
										})}
									</div>
								</div>
							);
					  })
					: null}
			</div>
		);
	}
}

export default selectAttributes(AdjustButtons);
