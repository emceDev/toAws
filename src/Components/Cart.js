import { Component, useState, useEffect } from "react";
import { cartItemsVar, taxVar } from "../apolloState/client";
import { AdjustButtons } from "../MiniComponents/AdjustButtons";
import CartProduct from "../MiniComponents/CartProduct";
import { QuantityButtons } from "../MiniComponents/QuantityButtons";
import { useReactiveVar } from "@apollo/client";
import Price from "../MiniComponents/Price";
import Taxed from "../MiniComponents/Taxed";
import emptyCartImg from "../images/emptyCart.png";
export const getCartItems = (Component) => {
	return function WrappedComponent(props) {
		const currentCart = useReactiveVar(cartItemsVar);
		const tax = useReactiveVar(taxVar);
		const [totalPrices, setTotalPrices] = useState([]);
		const [quantity, setQuantity] = useState(0);
		useEffect(() => {
			return currentCart !== undefined ? sum() : null;
		}, [currentCart]);
		const sum = () => {
			let total = 0;
			let amounts = [];
			if (currentCart[0] !== undefined) {
				currentCart[0].prices.map((price) =>
					amounts.push({ amount: 0, currency: price.currency })
				);

				currentCart.map((item) => {
					total = total + item.count;
					setQuantity(total);
					item.prices.map((price) =>
						amounts.map((am, index) =>
							price.currency.label === am.currency.label
								? (amounts[index].amount =
										item.count * (amounts[index].amount + price.amount))
								: null
						)
					);
				});

				return setTotalPrices(amounts);
			} else {
			}
		};
		const cartItems = useReactiveVar(cartItemsVar);
		return (
			<Component
				{...props}
				items={cartItems}
				quantity={quantity}
				tax={tax}
				totalPrices={totalPrices}
			/>
		);
	};
};

class Cart extends Component {
	state = { cartVisible: false };
	render() {
		return (
			<div className="Cart">
				<div
					className="Switch"
					onClick={() =>
						this.setState({ cartVisible: !this.state.cartVisible })
					}
				>
					<div
						style={{
							visibility: this.props.items.length === 0 ? "hidden" : "inherit",
						}}
					>
						{this.props.items.length}
					</div>
					<img src={emptyCartImg} />
				</div>
				<div
					className={this.props.overlay ? "CartOverlay" : "Cart"}
					style={{ display: this.state.cartVisible ? "none" : "block" }}
				>
					{!this.props.items ? (
						<p>Loading</p>
					) : (
						<>
							<h1>{!this.props.overlay ? "Cart" : "My bag"}</h1>
							<div className="CartProducts">
								{this.props.items.map((x) => (
									<CartProduct hideButtons={false} item={x.productId} />
								))}
							</div>
							{this.props.overlay ? null : ( // "CartOverlay"
								<div className="CartOrder">
									<div className="CartOrderDetails">
										<div>
											<p>tax</p>
											<p>quantitiy</p>
											<p>total</p>
										</div>
										<div>
											<Taxed prices={this.props.totalPrices} />
											<p>{this.props.quantity}</p>
											{this.props.totalPrices !== undefined ? (
												<Price prices={this.props.totalPrices} />
											) : (
												<p>no prices</p>
											)}
										</div>
									</div>
									<div
										className="ButtonOrder"
										onClick={() => console.log(this.props.items)}
									>
										Button order
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		);
	}
}

export default getCartItems(Cart);
