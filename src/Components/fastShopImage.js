import { Component } from "react";
import { addToCart } from "../HOC/addToCart";
import inCart from "../images/CircleIcon.png";
class FastShopImage extends Component {
	state = {};
	handleClick(e) {
		this.props.showPopup(e);
		this.props.addRemove();
	}
	render() {
		return <img src={inCart} onClick={(e) => this.handleClick(e)} />;
	}
}
export default addToCart(FastShopImage);
