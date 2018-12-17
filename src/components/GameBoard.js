import React from 'react';
import Square from './Square';

class GameBoard extends React.Component {

  renderSquares() {
    let lifeMap = this.props.lifeMap;
    return lifeMap.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        return <Square
          id={{row: rowIndex, col: colIndex}}
          val={col}
          toggleLifeMapValue={this.props.toggleLifeMapValue}/>
      });
    });
  };

  render() {
    return (
      <div className="squaresArea">
        {this.renderSquares()}
      </div>
    );
  }
};

export default GameBoard;