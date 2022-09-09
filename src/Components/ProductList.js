import { Component } from "react";
import ProductCard from "./ProductCard";

class ProductList extends Component {
	state = {};
	render() {
		return (
			<div className="ProductList">
				{/* {console.log(this.props)} */}
				{this.props.products.categories[0].products.map((product) => {
					// return <p>xd</p>;
					return <ProductCard product={product} />;
				})}

				{/* <ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard /> */}
			</div>
		);
	}
}

export default ProductList;
