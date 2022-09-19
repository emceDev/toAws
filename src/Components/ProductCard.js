import { Component } from "react";
import { Link } from "react-router-dom";
import Price from "./Price";
import inCart from "../images/CircleIcon.png";
import PNames from "./PNames";

class ProductCard extends Component {
	state = {};
	render() {
		const { inStock, gallery, name, prices, id } = this.props.product;
		return (
			<div className="ProductCard">
				<div
					className="stockOverlay"
					style={{
						visibility: inStock ? "hidden" : "block",
					}}
				></div>
				<Link to={`/products/${id}`}>
					<div className="Image">
						<div
							style={{
								visibility: inStock ? "hidden" : "block",
							}}
						>
							OUT OF STOCK
						</div>
						<img className="Image" src={gallery[0]}></img>
					</div>
					<div className="desc">
						<div>
							<PNames name={name} />
							<Price prices={prices} />
						</div>
						{this.props.isInCart ? <img src={inCart} /> : <div></div>}
					</div>
				</Link>
			</div>
		);
	}
}

export default ProductCard;
