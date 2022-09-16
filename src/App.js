import "./App.scss";
import { Component } from "react";
import Products from "./Pages/Products";
import { gql } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import CurrencySwitcher from "./Components/CurrencySwitcher";
import Navbar from "./Components/Navbar";

class App extends Component {
	state = { view: false };

	setView() {
		console.log("invoked");
		console.log(this.state.view);
		this.setState({ view: !this.state.view });
	}
	render() {
		return (
			<div className="App">
				APP
				<Navbar showCart={() => this.setView()} client={this.props.client} />
				<Routes>
					<Route
						path="/"
						element={
							this.state.loading ? (
								<p>Loading...</p>
							) : this.state.error ? (
								<p>Error :</p>
							) : (
								<Products />
							)
						}
					></Route>

					<Route
						path="/Cart"
						element={
							this.state.loading ? (
								<p>Loading...</p>
							) : this.state.error ? (
								<p>Error :</p>
							) : (
								<Cart overlay={false} client={this.state.client} />
							)
						}
					></Route>

					<Route
						path="/products/:id"
						element={<ProductDetails client={this.props.client} />}
					></Route>
				</Routes>
			</div>
		);
	}
}

export default App;
