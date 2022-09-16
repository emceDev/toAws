import { Component } from "react";
import { getCategories } from "../HOC/getCategories";
class Categories extends Component {
	render() {
		return (
			<div
				className="Categories"
				onClick={(e) =>
					e.target.attributes.num !== undefined
						? this.props.select(e.target.attributes.num.value)
						: null
				}
			>
				{this.props.categories !== undefined ? (
					this.props.categories.categories.map((cat, index) => {
						return (
							<div num={cat.name} key={cat.name}>
								{cat.name}
							</div>
						);
					})
				) : (
					<p>loading</p>
				)}
			</div>
		);
	}
}

export default getCategories(Categories);
