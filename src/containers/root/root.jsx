import React, {
	PropTypes,
	Component
} from 'react';

import Header from 'components/header';
import 'styles/common.less';
import './root.less';

class Root extends Component {
	render() {
		return (
			<div className="root">
				<Header title="React-Kit" />
				333111112222666888
			</div>
		);
	}
}

export default Root;