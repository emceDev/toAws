import { Component } from "react";
import { getCurrencies } from "./Price";

class Taxed extends Component {
	state = {};

	render() {
		return (
			<>
				{this.props.prices.map((x) =>
					x.currency.label === this.props.currenc.label ? (
						<p key={x.currency.label}>
							{this.props.currenc.symbol}
							{x.amount / this.props.tax}
						</p>
					) : null
				)}
			</>
		);
	}
}
export default getCurrencies(Taxed);
