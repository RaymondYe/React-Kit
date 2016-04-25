import React, { PropTypes, Component } from 'react';
import PageComponent from '../page';
import NavComponent from '../nav';
import DropdownComponent from '../dropdown';
import './app.less';
import TodolistComponent from '../todolist';

export default class App extends Component {
  state = {
    pageIndex: 0,
    status: 0
  };

  setStyle = (val, index) => {
    for (var prop in val) {
      if (val.hasOwnProperty(prop)) {
        this.state.pageData.pages[this.state.pageIndex].cmps[index].style[prop] = val[prop];
      }
    }
    this.setState({
      pageData: this.state.pageData
    });
  };

  prevPage = (e) => {
    let nextIndex = this.state.pageIndex;
    if (nextIndex > 0){
      nextIndex--;
    }
    this.setState({
      pageIndex: nextIndex
    });
  };

  nextPage = (e) => {
    let nextIndex = this.state.pageIndex;
    if (nextIndex < this.state.maxPageIndex){
      nextIndex++;
    }
    this.setState({
      pageIndex: nextIndex
    });
  };

  firstUpperCase = (str) => {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
  };

  adapter = (data) => {
    let result = null;
    let cmps = null;
    let cmp = null;
    let style = null;
    let arr = ['font-size', 'line-height', 'font-family', 'border-width', 'font-weight', 'text-align', 'border-radius', 'border-style', 'border-color'];
    let arrItem = null;

    if(!data || !data.data){
      return result;
    }

    result = data.data;

    for (var i = 0; i < result.pages.length; i++) {
      cmps = result.pages[i].cmps;
      for (var j = 0; j < cmps.length; j++) {
        cmp = cmps[j];
        style = {};

        for (var key in cmp.style) {
          if (cmp.style.hasOwnProperty(key)) {
            if(!cmp.style[key] && cmp.style[key] !== 0){
              continue;
            }
            if(arr.indexOf(key) >= 0){
              let item = '';
              arrItem = key.split('-');
              item = arrItem[0]+this.firstUpperCase(arrItem[1]);
              if(item === 'lineHeight'){
                style[item] = cmp.style[key] + 'px';
              }else{
                style[item] = cmp.style[key];
              }
            }else{
              style[key] = cmp.style[key];
            }
          }
        }
        cmp.style = style;
      }
    }
    return result;
  };

  loadPageData(){

    let data = this.adapter(require('../../public/data/data'));
    
    this.setState({
      maxPageIndex: data.pages.length - 1,
      status: 1,
      name: data.name,
      pageData: data
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
    </div>);
  }

}
