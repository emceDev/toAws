import { hoc } from "./hoc";
import Son from "./son";
import { Component } from "react";

class Sis extends Component {
	constructor(props) {
		super(props);
	}
	state = {};
	render() {
		return (
			<div>
				SIS:
				<Son place="SIS" />
			</div>
		);
	}
}

export default Sis;
