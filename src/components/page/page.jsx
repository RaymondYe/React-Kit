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
    let commonProps = null;

    this.props.data.cmps.map((cmp, i)=>{
      
      commonProps = {
        setStyle: this.props.setStyle,
        cid: i,
        style: cmp.style
      };

      if (cmp.cmpType == 'image') {
        components.push(<ImageComponent url={cmp.file.key} {...commonProps} />);
      } else {
        components.push(<FontComponent {...commonProps}>{cmp.text}</FontComponent>);
      }
    });

    if(this.props.showTitle){
      title = (<h1>{this.props.name}</h1>);
    }

    if (this.state.opt) {
      opt = <OptComponent
        optDom={this.state.optDom}
        type={this.state.optType} />;
    }

    return (<div className="page" style={{backgroundColor: this.props.bgcol}}>
      {components}
      {opt}
    </div>
    );

  },
  getInitialState: function(){
    return {
      opt: false
    }
  }
});

export default Page;
