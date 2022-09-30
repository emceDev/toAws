import { Component } from "react";
import { Link } from "react-router-dom";
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
							<Link to={`/`} key={cat.name}>
								<div
									num={cat.name}
									className={
										this.props.selected === cat.name ? "active" : "categoryBtn"
									}
								>
									{cat.name}
								</div>
							</Link>
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
