import React from "react";
import "./PriceButton.css";
import { Link } from "react-router-dom";

function PriceButton(props) {
	return (
		<>
			<Link to="/register">
				<button
					id="checkout"
					style={props.style}
					className="price-button"
					onClick={props.fx}
				>
					{props.title}
				</button>
			</Link>
		</>
	);
}

export default PriceButton;
