import { useReactiveVar } from "@apollo/client";
import { Component } from "react";
import { selectedCurrencyVar, taxVar } from "../apolloState/client";

export const getCurrencies = (Component) => {
	return function WrappedComponent(props) {
		const currenc = useReactiveVar(selectedCurrencyVar);
		const tax = useReactiveVar(taxVar);
		return <Component {...props} currenc={currenc} tax={tax} />;
	};
};

class Price extends Component {
	state = {};

	render() {
		return (
			<div className="Price">
				{this.props.prices.map((x) =>
					x.currency.label === this.props.currenc.label ? (
						<div key={x.currency.label}>
							<b>
								{this.props.currenc.symbol}
								{Math.round(x.amount * 100) / 100}
							</b>
						</div>
					) : null
				)}
			</div>
		);
	}
}

export default getCurrencies(Price);
