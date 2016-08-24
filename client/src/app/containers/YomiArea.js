import React from 'react';
import fudaList from '../../data/fuda.json';

/*
 <YomiArea
  fudaId={5}
 />
*/

export default class YomiArea extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      yomiFuda: ""
    }
  }

  componentDidMount() {
    this.getYomiFuda();
  }

  getYomiFuda() {
    fudaList.fuda.map(fuda => {
      if (fuda.id === this.props.fudaId) {
        this.setState({yomiFuda: fuda.yomi});
      }
    });
  }

  render() {
    return (
      <div id="yomi-area">
        <p>{this.state.yomiFuda}</p>
      </div>
    );
  }
}