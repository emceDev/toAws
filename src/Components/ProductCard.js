import { Component } from "react";
import { Link } from "react-router-dom";
class ProductCard extends Component {
	state = {};
	render() {
		return (
			<div className="ProductCard">
				<Link to={`/products/${this.props.product.name}`}>
					<div className="Image">
						<img className="Image" src={this.props.product.gallery[0]}></img>
					</div>
					<div className="Title">{this.props.product.name}</div>
					<div className="Price">{this.props.product.prices[0].amount}</div>
				</Link>
			</div>
		);
	}
}

export default ProductCard;
