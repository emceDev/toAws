import AdjustButtons from "./AdjustButtons";
import QuantityButtons from "./QuantityButtons";
import { Component } from "react";
import Price from "./Price";
import PNames from "./PNames";
import { getProductDetails } from "../HOC/getProductDetails";
import { Link } from "react-router-dom";

class CartProduct extends Component {
	state = {
		selected: 0,
	};
	// gallery image handler
	switchImg = (arg) => {
		const limit = this.props.data.product.gallery.length - 1;
		arg
			? this.state.selected + 1 > limit
				? this.setState({ selected: 0 })
				: this.setState({ selected: this.state.selected + 1 })
			: this.state.selected - 1 <= 0
			? this.setState({ selected: limit })
			: this.setState({ selected: this.state.selected - 1 });
	};
	render() {
		return (
			<div className="CartProduct">
				<div className="col1">
					<PNames
						myBag={this.props.myBag}
						name={this.props.data.product.name}
						id={this.props.data.product.id}
					/>
					<Price prices={this.props.data.product.prices} />

					<AdjustButtons
						productId={this.props.data.product.id}
						place={"cart" + this.props.data.product.id}
						client={this.props.client}
					/>
				</div>

				<div className="col2">
					<QuantityButtons
						productId={this.props.data.product.id}
						client={this.props.client}
						inCartQuantity={this.props.inCartQuantity}
					/>
					<div className="image">
						<Link to={`/products/${this.props.data.product.id}`}>
							<img
								style={{ width: "100%", height: "100%" }}
								src={this.props.data.product.gallery[this.state.selected]}
							></img>
						</Link>
						{this.props.myBag ? null : (
							<div className="imgBtns">
								<div onClick={() => this.switchImg(false)}>
									{/* <img src={vector}></img> */}
									{"<"}
								</div>
								<div onClick={() => this.switchImg(true)}>
									{">"}
									{/* <img src={vector}></img> */}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default getProductDetails(CartProduct);
