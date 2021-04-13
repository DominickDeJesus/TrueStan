import React from "react";
import { Link } from "react-router-dom";

const GameOverPage = ({ match }) => {
	return (
		<div className="gameOverContainer">
			<h1 className="animate__animated animate__bounceInDown">
				Game Over Man!
			</h1>
			<h2 style={{ padding: "1rem" }}>
				The answer was "{match.params.answer}"
			</h2>
			<h2>
				<a className="Buttons" href="/">
					New Artist
				</a>
				<span role="img" aria-label="lightning">
					⚡
				</span>
				<Link to="/play">Try Again</Link>
			</h2>
		</div>
	);
};
export default GameOverPage;
