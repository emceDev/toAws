import { Component } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import Categories from "./Categories";
import CurrencySwitcher from "./CurrencySwitcher";
import navbarLogo from "../images/logoTransparent.png";
class Navbar extends Component {
	state = { cartVisible: false };
	render() {
		return (
			<div className="Navbar">
				<Categories />
				<Link to={`/`}>
					<img src={navbarLogo} />
				</Link>

				<div className="NavbarRight">
					<CurrencySwitcher />
					<Cart overlay={true} client={this.props.client} />
				</div>
			</div>
		);
	}
}

export default Navbar;
