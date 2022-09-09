import AdjustButtons from "../MiniComponents/AdjustButtons";
import { Component } from "react";
import { useQuery, gql } from "@apollo/client";
import AddToCartButton from "../MiniComponents/AddToCartButton";
// const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS);

// async function getDetails() {
const GET_PRODUCT_DETAILS = gql`
	{
		product(id: "ps-5") {
			id
			brand
			description
			gallery
			inStock
			attributes {
				name
				items {
					value
					displayValue
				}
			}

			prices {
				currency {
					symbol
				}
				amount
			}
		}
	}
`;

class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = { details: {}, loading: true };
	}
	async componentDidMount() {
		try {
			const response = this.props.client.query({
				query: GET_PRODUCT_DETAILS,
			});
			response.then((x) => {
				this.setState({ loading: false });
				this.setState({ details: x.data.product });
			});
		} catch (err) {
			this.setState({ error: err });
			console.log(err);
		}
	}

	render() {
		return (
			<>
				{this.state.loading ? (
					"loading"
				) : (
					<div className="ProductDetails">
						<div className="Imgs">
							{this.state.details.gallery.map((x) => {
								return <div>img</div>;
							})}
						</div>
						<div className="BigImg">big img</div>
						<div className="Text">
							<div>{this.state.details.brand}</div>
							<div>{this.state.details.id}</div>
							<AdjustButtons
								id={this.state.details.id}
								attributes={this.state.details.attributes}
							/>
							<div>Price</div>
							<div>
								{this.state.details.prices[0].currency.symbol}
								{this.state.details.prices[0].amount}
							</div>
							<div>
								<AddToCartButton productId={this.state.details.id} />
							</div>
							<div className="Description">
								{this.state.details.description}
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}

export default ProductDetails;

// const GET_PRODUCT_DETAILS = gql`
// 	query GET_PRODUCT_DETAILS($id: ID!) {
// 		todo(id: $id) {
// 			id
// 			text
// 			completed
// 		}
// 	}
// `;

// Fetch the cached to-do item with ID 5
// const { product } = client.readQuery({
// 	query: GET_PRODUCT_DETAILS,
// 	variables: {
// 		name: "AirPods Pro",
// 	},
// });
