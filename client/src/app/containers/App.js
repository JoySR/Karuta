import React from 'react';
import Main from './Main';
import Aside from './sidebar/Aside';

import Utils from '../../Utils';

const styles = {
  aside: {
    background: "#e3e3e3",
    width: "15%",
  }
};

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      totalExerciseFudaCount: 10,
      exercisedFudaCount: 0,
      totalToriFudaCount: 10,
      exerciseFudaList: [],
      score: 0,
      exercisedFudaList: [],
      correctFudaList: [],
      wrongFudaList: [],
      highestScore: 0,
    };
  }

  componentDidMount() {
    this.generateExerciseFudaList.call(this);
  }

  generateExerciseFudaList() {
    console.log(this);
    const exerciseFudaList =  Utils.randomArray(100, this.state.totalExerciseFudaCount);
    this.setState({
      exerciseFudaList,
      currentExerciseFudaId: exerciseFudaList[0] + 1
    });
  }

  getSelectedFudaId(node) {
    let selectedFudaId;
    if (node.tagName === "SPAN" && node.className !== "fuda-number") {
      selectedFudaId = node.parentNode.parentNode.id;
    } else if (node.className === "fuda") {
      selectedFudaId = node.id;
    } else {
      selectedFudaId = node.parentNode.id;
    }
    return selectedFudaId;
  }

  setExercisedFudaList() {
    const exercisedFudaList = this.state.exerciseFudaList;
    exercisedFudaList.push(this.state.currentExerciseFudaId);
    this.setState({exercisedFudaList});
  }

  setCorrectFudaList() {
    const correctFudaList = this.state.correctFudaList;
    correctFudaList.push(this.state.currentExerciseFudaId);
    this.setState({correctFudaList});
  }

  checkIfExerciseEnd() {

  }

  onFudaCorrect() {
    this.setState({score: this.state.score + 10});
    if (this.state.score > this.state.highestScore) {
      this.setState({highestScore: this.state.score});
    }
    this.setExercisedFudaList();
    this.setCorrectFudaList();
    this.checkIfExerciseEnd();
  }
  
  onFudaSelect(event) {
    this.setState({exercisedFudaCount: this.state.exercisedFudaCount + 1});
    const selectedFudaId = this.getSelectedFudaId(event.target);
    if (parseInt(selectedFudaId) === this.state.currentExerciseFudaId) {
      this.onFudaCorrect();
    } else {
      this.checkIfExerciseEnd();
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <Aside />
        <Main
          fudaId={this.state.currentExerciseFudaId}
          toriFudaCount={this.state.totalToriFudaCount}
          onFudaSelect={(event)=>this.onFudaSelect(event)}
        />
      </div>
    );
  }
}