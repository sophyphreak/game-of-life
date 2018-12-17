import React from 'react';
import { Button } from 'reactstrap';

class ButtonArea extends React.Component {
  render() {
    return (
      <div className="flex margin-auto">
        <p className="margin-auto">Generation: {this.props.generation}</p>
        <br/>
        <Button color="default" className="margin-auto" onClick={() => this.props.toggleStart()}>
          {this.props.start ? "Pause" : "Start"}
        </Button>
        <br/><br/>
      </div>
    );
  }
};

export default ButtonArea;