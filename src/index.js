import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
	makeVar,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./Components/ProductList";

const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<ApolloProvider client={client}>
		<Router>
			<App client={client} />
		</Router>
	</ApolloProvider>
	// </React.StrictMode>
);
