import AdjustButtons from "./AdjustButtons";
import QuantityButtons from "./QuantityButtons";
import { Component } from "react";
import { getProduct } from "../Components/ProductDetails";
import Price from "./Price";
import vector from "../images/Vector.png";
class CartProduct extends Component {
	state = {
		selected: 0,
	};
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
					<h1>{this.props.data.product.name}</h1>
					<h2>{this.props.data.product.id}</h2>
					<Price prices={this.props.data.product.prices} />
					<AdjustButtons
						id={this.props.data.product.id}
						attributes={this.props.data.product.attributes}
					/>
				</div>
				<div className="col2">
					<QuantityButtons id={this.props.data.product.id} />
				</div>

				<div className="col3">
					<div className="image">
						<img
							style={{ width: "100%", height: "100%" }}
							src={this.props.data.product.gallery[this.state.selected]}
						></img>
					</div>
					{this.props.hideButtons ? null : (
						<div className="imgButtons">
							<div onClick={() => this.switchImg(false)}>
								<img src={vector}></img>
							</div>
							<div onClick={() => this.switchImg(true)}>
								<img src={vector}></img>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default getProduct(CartProduct);
