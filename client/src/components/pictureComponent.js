import React, { Component } from 'react';

class PictureComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <h2>Picture results: </h2>
        <p>Number of images: {this.props.numberOfImages}</p>
        <p>Largest image: {this.props.largestImage.url}</p>
        <p>Dimensions: {this.props.largestImage.height} x {this.props.largestImage.width}</p>
      </div>
    );
  }
}

export default PictureComponent;

