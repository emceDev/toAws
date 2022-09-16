import { Component } from "react";
import { Currency } from "../Components/CurrencySwitcher";
import ProductList from "../Components/ProductList";
class Products extends Component {
	state = {};
	render() {
		return (
			<div>
				<ProductList />
			</div>
		);
	}
}

export default Products;
