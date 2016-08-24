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
  render() {
    return (
      <aside style={styles.aside}>
        <Header />
        <Nav />
        <p>Hallo Welt!</p>
        <Footer />
      </aside>
    );
  }
}
