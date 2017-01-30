import React from 'react';

/*
 <Fuda
   fudaNumber="17"
   fudaRight="からくれな"
   fudaMiddle="ゐにみづく"
   fudaLeft="くるとは"
   kimari="ちは"
   onFudaSelect={()=>console.log("fuda selected")}
 />
*/

export default class Fuda extends React.Component {
  getStyleLeft() {
    if (this.props.fudaKimari.length === 1) {
      return '25%';
    } else if (this.props.fudaKimari.length > 4) {
      return '65%';
    } else {
      return '50%';
    }
  }
  render() {
    return (
      <div className="fuda" id={this.props.fudaNumber} onClick={this.props.onFudaSelect}>
        <div className="fuda-tori">
          <span className="fuda-right">{this.props.fudaRight}</span>
          <span className="fuda-middle">{this.props.fudaMiddle}</span>
          <span className="fuda-left">{this.props.fudaLeft}</span>
        </div>
        <span style={{
          fontSize: this.props.fudaKimari.length <= 4 ?
            (4 / this.props.fudaKimari.length) + 'em' :
            '1.3em',
          left: this.getStyleLeft()
        }} className="fuda-kimari">
          {this.props.fudaKimari.length > 4 ?
            this.props.fudaKimari.slice(0, 3) :
            this.props.fudaKimari}
        </span>
        <span className="fuda-kimari-l">
          {this.props.fudaKimari.length > 4 ?
            this.props.fudaKimari.slice(3) :
            ""}
        </span>
        <span className="fuda-number">{this.props.fudaNumber}</span>
      </div>
    );
  }
}