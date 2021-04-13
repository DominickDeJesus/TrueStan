import React from "react";
import { Form } from "react-bootstrap";
import "../styles/toggle.scss";
function Toggle({ autoplay, setAutoplay }) {
	return (
		<div className="toggle">
			<span className="slide">
				<h3>AutoPlay</h3>
			</span>
			<label className="switch">
				<input
					type="checkbox"
					checked={autoplay}
					onClick={() => {
						console.log(autoplay);
						setAutoplay(!autoplay);
					}}
				/>
				<span className="slider round"></span>
			</label>
		</div>
	);
}

export default Toggle;
