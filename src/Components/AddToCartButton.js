import { Component } from "react";

class AddToCartButton extends Component {
	render() {
		return (
			<div className="AddToCart" onClick={this.props.addRemove}>
				{this.props.isInCart ? "remove" : "add"}
			</div>
		);
	}
}

export default AddToCartButton;
