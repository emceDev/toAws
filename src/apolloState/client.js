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
						return cartItemsVar().some((x) => x.productId === productId);
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
	},
});

export const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: cache,
});
