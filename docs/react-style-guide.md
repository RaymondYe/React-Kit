## React Style Guide

### Folder Structure

- Place each component in a separate folder
- Avoid having shared resources between components (css, images etc.)
- Keep all components' folders in the same parent folder (avoid nesting)

File structure per component example:

```js
/src/components/nav/package.json
/src/components/nav/nav.js
/src/components/nav/nav.css
/src/components/nav/icon.svg
```

### React Components

React component example

`组件结构`

```js
class definition
	constructor
		event handlers
	'component' lifecycle events
	getters
	render
defaultProps
proptypes
```


```js
import React from 'react';
import './person.css';

class Person extends React.Component {
  constructor (props) {
    super(props);

    this.state = { smiling: false };

    this.handleClick = () => {
      this.setState({smiling: !this.state.smiling});
    };
  }

  componentWillMount () {
    // add event listeners (Flux Store, WebSocket, document, etc.)
  }

  componentDidMount () {
    // React.getDOMNode()
  }

  componentWillUnmount () {
    // remove event listeners (Flux Store, WebSocket, document, etc.)
  }

  get smilingMessage () {
    return (this.state.smiling) ? "is smiling" : "";
  }

  render () {
    return (
      <div onClick={this.handleClick}>
        {this.props.name} {this.smilingMessage}
      </div>
    );
  }
}

Person.defaultProps = {
  name: 'Guest'
};

Person.propTypes = {
  name: React.PropTypes.string
};

export default Person;

```

> Put custom methods and properties between React API methods and the `render()` method at the bottom.

### Stateless Functions

```js
// Module Export
export default () => (
	<div className="waiting-ajax-loading">
		<div className="border-loading"></div>
		<div className="logo"></div>
	</div>
);

// Function
const Loading = () => (
	<div className="waiting-ajax-loading">
		<div className="border-loading"></div>
		<div className="logo"></div>
	</div>
);
const Effect = ({src, desc})=> {
	return (
		<div className="effect">
			<img src={src} />
			<p className="desc">{desc}</p>
		</div>
	)
};
export default (props) => (
	<div className="text">
		{props.children}
	</div>
)
```

#### Dynamic Children

```js
class MyComponent extends React.Component {
	render() {

		const listNodes = this.props.results.map((item, index) =>{
			return <li key={index}>{item}</li>;
		});

		return (<ul>
			{listNodes}
		</ul>)
	}
}

```

### Fetch Data

```js
class CommentBox extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data: []
		};
	}

	loadCommentsFromServer = ()=> {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

	componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

	render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
}

<CommentBox url="/api/comments" pollInterval={2000} />
```

###  参考链接

- Use [Babel](https://babeljs.io/docs/learn-es6/)
- Use [ES6 classes](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/)
- Use [React-ES5 ES6写法对照表](http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8)
- [PropTypes](https://facebook.github.io/react/docs/reusable-components-zh-CN.html)
- [Redux](http://redux.js.org/)
https://facebook.github.io/react/docs/component-api-zh-CN.html#forceupdate
http://cn.redux.js.org/docs/Glossary.html
- [react-patterns](https://github.com/planningcenter/react-patterns#component-organization)
- [Airbnb React](https://github.com/JasonBoy/javascript/tree/master/react)
