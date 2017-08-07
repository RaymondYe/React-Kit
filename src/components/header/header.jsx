import React, {
	PropTypes,
	Component
} from 'react';

import './header.less';

const Header = ({
	title
}) => (
	<div className="header">
		<h3>{title}</h3>
	</div>
);

export default Header;
