import "./App.scss";
import { Component } from "react";
import Products from "./Pages/Products";
import { gql } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {} from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import AddToCartButton from "./MiniComponents/AddToCartButton";
import { CartTwo } from "./Components/useCartItems";

const GET_PRODUCTS = gql`
	{
		categories {
			products {
				name
				gallery
				prices {
					currency {
						label
					}
					amount
				}
			}
		}
	}
`;

class App extends Component {
	state = { products: [], loading: true, error: null };
	async componentDidMount() {
		try {
			const response = this.props.client.query({
				query: GET_PRODUCTS,
			});
			response.then((x) => {
				// console.log(x.data);
				this.setState({ products: x.data });
				this.setState({ loading: x.loading });
			});
		} catch (err) {
			this.setState({ error: err });
			console.log(err);
		}
	}
	render() {
		return (
			<div className="App">
				APP
				<CartTwo client={this.props.client} />
				{/* <Cart client={this.props.client} /> */}
				{/* <AddToCartButton client={this.props.client} /> */}
				{/* <Routes>
					<Route
						path="/"
						element={
							this.state.loading ? (
								<p>Loading...</p>
							) : this.state.error ? (
								<p>Error :</p>
							) : (
								<Products products={this.state.products} />
							)
						}
					></Route>
					<Route
						path="/products/:id"
						element={<ProductDetails client={this.props.client} />}
					></Route>
				</Routes>
				<Cart client={this.props.client} /> */}
			</div>
		);
	}
}

export default App;
