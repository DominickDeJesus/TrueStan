import React, { useState } from "react";
import GameOverPage from "./components/GameOverPage";
import PlayPage from "./components/PlayPage";
import LandingPage from "./components/LandingPage";
import WinningPage from "./components/WinningPage";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import "./App.css";
import axios from "axios";
const App = () => {
	const [search, setSearch] = useState("");
	const [artistObj, setArtistObj] = useState({});
	const [currentTrack, setCurrentTrack] = useState({});
	const [pickedSongs, setPickedSongs] = useState([]);

	function randomizeArray(arr) {
		return [...arr].sort((a, b) => {
			return 0.5 - Math.random();
		});
	}

	async function getArtist(search) {
		try {
			const { data } = await axios.get(`/api/trackNames?search=${search}`);
			const mixedArr = randomizeArray(data.results);
			setArtistObj({ ...data, results: mixedArr });
			setPickedSongs([mixedArr[0].trackName]);
			setCurrentTrack(mixedArr[0]);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Router>
			<NavMenu />
			<Container style={{ margin: 0 }}>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => {
							return (
								<LandingPage
									{...props}
									search={search}
									setSearch={setSearch}
									getArtist={getArtist}
									setArtistObj={setArtistObj}
								/>
							);
						}}
					/>
					<Route exact path="/gameover/:answer" component={GameOverPage} />
					<Route exact path="/win" component={WinningPage} />
					<Route
						exact
						path="/play"
						render={(props) => {
							return (
								<PlayPage
									{...props}
									artistObj={artistObj}
									currentTrack={currentTrack}
									setCurrentTrack={setCurrentTrack}
									pickedSongs={pickedSongs}
									setPickedSongs={setPickedSongs}
								/>
							);
						}}
					/>
				</Switch>
			</Container>
		</Router>
	);
};

export default App;
