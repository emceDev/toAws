import { Component } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { cartItemsVar, currentlyModified } from "../apolloState/client";

const GET_MODIFIED = gql`
	query getModified {
		modified @client {
			productId
			attributes {
				attrId
				attrValue
			}
		}
	}
`;
const GET_PRODUCT_ATTS = gql`
	query getAtts($pid: String!) {
		product(id: $pid) {
			setAttrs {
				attrId
				attrValue
			}
		}
	}
`;
const selectAttributes = (Component) => {
	return function WrappedComponent(props) {
		const getAttrs = useQuery(GET_PRODUCT_ATTS, {
			variables: { pid: props.productId },
		});
		const attrs = getAttrs.data.product.setAttrs;

		function handleWrite(data) {
			// console.log("writting", data);
			return props.client.writeFragment({
				id: "Product:" + props.productId,
				fragment: gql`
					fragment Prod on Product {
						setAttrs {
							attrId
							attrValue
						}
					}
				`,
				data: { setAttrs: data },
			});
		}

		const modify = (attrId, attrValue) => {
			let nA = [];
			attrs.map((attr) =>
				attr.attrId === attrId
					? nA.push({ attrId: attrId, attrValue: attrValue })
					: nA.push(attr)
			);
			handleWrite(nA);
		};

		if (attrs !== null) {
			return (
				<Component
					{...props}
					setAttrs={attrs}
					modify={(prodId, attrId, attrValue) => {
						modify(prodId, attrId, attrValue);
					}}
				/>
			);
		} else {
			return <p onClick={() => console.log(attrs)}>loading attributes</p>;
		}
	};
};

class AdjustButtons extends Component {
	constructor(props) {
		super(props);
	}
	light(id, value, name) {
		// console.log("ligh", this.props.setAttrs.setAttrs);
		let clName = name === "Color" ? "AttrBtnColor" : "AttrBtnText";
		const selected = this.props.setAttrs;
		let z = selected.some((a) => a.attrId === id && a.attrValue === value);

		return z ? clName + " active" : clName;
	}

	render() {
		return (
			<div className="AdjustButtons">
				{console.log("in class", this.props)}
				{this.props.attributes
					? this.props.attributes.map((attr) => {
							return (
								<div
									key={attr.id + this.props.productId}
									className="AttributeContainer"
								>
									<div className="AttrName">{attr.name}</div>
									<div className="AttrBtns">
										{attr.items.map((item, index) => {
											return (
												<div
													onClick={() => this.props.modify(attr.id, item.value)}
													className={this.light(
														attr.id,
														item.value,
														attr.name,
														index
													)}
													key={item.value}
													id={item.value}
													style={{
														backgroundColor:
															attr.name === "Color" ? item.value : null,
													}}
												>
													{attr.name !== "Color" ? item.value : null}
												</div>
											);
										})}
									</div>
								</div>
							);
					  })
					: null}
			</div>
		);
	}
}

export default selectAttributes(AdjustButtons);

const x = {
	// useEffect(() => {
	// 	if (selected === null) {
	// 		let def = [];
	// 		props.attributes.map((attr) =>
	// 			def.push({ attrId: attr.id, attrValue: attr.items[0].value })
	// 		);
	// 		//console.log("DEFAULTS", def);
	// 		setSelected(def);
	// 		// Setting variable(currently modified) to default
	// 		// when component loads with attributes given from props
	// 		currentlyModified({ productId: props.productId, attributes: def });
	// 	}
	// }, []);
	// useEffect(() => {
	// 	console.log("modified changed", currModified.attributes[0]);
	// 	setSelected(currModified);
	// }, [currModified]);
	// // useEffect(() => {}, [currModified]);
	// function modify(prodId, attrId, attrValue) {
	// 	// console.log(props);
	// 	console.log("Modyfing:", { attrId, attrValue });
	// 	if (currentCart.length > 0) {
	// 		console.log("modify 1st");
	// 		// check in cart
	// 	} else if (currModified.productId === prodId) {
	// 		// modify currMOdified
	// 		console.log("modify 2nd");
	// 		let x = currModified.attributes.map((attr) =>
	// 			attrId === attr.attrId
	// 				? { attrId: attrId, attrValue: attrValue }
	// 				: attr
	// 		);
	// 		// this does not update immiadetely
	// 		currentlyModified({ productId: prodId, attributes: x });
	// 		console.log("MODIFIED:", currModified.attributes[0]);
	// 		setSelected(currModified.attributes);
	// 	} else {
	// 		console.log("modify 3rd");
	// 		let def = [];
	// 		props.attributes.map((attr) =>
	// 			def.push({ attrId: attr.id, attrValue: attr.items[0].value })
	// 		);
	// 		currentlyModified({ productId: props.productId, attributes: def });
	// 	}
	// }
};
