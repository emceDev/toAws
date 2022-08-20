import { AdjustButtons } from "../MiniComponents/AdjustButtons";
import { Component } from "react";
class ProductDetails extends Component {
	state = {};
	render() {
		return (
			<div className="ProductDetails">
				<div className="Imgs">
					<div>img</div>
					<div>img</div>
					<div>img</div>
				</div>
				<div className="BigImg">big img</div>
				<div className="Text">
					<div>title</div>
					<div>subtitle</div>
					<AdjustButtons />
					<div>Price</div>
					<div>50$</div>
					<div>AddToCart</div>
					<div className="Description">Description</div>
				</div>
			</div>
		);
	}
}

export default ProductDetails;
