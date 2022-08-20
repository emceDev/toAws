import { Component } from "react";
class ProductCard extends Component {
	state = {};
	render() {
		return (
			<div className="ProductCard">
				<div className="Image">image</div>
				<div className="Title">title</div>
				<div className="Price">$$$ price</div>
			</div>
		);
	}
}

export default ProductCard;
