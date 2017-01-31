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
      yomiFuda: "",
      yomiFudaCN: "",
      showYomiFudaCN: false,
    };
  }

  componentDidMount() {
    this.getYomiFuda(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getYomiFuda(newProps);
  }

  getYomiFuda(props) {
    fudaList.fuda.map(fuda => {
      if (fuda.id === props.fudaId) {
        this.setState({
          yomiFuda: fuda.yomi,
          yomiFudaCN: fuda.yomiCN,
        });
      }
    });
  }

  showTheOtherYomi() {
    this.setState({
      showYomiFudaCN: !this.state.showYomiFudaCN,
    });
  }

  render() {
    return (
      <div id="yomi-area">
        <p style={{cursor: 'pointer'}} onClick={this.showTheOtherYomi.bind(this)}>
          {
            this.state.showYomiFudaCN ?
              this.state.yomiFudaCN :
              this.state.yomiFuda
          }
        </p>
      </div>
    );
  }
}