import { Component } from "react";
import ProductCard from "./ProductCard";

class ProductList extends Component {
	state = {};
	render() {
		return (
			<div className="ProductList">
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		);
	}
}

export default ProductList;
