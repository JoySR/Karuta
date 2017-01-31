import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const styles = {
  aside: {
    background: "#e3e3e3",
    width: "15%",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0
  }
};

export default class Aside extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      highestScore: 0,
      exercisedCount: 0,
    }
  }

  componentDidMount() {
    this.setState({
      score: this.props.score,
      highestScore: this.props.highestScore,
      exercisedCount: this.props.exercisedCount,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      score: nextProps.score,
      highestScore: nextProps.highestScore,
      exercisedCount: nextProps.exercisedCount
    });
  }

  render() {
    return (
      <aside style={styles.aside}>
        <Header />
        {/*<Nav />*/}
        <p style={{marginTop: 30}}>分数：{this.state.score}</p>
        <p style={{marginTop: 30}}>最高分数：{this.state.highestScore}</p>
        <p style={{marginTop: 30}}>进行了 {this.state.exercisedCount} 轮练习</p>
        {/*<Footer />*/}
      </aside>
    );
  }
}
