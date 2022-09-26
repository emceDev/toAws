import { hoc } from "./hoc";
import { Component } from "react";
class Son extends Component {
	constructor(props) {
		super(props);
	}
	state = {};

	render() {
		// //console.log("AT SON, ", this.props.place);
		//console.log("AT SON, ", this.props.fromHoc);
		return (
			<div
				onClick={() => {
					//console.log(this.props.place, "    ", this.props.fromHoc);
				}}
			>
				<h1>place:</h1>
				{this.props.fromHoc}
			</div>
		);
	}
}

export default hoc(Son);
