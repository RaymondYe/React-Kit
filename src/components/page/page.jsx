import React, { PropTypes } from 'react';
import ImageComponent from '../image';
import FontComponent from '../font';
import OptComponent from '../opt';
import utils from '../../utils/utils'
import styles from './page.less';

const Page = React.createClass({
  displayName: 'Page',
  propsTypes: {
    name: PropTypes.string,
    bgcol: PropTypes.string,
    cpms: PropTypes.node.isRequired,
    showTitle: PropTypes.boolean
  },
  render: function(){
    utils.page = this;

    let components = [];
    let title = '';
    let opt = '';

    this.state.cmps.map(cmp=>{
      if (cmp.cmpType == 'image') {
        components.push(<ImageComponent url={cmp.file.key} style={cmp.style} />);
      } else {
        components.push(<FontComponent style={cmp.style}>{cmp.text}</FontComponent>);
      }
    });

    if(this.props.showTitle){
      title = (<h1>{this.props.name}</h1>);
    }

    if (this.state.opt) {
      opt = <OptComponent
        optDom={this.state.optDom}
        type={this.state.optType}/>;
    }

    return (<div className="page" style={{backgroundColor:this.props.bgcol}}>
      {components}
      {opt}
    </div>
    );

  },
  getInitialState: function(){
    return {
      cmps: this.props.data.cmps,
      opt: false
    }
  }
});

export default Page;
