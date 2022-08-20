import { Component } from "react";
import { AdjustButtons } from "../MiniComponents/AdjustButtons";
import { CartProduct } from "../MiniComponents/CartProduct";
import { QuantityButtons } from "../MiniComponents/QuantityButtons";

class CartOverlay extends Component {
	state = {};
	render() {
		return (
			<div className="CartOverlay">
				My bag, number of items
				<div>
					<CartProduct hideButtons={true} />
					<CartProduct hideButtons={true} />
				</div>
				<div className="CartOverlayPrice">
					<div>Total</div>
					<div>$200</div>
				</div>
				<div className="CartOverlayBtns">
					<div>View Bag</div>
					<div>Checkout</div>
				</div>
			</div>
		);
	}
}

export default CartOverlay;

const CartOverlayProduct = () => {
	return (
		<div>
			<div>
				<p>title</p>
				<p>subtitle</p>
				<p>price</p>
				<AdjustButtons />
			</div>
			<QuantityButtons />
			<div>image</div>
		</div>
	);
};
