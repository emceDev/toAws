import { Component, useState, useEffect } from "react";

import CartProduct from "../Components/CartProduct";
import CartSwitch from "../Components/CartSwitch";
import CartOrder from "../Components/CartOrder";
import CartOverlayBottom from "../Components/CartOverlayBottom";
import { getCartItems } from "../HOC/getCartItems";

// CartOverlay is used here in the meaning of "MyBag" in figma
// this.props.myBag: Boolean - true if cart is opened as MyBag false if opened is Cart
class Cart extends Component {
	state = { cartVisible: true, overlay: false };

	toggleVisibility() {
		this.setState({ cartVisible: !this.state.cartVisible });
		document.getElementById("OverlayDark").style.display = !this.state
			.cartVisible
			? "none"
			: "block";
	}
	render() {
		const { myBag, items, totalPrices, quantity } = this.props;
		return (
			<div className="Cart">
				{/* SWITCH HANDLING VISIBILITY OF CART FROM NAVBAR */}
				{myBag ? (
					<CartSwitch
						cartVisible={this.state.cartVisible}
						toggleVisibility={() => this.toggleVisibility()}
						items={items}
					/>
				) : null}
				{/* END OF SWITCH */}
				<div
					className={myBag ? "CartOverlay" : "Cart"}
					style={{
						display: this.state.cartVisible && myBag ? "none" : "block",
					}}
				>
					<div>
						<h1>
							{!myBag ? "Cart" : "My bag"},{items.length}
						</h1>
						<div className="CartProducts">
							{items.map((x) => (
								<CartProduct
									myBag={myBag}
									key={x.productId}
									item={x.productId}
									inCartQuantity={x.inCartQuantity}
									client={this.props.client}
								/>
							))}
						</div>
						{/* Checks whether to load bottom part for my bag or cart */}
						{myBag ? (
							<CartOverlayBottom totalPrices={totalPrices} />
						) : (
							<CartOrder
								totalPrices={totalPrices}
								prices={totalPrices}
								quantity={quantity}
								items={items}
								client={this.props.client}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default getCartItems(Cart);
