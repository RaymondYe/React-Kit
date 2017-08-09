import React from 'react';

import Header from 'components/header';
import 'styles/common.less';
import './root.less';

class Root extends React.Component {
	render() {
		return (
			<div className="root">
				<Header title="React-Kit" />
			</div>
		);
	}
}

export default Root;
