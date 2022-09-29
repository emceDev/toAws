import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

// products in cart
const cartItem = {
	productId: "id",
	quantity: "quantity",
	prices: { amount: "123", currency: { symbol: "usd" } },
};
export const cartProductsVar = makeVar([]);
const summary = {
	total: "map cart products",
	quantity: "list of cart products",
};
export const cartSummary = makeVar([]);
export const cartItemsVar = makeVar([]);

// default currency
export const selectedCurrencyVar = makeVar({
	label: "USD",
	symbol: "$",
});

// product being modified not yet put into the cart

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

						let z = cartProductsVar().some((x) => x.productId === productId);
						return z;
					},
				},
				setAttrs: {
					read(setAttrs = [], { readField }) {
						const defs = [];
						if (setAttrs.length === 0) {
							readField("attributes")?.map((ref) => {
								let id = ref.name;
								let value = readField("items", ref)[0].__ref.replace(
									"Attribute:",
									""
								);

								defs.push({ attrId: id, attrValue: value });
							});
							return defs;
						} else {
							return setAttrs;
						}
					},
					merge(setAttrs = [], incoming) {
						return incoming;
					},
				},
				inCartQuantity: {
					read(quantity = 1) {
						return quantity;
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
						return cartProductsVar();
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
