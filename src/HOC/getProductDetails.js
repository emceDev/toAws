import { useQuery, useReactiveVar } from "@apollo/client";
import { useParams } from "react-router-dom";
import { cartProductsVar } from "../apolloState/client";
import { GET_PRODUCT_DETAILS } from "../apolloState/queries";
import { useEffect } from "react";
export const getProductDetails = (Component) => {
	return function WrappedComponent(props) {
		let params = useParams().id;
		const currentCart = useReactiveVar(cartProductsVar);
		const { data, loading } = useQuery(GET_PRODUCT_DETAILS, {
			// variables: { pid: params === undefined ? props.item : params },
			variables: { pid: props.place === "product" ? params : props.item },
		});

		useEffect(() => {
			console.log(data);
		}, [data]);
		function addRemove() {
			const p = data.product;

			const toCartData = {
				productId: p.id,
				prices: p.prices,
				inCartQuantity: 1,
			};
			cartProductsVar(
				p.isInCart
					? currentCart.filter((x) => x.productId !== p.id)
					: [...currentCart, toCartData]
			);
		}
		if (loading !== true) {
			return <Component {...props} data={data} addRemove={addRemove} />;
		} else {
			return <p>Loading details...</p>;
		}
	};
};
