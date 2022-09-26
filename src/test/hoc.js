import { cartItemsVar, taxVar } from "../apolloState/client";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";

export const hoc = (Component) => {
	return function WrappedComponent(props) {
		const [place, setPlace] = useState("DefaultPlace");

		useEffect(() => {
			setPlace(props.place);
		}, []);
		//console.log("AT hoc ", props);

		return <Component {...props} fromHoc={place} />;
	};
};
