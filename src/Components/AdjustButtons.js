import { Component } from "react";
import { selectAttributes } from "../HOC/selectAttributes";

class AdjustButtons extends Component {
	light(id, value, displayValue) {
		let clName = id === "Color" ? "AttrBtnColor" : "AttrBtnText";
		const selected = this.props.setAttrs;
		let fullClName = selected.some(
			(a) =>
				a.attrId === id &&
				(a.attrValue === value || a.attrValue === displayValue)
		);
		return fullClName ? clName + " active" : clName;
	}

	render() {
		return (
			<div className="AdjustButtons">
				{this.props.attributes
					? this.props.attributes.map((attr) => {
							return (
								<div
									key={attr.name + this.props.productId}
									className="AttributeContainer"
								>
									<div className="AttrName">{attr.name}</div>
									<div className="AttrBtns">
										{attr.items.map((item, index) => {
											return (
												<div
													onClick={() =>
														this.props.modify(attr.name, item.value)
													}
													className={this.light(
														attr.name,
														item.value,
														item.displayValue
													)}
													key={item.id}
													id={item.id}
												>
													{attr.name !== "Color" ? (
														item.value
													) : (
														<div
															style={{
																backgroundColor: item.value,
															}}
														></div>
													)}
												</div>
											);
										})}
									</div>
								</div>
							);
					  })
					: null}
			</div>
		);
	}
}

export default selectAttributes(AdjustButtons);
