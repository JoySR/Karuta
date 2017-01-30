import React from 'react';
import Fuda from '../components/Fuda';

/*
 <FudaSet
  fudaList={["array", "of", "Fuda"]}
 />
*/

export default class FudaSet extends React.Component {
  generateFudaSet() {
    const FudaList = [];
    this.props.fudaList.map(fuda => {
      FudaList.push(
        <Fuda
          key={fuda.fudaId}
          fudaNumber={fuda.fudaId}
          fudaRight={fuda.fudaContent[0]}
          fudaMiddle={fuda.fudaContent[1]}
          fudaLeft={fuda.fudaContent[2]}
          fudaKimari={fuda.fudaKimari}
          onFudaSelect={this.props.onFudaSelect}
        />);
    });
    return FudaList;
  }

  render() {
    return (
      <div id="fuda-area">
        {this.generateFudaSet.call(this)}
      </div>
    );
  }
}