import React from 'react';
import FudaSet from '../components/FudaSet';
import fudaList from '../../data/fuda.json';
import Utils from '../../common/utils';

/*
 <ToriArea
  fudaIndex={16}
  toriFudaCount={10}
 />
*/

export default class ToriArea extends React.Component {
  getToriFudaList() {
    const toriFudaIndexList =  Utils.generateToriFudaSet(this.props.fudaIndex, this.props.toriFudaCount);
    const toriFudaList = [];
    toriFudaIndexList.map(fudaIndex => {
      const fuda = fudaList.fuda[fudaIndex];
      const toriText = fuda.tori;

      toriFudaList.push({
        fudaId: fuda.id,
        fudaKimari: fuda.kimari,
        fudaContent: [
          toriText.substr(0, 5),
          toriText.substring(5, toriText.indexOf(" ")) + toriText.substring(toriText.indexOf(" ") + 1, 11),
          toriText.slice(11)
        ]
      });
    });

    return toriFudaList;
  }

  render() {
    return (
      <div id="tori-area">
        <FudaSet
          fudaList={this.getToriFudaList.call(this)}
          onFudaSelect={this.props.onFudaSelect}
        />
      </div>
    );
  }
}