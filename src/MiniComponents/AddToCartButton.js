import { makeVar, InMemoryCache, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { Component } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";
import { handleCart } from "../HOC/handleCart";

class AddToCartButton extends Component {
	render() {
		return (
			<div>
				<button onClick={() => this.props.click()}>
					{this.props.isInCart ? "remove" : "add"}
				</button>
			</div>
		);
	}
}

export default handleCart(AddToCartButton);
