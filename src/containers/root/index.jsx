import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import Tabbar from "components/tabbar";
import "styles/common.less";
import "./index.less";

const Home = loadable(() => import("components/home"));
const About = loadable(() => import("components/about"));
const Profile = loadable(() => import("components/profile"));

function Root() {
	return (
		<Router>
			<div className="root">
				<Switch>
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="/about">
						<About />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
				</Switch>
				<Tabbar />
			</div>
		</Router>
	);
}

export default Root;
