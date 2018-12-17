import React from 'react';

class Square extends React.Component {

  toggleAlive() {
    this.props.toggleLifeMapValue(this.props.id.row, this.props.id.col)
  }

  render() {
    let bg;
    if(this.props.val) {
      bg = "#E8E2DE";
    } else {
      bg = "black";
    }
    return (
      <button className="life-button"
        onClick={() => this.toggleAlive()}
        style={{backgroundColor: bg}}
        ></button>
    );
  }
};

export default Square;