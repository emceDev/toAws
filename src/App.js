import "./App.scss";
import { Component } from "react";
import { gql } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Sections/Navbar";
import ProductList from "./Sections/ProductList";
import ProductDetails from "./Sections/ProductDetails";
import Cart from "./Sections/Cart";

class App extends Component {
	state = { view: false };

	render() {
		return (
			<div className="App">
				<Navbar showCart={() => this.setView()} client={this.props.client} />
				<Routes>
					<Route
						path="/"
						element={<ProductList client={this.props.client} />}
					></Route>

					<Route
						path="/Cart"
						element={<Cart myBag={false} client={this.props.client} />}
					></Route>

					<Route
						path="/products/:id"
						element={
							<ProductDetails place="product" client={this.props.client} />
						}
					></Route>
				</Routes>
				<div
					className="OverlayDark"
					id="OverlayDark"
					style={{ display: "none" }}
				></div>
			</div>
		);
	}
}

export default App;
