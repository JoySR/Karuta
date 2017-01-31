import React from 'react';
import Main from './Main';
import Aside from './sidebar/Aside';

import Utils from '../../common/utils';

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
      exercisedCount: -1, // 经历了几轮练习
      currentExerciseFudaIndex: 0,
      totalToriFudaCount: 10,
      exerciseFudaIndexList: [],
      score: 0,
      exercisedFudaList: [],
      correctFudaList: [],
      wrongFudaList: [],
      highestScore: 0,
    };

    this.generateExerciseFudaList = this.generateExerciseFudaList.bind(this);
  }

  componentWillMount() {
    this.generateExerciseFudaList();
  }

  generateExerciseFudaList() {
    this.setState({
      exercisedCount: this.state.exercisedCount + 1,
    });
    const exerciseFudaIndexList =  Utils.randomArray(100, this.state.totalExerciseFudaCount);
    this.setState({
      exerciseFudaIndexList,
      currentExerciseFudaId: exerciseFudaIndexList[0] + 1
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
    const exercisedFudaList = this.state.exerciseFudaIndexList;
    exercisedFudaList.push(this.state.currentExerciseFudaId);
    this.setState({exercisedFudaList});
  }

  setCorrectFudaList() {
    const correctFudaList = this.state.correctFudaList;
    correctFudaList.push(this.state.currentExerciseFudaId);
    this.setState({correctFudaList});
  }

  checkIfExerciseEnd() {
    if (this.state.totalExerciseFudaCount === this.state.exercisedFudaCount + 1) {
      this.setState({
        exercisedFudaCount: 0,
        currentExerciseFudaIndex: 0,
        score: 0,
        exercisedFudaList: []
      });
      this.generateExerciseFudaList();
    } else {
      this.setState({
        currentExerciseFudaId: this.state.exerciseFudaIndexList[this.state.currentExerciseFudaIndex + 1] + 1,
        currentExerciseFudaIndex: this.state.currentExerciseFudaIndex + 1
      });
    }
  }

  onFudaCorrect() {
    let score = this.state.score + 10;
    this.setState({score: score});
    if (score > this.state.highestScore) {
      this.setState({highestScore: score});
    }
    this.setExercisedFudaList();
    this.setCorrectFudaList();
    this.checkIfExerciseEnd();
  }

  onFudaWrong() {
    this.checkIfExerciseEnd();
  }
  
  onFudaSelect(event) {
    this.setState({exercisedFudaCount: this.state.exercisedFudaCount + 1});
    const selectedFudaId = this.getSelectedFudaId(event.target);
    if (parseInt(selectedFudaId) === this.state.currentExerciseFudaId) {
      this.onFudaCorrect();
    } else {
      this.onFudaWrong();
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <Aside
          score={this.state.score}
          highestScore={this.state.highestScore}
          exercisedCount={this.state.exercisedCount}
        />
        <Main
          fudaId={this.state.currentExerciseFudaId}
          toriFudaCount={this.state.totalToriFudaCount}
          onFudaSelect={(event)=>this.onFudaSelect(event)}
        />
      </div>
    );
  }
}
