import { Component } from "react";
import { Link } from "react-router-dom";
import Price from "../MiniComponents/Price";
import inCart from "../images/CircleIcon.png";
class ProductCard extends Component {
	state = {};
	render() {
		return (
			<div className="ProductCard">
				<div
					className="stockOverlay"
					style={{
						visibility: this.props.product.inStock ? "hidden" : "block",
					}}
				></div>
				<Link to={`/products/${this.props.product.id}`}>
					<div className="Image">
						<div
							style={{
								visibility: this.props.product.inStock ? "hidden" : "block",
							}}
						>
							OUT OF STOCK
						</div>
						<img className="Image" src={this.props.product.gallery[0]}></img>
					</div>
					<div className="desc">
						<div>
							<div className="Title">{this.props.product.name}</div>
							<Price prices={this.props.product.prices} />
						</div>
						{this.props.product.isInCart ? <img src={inCart} /> : <div></div>}
					</div>
				</Link>
			</div>
		);
	}
}

export default ProductCard;
