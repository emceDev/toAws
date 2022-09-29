import { Component } from "react";
import { getCurrencies } from "../HOC/getCurrencies";

class Switcher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shown: false,
		};
	}
	render() {
		return (
			<div className="CurrencySwitcher">
				<div
					className="Switch"
					onClick={() => this.setState({ shown: !this.state.shown })}
				>
					<div>{this.props.currenc.symbol}</div>
					<div>{">"}</div>
				</div>
				<div
					className="CurrencyList"
					style={{ display: this.state.shown ? "block" : "none" }}
				>
					{!this.props.data ? (
						<p>no DATA!</p>
					) : (
						this.props.data.currencies.map((currency) => {
							return (
								<div
									key={currency.symbol}
									onClick={() => this.props.selectCurrency(currency)}
								>
									{currency.symbol}
									{currency.label}
								</div>
							);
						})
					)}
				</div>
			</div>
		);
	}
}

export default getCurrencies(Switcher);
