import { NavLink } from "react-router-dom";
import './index.less'

function TabBar() {
	return (
		<nav styleName="tabbar">
			<ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				<li>
					<NavLink exact to="/about">About</NavLink>
				</li>
				<li>
					<NavLink exact to="/profile">Profile</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default TabBar;
