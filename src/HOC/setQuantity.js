import { useReactiveVar } from "@apollo/client";
import { cartProductsVar } from "../apolloState/client";

export const setCount = (Component) => {
	return function WrappedComponent(props) {
		const cart = useReactiveVar(cartProductsVar);
		const q = props.inCartQuantity;
		const productId = props.productId;
		const count = (attrValue) => {
			const number = attrValue ? q + 1 : q - 1 <= 0 ? q : q - 1;
			handleWrite(number);
		};
		function handleWrite(number) {
			let nA = [];
			cart.map((p) =>
				p.productId === productId
					? nA.push({
							productId: p.productId,
							inCartQuantity: number,
							prices: p.prices,
					  })
					: nA.push(p)
			);
			cartProductsVar(nA);
		}
		return (
			<Component
				{...props}
				counter={(attrValue) => {
					count(attrValue);
				}}
			/>
		);
	};
};
