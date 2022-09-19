import { Component } from "react";

import emptyCartImg from "../images/emptyCart.png";
class CartSwitch extends Component {
	state = {};
	render() {
		return (
			<div>
				<div className="Switch" onClick={() => this.props.toggleVisibility()}>
					<div
						style={{
							visibility: this.props.items.length === 0 ? "hidden" : "inherit",
						}}
					>
						{this.props.items.length}
					</div>
					<img src={emptyCartImg} />
				</div>
				<div
					className="OverlayTransparent"
					onClick={() => this.props.toggleVisibility()}
					style={{ display: this.props.cartVisible ? "none" : "block" }}
				></div>
			</div>
		);
	}
}
export default CartSwitch;
