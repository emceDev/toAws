import { gql } from "@apollo/client";
import { Component } from "react";
import Price from "./Price";
import Taxed from "./Taxed";

const readyOrder = (Component) => {
	return function WrappedComponent(props) {
		function readFragment(productId) {
			return props.client.readFragment({
				id: "Product:" + productId,
				fragment: gql`
					fragment Proddc on Product {
						setAttrs {
							attrId
							attrValue
						}
						prices {
							currency {
								symbol
								label
							}
							amount
						}
					}
				`,
			});
		}

		function order() {
			let cartToBuy = [];
			props.items.map((p) =>
				cartToBuy.push({
					...readFragment(p.productId),
					quantity: p.inCartQuantity,
					id: p.productId,
				})
			);
			console.log("Ordered: ", cartToBuy);
		}
		return (
			<>
				<Component {...props} order={order} />
			</>
		);
	};
};
class CartOrder extends Component {
	state = {};
	render() {
		const { totalPrices, quantity, items } = this.props;
		return (
			<div className="CartOrder">
				<div className="CartOrderDetails">
					<div>
						<p>tax</p>
						<p>quantity</p>
						<p>total</p>
					</div>
					<div>
						<Taxed prices={totalPrices} />
						<p>{quantity}</p>
						{totalPrices !== undefined ? (
							<Price prices={totalPrices} />
						) : (
							<p>no prices</p>
						)}
					</div>
				</div>
				<div className="ButtonOrder" onClick={this.props.order}>
					Button order
				</div>
			</div>
		);
	}
}
export default readyOrder(CartOrder);
