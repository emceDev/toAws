import AdjustButtons from "../MiniComponents/AdjustButtons";
import { Component } from "react";
import { useQuery, gql } from "@apollo/client";
import AddToCartButton from "../MiniComponents/AddToCartButton.js";
import { useParams } from "react-router-dom";
import Price from "../MiniComponents/Price";

const GET_PRODUCT_DETAILS = gql`
	query GetProduct($pid: String!) {
		product(id: $pid) {
			name
			id
			brand
			description
			gallery
			inStock
			attributes {
				name
				id
				items {
					value
					displayValue
				}
			}

			prices {
				currency {
					symbol
					label
				}
				amount
			}
		}
	}
`;

export const getProduct = (Component) => {
	return function WrappedComponent(props) {
		let params = useParams().id;

		const { data, loading, err } = useQuery(GET_PRODUCT_DETAILS, {
			variables: { pid: params === undefined ? props.item : params },
		});

		if (data) {
			return <Component {...props} data={data} />;
		} else {
			return <p>Loading prices</p>;
		}
	};
};
class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 0,
		};
	}
	selected(index) {
		this.setState({ selected: index });
	}
	render() {
		return (
			<>
				<div className="ProductDetails">
					<Imgs
						product={this.props.data.product}
						select={(index) => {
							this.selected(index);
						}}
					/>
					<div className="BigImg">
						<img
							style={{ height: "100%", width: "100%" }}
							src={this.props.data.product.gallery[this.state.selected]}
						></img>
					</div>
					<div className="Text">
						<div>{this.props.data.product.brand}</div>
						<div>{this.props.data.product.id}</div>
						<AdjustButtons
							id={this.props.data.product.id}
							attributes={this.props.data.product.attributes}
						/>

						<Price prices={this.props.data.product.prices} />

						<div>
							<AddToCartButton
								productId={this.props.data.product.id}
								attributes={this.props.data.product.attributes}
								prices={this.props.data.product.prices}
							/>
						</div>
						<div className="Description">
							{this.props.data.product.description}
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default getProduct(ProductDetails);

class Imgs extends Component {
	state = { count: 0 };
	render() {
		return (
			<div className="Imgs">
				{this.props.product.gallery.map((x, index) => {
					return (
						<div>
							<img
								style={{ height: "100%", width: "100%" }}
								src={x}
								id={index}
								onClick={(e) => this.props.select(e.target.id)}
							></img>
						</div>
					);
				})}
			</div>
		);
	}
}
