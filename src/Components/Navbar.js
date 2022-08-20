import { Component } from "react";
class Navbar extends Component {
	state = {};
	render() {
		return (
			<div className="Navbar">
				<Categories />
				<div className="Logo">green square</div>
				<div className="NavbarRight">
					<div className="CurrencyBtn">currency switcher</div>
					<div className="CartBtn">Cart</div>
				</div>
			</div>
		);
	}
}

export default Navbar;

const Categories = () => {
	return (
		<div className="Categories">
			<div>Women</div>
			<div>Men</div>
			<div>Kids</div>
		</div>
	);
};
