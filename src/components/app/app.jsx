import React, { PropTypes } from 'react';
import PageComponent from '../page';
import NavComponent from '../nav';
import styles from './app.less';

const App = React.createClass({
  displayName: 'App',
  mixins: [],
  render: function(){
    let PAGECOMPONENT = '';
    if(this.state.status){
      let item = this.state.pageData.pages[this.state.pageIndex]
      $('#app').css('background', item.bgcol);
      PAGECOMPONENT = <PageComponent
      bgcol = {item.bgcol}
      data = {item}
      name = {this.state.name}
      showTitle = {false}/>
    }
    return (<div className='App-box' ref='APP'>
      {PAGECOMPONENT}
      <NavComponent />
    </div>
    );
  },
  loadPageData: function(){
    let data = require('../../lib/js/data');
    this.setState({
      maxPageIndex: data.data.pages.length,
      status: 1,
      name: data.data.name,
      pageData: data.data
    });
  },
  componentDidMount: function(){
    if(this.state.status == 0){
      this.loadPageData()
    }
  },
  getInitialState: function(){
    return {
      pageIndex: 0,
      status: 0
    };
  }
});

export default App;
