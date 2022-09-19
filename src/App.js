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

	setView() {
		console.log("invoked");
		console.log(this.state.view);
		this.setState({ view: !this.state.view });
	}
	render() {
		return (
			<div className="App">
				<Navbar showCart={() => this.setView()} />
				<Routes>
					<Route path="/" element={<ProductList />}></Route>

					<Route path="/Cart" element={<Cart myBag={false} />}></Route>

					<Route path="/products/:id" element={<ProductDetails />}></Route>
				</Routes>
				<div className="OverlayDark" id="OverlayDark"></div>
			</div>
		);
	}
}

export default App;
