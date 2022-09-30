import { gql, useQuery } from "@apollo/client";
import { GET_PRODUCT_ATTRS } from "../apolloState/queries";
import { useState, useEffect } from "react";

export const selectAttributes = (Component) => {
	return function WrappedComponent(props) {
		const { data, loading, error } = useQuery(GET_PRODUCT_ATTRS, {
			variables: { pid: props.productId },
		});
		const [attrs, setAttrs] = useState(null);
		const [attributes, setAttributes] = useState(null);
		const getAttrs = data;
		useEffect(() => {
			if (getAttrs === undefined) {
			} else {
				setAttrs(getAttrs.product.setAttrs);
				setAttributes(getAttrs.product.attributes);
			}
		}, [getAttrs]);

		function handleWrite(data) {
			props.client.writeFragment({
				id: "Product:" + props.productId,
				fragment: gql`
					fragment prodAttrs on Product {
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
		if (loading) {
			<p>loading...</p>;
		} else if (error) {
			<p>error occurred</p>;
		} else {
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
		}
	};
};
