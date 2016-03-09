## React Style Guide

### Folder Structure

- Place each component in a separate folder
- Avoid having shared resources between components (css, images etc.)
- Keep all components' folders in the same parent folder (avoid nesting)

##### File structure per component example:

```
/src/components/nav/package.json
/src/components/nav/nav.js
/src/components/nav/nav.css
/src/components/nav/icon.svg
```

### CSS Class Names

```css
.ComponentName { }
.ComponentName--modifier { }
.ComponentName-elementName { }
.ComponentName-elementName--modifier { }
```

##### CSS styling example

```html
<nav className="nav">
  <ul className="nav-items">
    <li className="nav-item nav-item--selected">
      <a className="nav-link" href="/products">Products</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/services">Services</a>
    </li>
  </ul>
</nav>
```

```less
// CSS
@import '../variables.css';

.nav {
  &-items {
    margin: 0;
    padding: 0;
    list-style-type: none;
    text-align: center;
  }

  &-item {
    display: inline-block;
    vertical-align: top;
  }

  &-link {
    display: block;
    padding: 0 25px;
    outline: 0;
    border: 0;
    color: @default-color;
    text-decoration: none;
    line-height: 25px;
    transition: background-color .3s ease;

    &,
    .Navigation-items:hover & {
      background: var(--default-bg-color);
    }

    &--selected,
    .Navigation-items:hover &:hover {
      background: var(--active-bg-color);
    }
  }
}
```

### React Components

- Use [Babel](https://babeljs.io/docs/learn-es6/)
- Use [ES6 classes](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/
##### React component example:

```js
import React, { PropTypes, Component } from 'react';
import './SampleComponent.css';

export default class SampleComponent extends Component {
  static propTypes = { ... };

  static defaultProps = { ... };

  // getInitialState
  state = { ... };

  constructor() {
    super();
    // componentWillMount handler
  }

  componentDidMount() {
    // ...
  }

  componentWillUnmount() {
    // ...
  }

  shouldComponentUpdate() {
    // ...
  }

  someMethods() {
    // ...
  }

  extraMethosd = (e) => {
    // ...
  }

  render() {
    return (
      <div className="SampleComponent">
      </div>
    );
  }

};
```

> Put custom methods and properties between React API methods and the `render()` method at the bottom.

#### Dynamic Children
```js
var ListItemWrapper = React.createClass({
  render: function() {
    return <li>{this.props.data.text}</li>;
  }
});

var MyComponent = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.results.map(function(result) {
           return <ListItemWrapper key={result.id} data={result}/>;
        })}
      </ul>
    );
  }
});
```
