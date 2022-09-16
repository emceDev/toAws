import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { client } from "./apolloState/client";

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
