import { gql, useQuery } from "@apollo/client";
import { GET_PRODUCT_ATTRS } from "../apolloState/queries";
import { useState, useEffect } from "react";

export const selectAttributes = (Component) => {
	return function WrappedComponent(props) {
		const getAttrs = useQuery(GET_PRODUCT_ATTRS, {
			variables: { pid: props.productId },
		});
		const [attrs, setAttrs] = useState(null);
		const [attributes, setAttributes] = useState(null);
		useEffect(() => {
			console.log("ADJSTBUTTONS: ", getAttrs);
			if (getAttrs.data === undefined) {
			} else {
				setAttrs(getAttrs.data.product.setAttrs);
				setAttributes(getAttrs.data.product.attributes);
			}
		}, [getAttrs]);

		function handleWrite(data) {
			console.log("writing, ", data);
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
			return handleWrite(nA);
		};

		if (attrs !== null) {
			return (
				<Component
					{...props}
					setAttrs={attrs}
					attributes={attributes}
					modify={(prodId, attrId, attrValue) => {
						modify(prodId, attrId, attrValue);
					}}
				/>
			);
		} else {
			return <p>loading attributes</p>;
		}
	};
};
