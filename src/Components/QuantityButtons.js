import { useReactiveVar } from "@apollo/client";
import { Component, useState } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";
import { handleCart } from "./AddToCartButton";

const setCount = (Component) => {
	return function WrappedComponent(props) {
		const currentCart = useReactiveVar(cartItemsVar);
		const [countO, setCountO] = useState(1);
		const newCount = (attrValue, prod) => {
			const number = attrValue ? prod + 1 : prod - 1 <= 0 ? prod : prod - 1;
			setCountO(number);
			return number;
		};
		function count(prodId, attrValue) {
			const nCart = currentCart.map((prod) =>
				prod.productId === prodId
					? {
							productId: prod.productId,
							count: newCount(attrValue, prod.count),
							attributes: prod.attributes,
							prices: prod.prices,
					  }
					: prod
			);

			cartItemsVar(nCart);
		}
		return (
			<Component
				{...props}
				counter={(prodId, attrId, attrValue) => {
					count(prodId, attrId, attrValue);
				}}
				number={countO}
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
						this.props.counter(this.props.id, true);
					}}
				>
					+
				</div>
				<p>{this.props.number}</p>
				<div
					onClick={() => {
						this.props.counter(this.props.id, false);
					}}
				>
					-
				</div>
			</div>
		);
	}
}

export default setCount(QuantityButtons);
