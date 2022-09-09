import { Component } from "react";
import ProductList from "../Components/ProductList";
class Products extends Component {
	state = {};
	render() {
		return (
			<div>
				<div>
					<h1>ProductList</h1>
					<ProductList products={this.props.products} />
				</div>
				{/* {console.log(this.props)} */}
				<div>{/* <Navbar /> */}</div>
				{/* <div>
					<h1>ProductDetails</h1>
					<ProductDetails />
				</div> */}

				<div>
					{/* <h1>CartOverlay</h1> */}
					{/* <CartOverlay /> */}
				</div>
				<div>
					{/* <h1>CartMaxmimized</h1> */}
					{/* <Cart /> */}
				</div>
			</div>
		);
	}
}

export default Products;
