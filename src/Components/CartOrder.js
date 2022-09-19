import { Component } from "react";
import Price from "./Price";
import Taxed from "./Taxed";

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
				<div className="ButtonOrder" onClick={() => console.log(items)}>
					Button order
				</div>
			</div>
		);
	}
}
export default CartOrder;
