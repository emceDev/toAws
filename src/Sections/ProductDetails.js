import AdjustButtons from "../Components/AdjustButtons";
import { Component } from "react";
import AddToCartButton from "../Components/AddToCartButton.js";
import Price from "../Components/Price";
import PNames from "../Components/PNames";
import { getProduct } from "../HOC/getProductDetails";
import { sanitize } from "dompurify";
import Imgs from "../Components/Imgs";
class ProductDetails extends Component {
	constructor() {
		super();
		this.state = {
			selected: 0,
		};
	}

	selected(index) {
		this.setState({ selected: index });
	}
	decode(html) {
		let e = document.getElementsByClassName("Description")[0];
		let x = e.childNodes.length === 0 ? "" : e.childNodes;
		e.innerHTML = html;
		// //console.log(x);
		// return e;
		return;
	}
	render() {
		const { id, gallery, brand, attributes, prices, description } =
			this.props.data.product;
		return (
			<>
				<div className="ProductDetails" id={id}>
					<Imgs
						product={this.props.data.product}
						select={(index) => {
							this.selected(index);
						}}
					/>
					<div className="BigImg">
						<img
							style={{ height: "100%", width: "100%" }}
							src={gallery[this.state.selected]}
						></img>
					</div>
					<div className="Text">
						<PNames name={brand} id={id} />

						<AdjustButtons
							productId={id}
							attributes={attributes}
							place="Details"
							client={this.props.client}
						/>
						<div>
							<p>PRICE:</p>
							<Price prices={prices} />
						</div>

						<div>
							<AddToCartButton
								productId={id}
								attributes={attributes}
								prices={prices}
							/>
						</div>
						<div className="Description">
							<div
								dangerouslySetInnerHTML={{
									__html: sanitize(description),
								}}
							/>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default getProduct(ProductDetails);
