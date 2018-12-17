import React from 'react';

class TitleBar extends React.Component {
  render() {
    return (
      <div className="flex">
        <h2 className="margin-auto">Conway's Game of Life</h2>
        <h5 className="margin-auto">Created by Andrew Horn</h5>
        <br/>
      </div>
    );
  }
};

export default TitleBar;