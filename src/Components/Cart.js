import { Component } from "react";
import { AdjustButtons } from "../MiniComponents/AdjustButtons";
import { CartProduct } from "../MiniComponents/CartProduct";
import { QuantityButtons } from "../MiniComponents/QuantityButtons";

class Cart extends Component {
	state = {};
	render() {
		return (
			<div className="Cart">
				<div>
					<p>PRODUCTS list</p>
					<CartProduct hideButtons={false} />
					<CartProduct hideButtons={false} />
					<CartProduct hideButtons={false} />
				</div>

				<div className="CartOrder">
					<div className="CartOrderDetails">
						<div>
							<p>tax</p>
							<p>quantitiy</p>
							<p>total</p>
						</div>
						<div>
							<p>25%</p>
							<p>2</p>
							<p>$200</p>
						</div>
					</div>
					<div className="BtnOrder">Button order</div>
				</div>
			</div>
		);
	}
}

export default Cart;
