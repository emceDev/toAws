import { gql, useReactiveVar } from "@apollo/client";
import { Component, useState } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";
import { handleCart } from "./AddToCartButton";

const setCount = (Component) => {
	return function WrappedComponent(props) {
		const [countO, setCountO] = useState(1);

		const q = props.inCartQuantity;

		const count = (attrValue) => {
			const number = attrValue ? q + 1 : q - 1 <= 0 ? q : q - 1;
			handleWrite(number);
		};
		function handleWrite(number) {
			return props.client.writeFragment({
				id: "Product:" + props.id,
				fragment: gql`
					fragment quantity on Product {
						inCartQuantity
					}
				`,
				data: { inCartQuantity: number },
			});
		}
		return (
			<Component
				{...props}
				counter={(attrValue) => {
					count(attrValue);
				}}
			/>
		);
	};
};

class QuantityButtons extends Component {
	constructor(props) {
		super(props);
		this.state = { number: 1 };
	}
	render() {
		return (
			<div className="QuantityButtons">
				<div
					onClick={() => {
						this.props.counter(true);
					}}
				>
					+
				</div>
				<p>{this.props.inCartQuantity}</p>
				<div
					onClick={() => {
						this.props.counter(false);
					}}
				>
					-
				</div>
			</div>
		);
	}
}

export default setCount(QuantityButtons);
