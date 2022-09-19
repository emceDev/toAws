import { Component } from "react";
import { getCurrencies } from "./Price";

class Taxed extends Component {
	state = {};

	render() {
		const { prices, currenc, tax } = this.props;
		return (
			<>
				{prices.map((x) =>
					x.currency.label === currenc.label ? (
						<p key={x.currency.label}>
							{currenc.symbol}
							{x.amount / tax}
						</p>
					) : null
				)}
			</>
		);
	}
}
export default getCurrencies(Taxed);
