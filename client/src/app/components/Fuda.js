import React from 'react';
import './Fuda.scss';

/*
 <Fuda
   fudaNumber="17"
   fudaRight="からくれな"
   fudaMiddle="ゐにみづく"
   fudaLeft="くるとは"
   onFudaSelect={()=>console.log("fuda selected")}
 />
*/

export default class Fuda extends React.Component {
  render() {
    return (
      <div
        className="fuda-area"
        id={'fuda-area-' + this.props.fudaNumber}
        onClick={this.props.onFudaSelect.bind(null, this.props.fudaNumber)}
      >
        <div
          className="fuda fuda-tori"
          id={'fuda-' + this.props.fudaNumber}
        >
          <span className="fuda-right">{this.props.fudaRight}</span>
          <span className="fuda-middle">{this.props.fudaMiddle}</span>
          <span className="fuda-left">{this.props.fudaLeft}</span>
        </div>
        <span className="fuda-number">{this.props.fudaNumber}</span>
      </div>
    );
  }
}
