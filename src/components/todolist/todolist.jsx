import React, {PropTypes, Component} from 'react';
import './todolist.less';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


export default class TodoList extends Component {
  state =  {items: ['hello', 'world', 'click', 'me']};

  handleAdd = () => {
    var newItems =
      this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  };

  handleRemove = (i) => {
    var newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  };

  render() {
    var items = this.state.items.map(function(item, i) {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }.bind(this));

    return (
      <div className="todolist">
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={5000} transitionLeaveTimeout={3000}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}
