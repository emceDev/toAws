import { Component } from "react";
import CartOverlay from "../Components/CartOverlay";
import Cart from "../Components/Cart";
import ProductList from "../Components/ProductList";
import ProductDetails from "../Components/ProductDetails";
import Navbar from "../Components/Navbar";
class Products extends Component {
	state = {};
	render() {
		return (
			<div>
				<div>
					<h1>ProductDetails</h1>
					<Navbar />
				</div>
				<div>
					<h1>ProductDetails</h1>
					<ProductDetails />
				</div>
				<div>
					<h1>ProductList</h1>
					<ProductList />
				</div>
				<div>
					<h1>CartOverlay</h1>
					<CartOverlay />
				</div>
				<div>
					<h1>CartMaxmimized</h1>
					<Cart />
				</div>
			</div>
		);
	}
}

export default Products;
