import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useState, useEffect, Component } from "react";
import { selectedCurrencyVar } from "../apolloState/client";
import imgVectorDown from "../images/downV.png";
const GET_CURRENCIES = gql`
	{
		currencies {
			label
			symbol
		}
	}
`;

const getCurrencies = (Component) => {
	return function WrappedComponent(props) {
		const { data, loading, err } = useQuery(GET_CURRENCIES);
		const currenc = useReactiveVar(selectedCurrencyVar);
		function selectCurrency(currency) {
			selectedCurrencyVar(currency);
		}
		if (data) {
			return (
				<Component
					{...props}
					data={data}
					selectCurrency={(x) => selectCurrency(x)}
					currenc={currenc}
				/>
			);
		} else {
			return <p>Loading prices</p>;
		}
	};
};

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
					<div>{this.props.currenc.label}</div>
					<div>
						<img src={imgVectorDown} />
					</div>
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
