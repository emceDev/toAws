import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const M_PROD = gql`
	query GetProduct1 {
		product(id: "ps-5") {
			text @client
		}
	}
`;
const R_PROD = gql`
	query GetProduct2($pid: String!) {
		product(id: $pid) {
			id
			name
			attributes {
				id
				items {
					value
				}
			}
			setAttrs @client {
				attrId
				attrValue
			}
			text @client
		}
	}
`;

export const Tada = (props) => {
	const [text, setText] = useState("default");
	const cache = props.client.cache;
	const product = useQuery(R_PROD, { variables: { pid: "ps-5" } });
	const txt = useQuery(M_PROD);
	if (product !== undefined) {
		const frag = props.client.readFragment({
			id: "Product:ps-5",
			fragment: gql`
				fragment Prodc on Product {
					setAttrs {
						attrId
						attrValue
					}
				}
			`,
		});
		function read() {}
		function handleWrite() {
			props.client.writeFragment({
				id: "Product:ps-5",
				fragment: gql`
					fragment Prod on Product {
						setAttrs {
							attrId
							attrValue
						}
					}
				`,
				data: {
					setAttrs: {
						attrId: "Color",
						attrValue: text,
					},
				},
			});
		}
		function handleUpdate() {
			cache.modify({
				id: cache.identify("Product:ps-5"),
				fields: {
					name(cachedName) {
						return cachedName.toUpperCase();
					},
				},
				/* broadcast: false // Include this to prevent automatic query refresh */
			});
		}
		return (
			<div>
				<input type="text" onChange={(e) => setText(e.target.value)}></input>
				{/* <button onClick={modifyProd}>PROD</button> */}
				<h1>{product?.data?.product?.id}</h1>
				<div>
					{frag === undefined || frag === null ? (
						<p>no frag</p>
					) : (
						<p>{frag?.setAttrs[0]?.attrValue}</p>
					)}

					<div>
						{product === undefined || product === null ? (
							<p>no prod</p>
						) : (
							<p>{product.data.product.setAttrs[0].attrValue};</p>
						)}
					</div>
				</div>

				<div>
					{/* {product?.data?.product?.setAttrs?.map((x) => (
						<p>{x.id}</p>
					))} */}
				</div>
				<button onClick={read}>read</button>
				<button onClick={() => handleWrite()}>write</button>
			</div>
		);
	}
};
const working = {
	// const product = useQuery(R_PROD, { variables: { pid: "ps-5" } });
	// const txt = useQuery(M_PROD);
	// const frag = props.client.readFragment({
	// 	id: "Product:ps-5",
	// 	fragment: gql`
	// 		fragment Prodc on Product {
	// 			id
	// 			name
	// 			text
	// 		}
	// 	`,
	// });
	// const writeFrag = () =>
	// 	props.client.writeFragment({
	// 		id: "Product:ps-5",
	// 		fragment: gql`
	// 			fragment Prod on Product {
	// 				text
	// 			}
	// 		`,
	// 		data: {
	// 			text: "Updated",
	// 		},
	// 	});
	// function read() {
	// 	console.log(frag);
	// 	// console.log(product.data.product);
	// }
	// function handleWrite() {
	// 	// cache.writeQuery({
	// 	// 	query: M_PROD,
	// 	// 	data: { product: { text: "asdf" } },
	// 	// });
	// 	writeFrag();
	// 	// console.log(writeFrag);
	// }
	// POCLITY:
	// setAttrs: {
	// 	read(_, { readField }) {
	// 		const defs = [];
	// 		readField("attributes").map((ref) => {
	// 			let id = ref.__ref.replace("AttributeSet:", "");
	// 			let value = readField("items", ref)[0].value;
	// 			defs.push({ id: id, value: value });
	// 		});
	// 		return defs;
	// 	},
	// 	merge(existing = [], incoming) {
	// 		console.log("merging on product", existing, incoming);
	// 		return [...existing, incoming];
	// 	},
	// },
};
