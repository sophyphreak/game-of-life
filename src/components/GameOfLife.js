import React from 'react';
import GameBoard from './GameBoard';
import ButtonArea from './ButtonArea';

class GameOfLife extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lifeMap: [],
      start: true,
      timer: null,
      generation: 0
    }
    this.toggleLifeMapValue = this.toggleLifeMapValue.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
  };

  toggleLifeMapValue(row, val) {
    console.log(row, val);
    const { lifeMap } = this.state;
    lifeMap[row][val] = !lifeMap[row][val];
    this.setState({ lifeMap });
  }

  componentWillMount() {
    if (this.state.lifeMap.length === 0) {
      let lifeMap = this.state.lifeMap;
      for (let i = 0; i < 30; i++) {
        let arr = [];
        for (let j = 0; j < 50; j++) {
          const randBool = Math.random() * 2 < 1;
          arr.push(randBool);
        }
        lifeMap.push(arr);
      };
      this.setState({ lifeMap });
    }
  }

  componentDidMount() {
    let timer = setInterval(() => {
      if (this.state.start) {
        this.tick();
      };
    }, 100);
    this.setState({ timer });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  };

  tick() {
    let generation = this.state.generation;
    generation++;

    let lifeMap = this.state.lifeMap;
    let oldLifeMap = lifeMap.map(a => a.slice());
    for (let row = 0; row < lifeMap.length; row++) {
      for (let val = 0; val < lifeMap[row].length; val++) {
        let bool = lifeMap[row][val];
        let newBool = this.determineLife(oldLifeMap, row, val, bool);
        lifeMap[row][val] = newBool;
        // if (row === 0 && val === 0) console.log("at (0,0)", oldLifeMap[0][0]);
      }
    }
    this.setState({ generation, lifeMap });
  }

  determineLife(lifeMap, row, val, bool){
    let surroundSum = 0;
    let output = bool;

    for (let rowAdd = -1; rowAdd <= 1; rowAdd++) {
      for (let valAdd = -1; valAdd <= 1; valAdd++) {
        if (!(rowAdd === 0 && valAdd === 0)) {
          if (this.check(lifeMap, row, val, rowAdd, valAdd)) {
            surroundSum++;
          }
        }
      }
    }


    if (surroundSum === 3) output = true;
    if (surroundSum < 2 || 3 < surroundSum) output = false;

    return output;
  }

  check(lifeMap, row, val, rowAdd, valAdd) {
    let checkRow = this.checkValidRow(row + rowAdd);
    let checkVal = this.checkValidVal(val + valAdd);
    // if (row === 0 && val === 0) console.log(checkRow, checkVal, rowAdd, valAdd, lifeMap[checkRow][checkVal]);
    return lifeMap[checkRow][checkVal];
  }

  checkValidRow(row){
    let newRow = row;
    if (row < 0) newRow = 29;
    if (row > 29) newRow = 0;
    return newRow;
  }

  checkValidVal(val) {
    let newVal = val;
    if (val < 0) newVal = 49;
    if (val > 49) newVal = 0;
    return newVal;
  }

  toggleStart() {
    let start = this.state.start;
    start = !start;
    this.setState({ start });
  }

  render() {
    return(
      <div className="flex">
        <GameBoard
          lifeMap={this.state.lifeMap}
          toggleLifeMapValue={this.toggleLifeMapValue}/>
        <ButtonArea
          start={this.state.start}
          toggleStart={this.toggleStart}
          generation={this.state.generation}/>
      </div>
    );
  }
};

export default GameOfLife;