import { Component } from "react";
import { Link } from "react-router-dom";
import Price from "./Price";

class CartOverlayBottom extends Component {
	state = {};
	render() {
		return (
			<div className="OverlayBottom" style={{ color: "black" }}>
				<div>
					Total:
					<Price prices={this.props.totalPrices} />
				</div>
				<div className="Buttons">
					<Link to={`/Cart`}>
						<div>ViewBag</div>
					</Link>
					<div className="BtnCheckout">Checkout</div>
				</div>
			</div>
		);
	}
}
export default CartOverlayBottom;
