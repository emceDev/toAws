import "./App.scss";
import { Component } from "react";
import { gql } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Sections/Navbar";
import ProductList from "./Sections/ProductList";
import ProductDetails from "./Sections/ProductDetails";
import Cart from "./Sections/Cart";
import Son from "./test/son";
import Sis from "./test/sis";
import { AddTodo, Tada } from "./test/addTodo";

class App extends Component {
	state = { view: false };

	setView() {
		//console.log("invoked");
		//console.log(this.state.view);
		// this.setState({ view: !this.state.view });
		this.props.client.cache.writeQuery({
			query: gql`
				query ReadTodo($id: ID!) {
					todo(id: $id) {
						id
						text
						completed
					}
				}
			`,
			data: {
				todo: {
					__typename: "Todo",
					id: 5,
					text: "Buy grapes 🍇",
					completed: false,
				},
			},
			variables: {
				id: 5,
			},
		});
	}
	render() {
		return (
			<div className="App">
				{/* <Tada client={this.props.client} /> */}

				{/* <Sis />
				<Son /> */}
				<Navbar showCart={() => this.setView()} client={this.propsclient} />
				<Routes>
					<Route path="/" element={<ProductList />}></Route>

					<Route path="/Cart" element={<Cart myBag={false} />}></Route>

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
