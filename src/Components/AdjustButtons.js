import { Component } from "react";
import { handleCart } from "./AddToCartButton";
import { makeVar, InMemoryCache, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";

const selectAttributes = (Component) => {
	return function WrappedComponent(props) {
		const [isInCart, setIsInCart] = useState(false);
		const [selected, setSelected] = useState(null);
		const currentCart = useReactiveVar(cartItemsVar);
		const currModified = useReactiveVar(currentlyModified);
		// let count = 1;

		function modify(prodId, attrId, attrValue) {
			currentCart.map((p) => p.productId === prodId);
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
			// checks if modified product is in cart
			// modifies in cart
			// modifies in variable
			inCartCheck(prodId)
				? newCart.map((x) => (x.productId === prodId ? setSelected(x) : null))
				: setSelected(newVariable);
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
				selected={selected}
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
	// state = { active: null };

	light(id, value, name, index) {
		// console.log("lightenenign");
		// console.log(id, value, name);
		let clName = name === "Color" ? "AttrBtnColor" : "AttrBtnText";
		return clName;
		const selected = this.props.selected;
		// check if any selected
		if (selected !== null) {
			// check if selected id===prod id
			if (selected.productId === this.props.id) {
				console.log(selected);
				// checks whether attribute is selected one
				let z = selected.attributes.some(
					(a) => a.id === id && a.value === value
				);
				return z ? "active" : "inactive";
				console.log(z);
			}
		}

		// if (this.props.selected !== null) {
		// 	const prod = this.props.selected;
		// 	let sId = prod.productId;
		// 	let pId = this.props.id;
		// 	let attr = prod.attributes;
		// 	let iSm = sId === pId;
		// 	if (iSm === true) {
		// 		attr.some((a) =>
		// 			a.value === value ? (active = active + " active") : active
		// 		);
		// 		return active;
		// 	}
		// } else if (this.props.selected === null && index === 0) {
		// 	// console.log(index, clName);
		// 	return clName + " active";
		// } else {
		// 	return clName;
		// }
	}
	render() {
		return (
			<div className="AdjustButtons">
				{/* {console.log(this.props.selected)} */}
				{this.props.attributes
					? this.props.attributes.map((attr) => {
							return (
								<div key={attr.id} className="AttributeContainer">
									<div className="AttrName">{attr.name}</div>
									<div className="AttrBtns">
										{attr.items.map((item, index) => {
											return (
												<div
													onClick={() =>
														this.props.modify(
															this.props.id,
															attr.id,
															item.value
														)
													}
													className={this.light(
														attr.id,
														item.value,
														attr.name,
														index
													)}
													key={item.value}
													id={item.value}
													style={{
														backgroundColor:
															attr.name === "Color" ? item.value : null,
													}}
												>
													{attr.name !== "Color" ? item.value : null}
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
