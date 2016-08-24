import React from 'react';
import YomiArea from './YomiArea';
import ToriArea from './ToriArea';

/*
  <Main
    fudaId={17}
    toriFudaCount={10}
  />
*/

const Main = ({fudaId, toriFudaCount, onFudaSelect}) => {
  if(!fudaId) {
    return <div>Loading</div>;
  }
  return (
    <main>
      <YomiArea
        fudaId={fudaId}
      />
      <ToriArea
        fudaIndex={fudaId - 1}
        toriFudaCount={toriFudaCount}
        onFudaSelect={onFudaSelect}
      />
    </main>
  );

};

export default Main;

// export default class Main extends React.Component {
//   render() {
//     return (
//       <main>
//         <YomiArea
//           fudaId={this.props.fudaId}
//         />
//         <ToriArea
//           fudaIndex={this.props.fudaId - 1}
//           toriFudaCount={this.props.toriFudaCount}
//         />
//       </main>
//     );
//   }
// }
