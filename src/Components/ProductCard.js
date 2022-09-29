import { Component } from "react";
import { Link } from "react-router-dom";
import Price from "./Price";
import inCart from "../images/CircleIcon.png";
import PNames from "./PNames";
import AdjustButtons from "./AdjustButtons";

class ProductCard extends Component {
	constructor(props) {
		super(props);
		this.state = { fastShopAtts: false, fastShopBtn: false };
	}
	showPopup(e) {
		e.preventDefault();
		console.log("showing", this.state.fastShopAtts);
		this.setState({ fastShopAtts: !this.state.fastShopAtts });
	}
	render() {
		const { inStock, gallery, name, prices, id } = this.props.product;
		return (
			<div
				className="ProductCard"
				onMouseEnter={() => {
					this.setState({ fastShopBtn: true });
				}}
				onMouseLeave={() => {
					this.setState({ fastShopBtn: false });
				}}
			>
				<div
					className="stockOverlay"
					style={{
						visibility: inStock ? "hidden" : "block",
					}}
				></div>
				{this.state.fastShopAtts ? (
					<div className="fastShopPop stockOverlay">
						<div
							onMouseLeave={() => {
								this.setState({ fastShopAtts: false });
							}}
						>
							<AdjustButtons productId={id} client={this.props.client} />
						</div>
					</div>
				) : null}

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
						<div
							style={{
								display: this.state.fastShopBtn && inStock ? "block" : "none",
							}}
						>
							<img src={inCart} onClick={(e) => this.showPopup(e)} />
						</div>
					</div>
				</Link>
			</div>
		);
	}
}

export default ProductCard;
