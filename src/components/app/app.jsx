import React, { PropTypes, Component } from 'react';
import PageComponent from '../page';
import NavComponent from '../nav';
import DropdownComponent from '../dropdown';
import './app.less';

export default class App extends Component {
  state = {
    pageIndex: 0,
    status: 0
  }

  setStyle = (val, index) => {
    for (var prop in val) {
      if (val.hasOwnProperty(prop)) {
        this.state.pageData.pages[this.state.pageIndex].cmps[index].style[prop] = val[prop];
      }
    }
    this.setState({
      pageData: this.state.pageData
    });
  }

  prevPage = (e) => {
    let nextIndex = this.state.pageIndex;
    if (nextIndex > 0){
      nextIndex--;
    }
    this.setState({
      pageIndex: nextIndex
    });
  }

  nextPage = (e) => {
    let nextIndex = this.state.pageIndex;
    if (nextIndex < this.state.maxPageIndex){
      nextIndex++;
    }
    this.setState({
      pageIndex: nextIndex
    });
  }

  loadPageData(){
    let data = require('../../lib/js/data');
    this.setState({
      maxPageIndex: data.data.pages.length - 1,
      status: 1,
      name: data.data.name,
      pageData: data.data
    });
  }

  componentDidMount(){
    if(this.state.status == 0){
      this.loadPageData();
    }
  }

  render(){
    let PAGECOMPONENT = '';

    if(this.state.status){
      let item = this.state.pageData.pages[this.state.pageIndex];
      $('#app').css('background', item.bgcol);
      PAGECOMPONENT = <PageComponent
      bgcol = {item.bgcol}
      data = {item}
      name = {this.state.name}
      setStyle = {this.setStyle}
      showTitle = {false}/>
    }

    return (<div className='App-box' ref='APP' {...this.props}>
      {PAGECOMPONENT}
      <NavComponent nextPage={this.nextPage} prevPage={this.prevPage}/>
    </div>
    );
  }

}
