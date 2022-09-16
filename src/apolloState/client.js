import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
	makeVar,
} from "@apollo/client";

export const cartItemsVar = makeVar([]);

export const selectedCurrencyVar = makeVar({
	label: "USD",
	symbol: "$",
});
export const currentlyModified = makeVar({
	id: "id",
	attributes: [{ name: "Color", value: "Red" }],
});
export const currentCategoryVar = makeVar("all");
export const taxVar = makeVar(25);
const cache = new InMemoryCache({
	typePolicies: {
		Product: {
			fields: {
				isInCart: {
					read(_, { readField }) {
						const productId = readField("id");
						return cartItemsVar().some((x) => x.productId === productId);
					},
				},
			},
		},
		Currency: {
			fields: {
				selected: {
					read(_, { readField }) {
						const label = readField("label");
						return selectedCurrencyVar() === label;
					},
				},
			},
		},
	},
});

export const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: cache,
});
