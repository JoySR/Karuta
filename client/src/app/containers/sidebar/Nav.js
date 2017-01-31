import React from 'react';

export default class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><a href="game.html">游戏</a></li>
          <li><a href="#">练习</a></li>
          <li><a href="tips.html">技巧</a></li>
          <li><a href="about.html">关于</a></li>
        </ul>
      </nav>
    );
  }
}