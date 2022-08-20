import { AdjustButtons } from "./AdjustButtons";
import { QuantityButtons } from "./QuantityButtons";

export const CartProduct = (props) => {
	return (
		<div className="CartProduct">
			<div className="col1">
				<p>prod title</p>
				<p>prod subtitle</p>
				<p>price</p>
				<AdjustButtons />
			</div>
			<div className="col2">
				<QuantityButtons />
			</div>

			<div className="col3">
				<div className="image">image</div>
				{props.hideButtons ? null : (
					<div className="imgButtons">
						<div>{"<"}</div>
						<div>{">"}</div>
					</div>
				)}
			</div>
		</div>
	);
};
