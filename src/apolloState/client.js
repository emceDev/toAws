import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
	makeVar,
} from "@apollo/client";

// products in cart
export const cartItemsVar = makeVar([]);

// default currency
export const selectedCurrencyVar = makeVar({
	label: "USD",
	symbol: "$",
});

// product being modified not yet put into the cart
export const currentlyModified = makeVar();

// selected category
export const currentCategoryVar = makeVar("tech");

// tax value, as it differs depending on country
export const taxVar = makeVar(25);
const defExpam = [
	{ id: "color", value: "blue" },
	{ id: "size", value: "m" },
];
// isInCart - true if product is in cart (variable used when displaying inCart icon on ProductCard component)
// selected - returns true or false if currency is selected One (used in order to display one currency everywhere)
const cache = new InMemoryCache({
	typePolicies: {
		Product: {
			fields: {
				isInCart: {
					// compares if any of cart items possess same id as product used in <ProductCard/>
					read(_, { readField }) {
						const productId = readField("id");
						//console.log("client", productId);
						let z = cartItemsVar().some((x) => x.productId === productId);
						//console.log("client", z);
						return z;
					},
				},
				selected: {
					// compares if any of cart items possess same id as product used in <ProductCard/>
					read() {
						return "ATTRIBUTES";
					},
				},
				text: {
					read(value = "xd") {
						return value;
					},
					merge(existing = [], incoming) {
						console.log("merging on product", existing, incoming);
						return [...existing, incoming];
					},
				},
				setAttrs: {
					read(setAttrs = [], { readField }) {
						const defs = [];
						if (setAttrs.length === 0) {
							readField("attributes")?.map((ref) => {
								let id = ref.__ref.replace("AttributeSet:", "");
								let value = readField("items", ref)[0].value;
								defs.push({ attrId: id, attrValue: value });
							});
							console.log("defaults from attrs");
							return defs;
						}
						console.log("returning normal");
						return setAttrs;
					},
					merge(setAttrs = [], incoming) {
						console.log("merging on product", setAttrs, "incoming ", incoming);
						return incoming;
					},
				},
			},
		},
		Currency: {
			fields: {
				selected: {
					// returns true or false depending if currency is selected used in <CurrencySwitcher/>
					read(_, { readField }) {
						const label = readField("label");
						return selectedCurrencyVar() === label;
					},
				},
			},
		},
		Query: {
			fields: {
				cart: {
					// compares if any of cart items possess same id as product used in <ProductCard/>
					read() {
						console.log(cartItemsVar());
						return cartItemsVar();
					},
				},
				modified: {
					// compares if any of cart items possess same id as product used in <ProductCard/>
					read() {
						console.log(currentlyModified());
						return currentlyModified();
					},
				},
				todo: {
					read() {
						return "XD";
					},
					merge(existing = [], incoming) {
						console.log(incoming);
						return [...existing, ...incoming];
					},
				},

				text: {
					merge(existing = [], incoming) {
						console.log("merging", existing, incoming);
						return [...existing, incoming];
					},
				},
			},
		},
	},
});

//https://www.w3resource.com/apollo-graphql/local-state-management-apollo-client.php
// https://www.apollographql.com/docs/react/api/cache/InMemoryCache/#writequery
// Local state in Apollo cache ctrl+f
// https://levelup.gitconnected.com/storing-local-data-with-apollo-client-dffc304efdfc
// https://adhithiravi.medium.com/graphql-mutations-and-caching-using-apollo-client-46294d3350ab

export const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: cache,
});

// WORKIGN ATTRs
// setAttrs: {
// 	read(setAttrs = [], { readField }) {
// 		const defs = [];
// 		readField("attributes").map((ref) => {
// 			let id = ref.__ref.replace("AttributeSet:", "");
// 			let value = readField("items", ref)[0].value;
// 			setAttrs.push({ id: id, value: value });
// 		});
// 		return setAttrs;
// 	},
// 	merge(existing = [], incoming) {
// 		console.log("merging on product", existing, incoming);
// 		return [...existing, incoming];
// 	},
// },
