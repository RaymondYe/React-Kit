import React, { PropTypes, Component } from 'react';
import ImageComponent from '../image';
import FontComponent from '../font';
import OptComponent from '../opt';
import utils from '../../utils/utils'
import './page.less';

export default class Page extends Component {
  static propTypes = {
    name: PropTypes.string,
    bgcol: PropTypes.string,
    data: PropTypes.object.isRequired,
    showTitle: PropTypes.bool
  };

  state = {
    opt: false
  };

  render() {
    let title = '';
    let opt = '';
    let commonProps = null;
    utils.page = this;

    if (this.props.showTitle){
      title = <h1>{this.props.name}</h1>;
    }

    if (this.state.opt){
      opt = <OptComponent optDom={this.state.optDom} type={this.state.optType} />;
    }

    return (<div className="page" style={{backgroundColor: this.props.bgcol}}>
      {
        this.props.data.cmps.map((cmp, i)=>{
          commonProps = {
            setStyle: this.props.setStyle,
            cid: i,
            style: cmp.style
          };

          if (cmp.cmpType == 'image') {
            return <ImageComponent key={i} url={cmp.file.key} {...commonProps} />;
          } else {
            return <FontComponent key={i} {...commonProps}>{cmp.text}</FontComponent>;
          }
        })


      }
      {opt}
      {title}
    </div>);

  }

};
