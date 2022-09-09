import { Component } from "react";

class AdjustButtons extends Component {
	state = {};
	render() {
		return (
			<div className="AdjustButtons">
				<div>
					{this.props.attributes.map((attr) => {
						return (
							<div key={attr.name}>
								<p>{attr.name}</p>
								<div className="AdjustButtonsSizes">
									{attr.items.map((item) => {
										return (
											<div
												key={item.value}
												style={{
													backgroundColor:
														attr.name === "Color" ? item.value : "white",
													margin: "2%",
												}}
											>
												{item.displayValue}
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default AdjustButtons;
