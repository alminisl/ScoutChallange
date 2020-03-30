import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import ValidationComponent from './validationComponent'
import PictureComponent from './pictureComponent'
import LinksComponent from './linksComponent'

class ResultComponent extends Component {
  render() {
    let validation = ''
    let picture = ''
    let links = ''
    let loadTime = 0

    if (this.props.data.validation.headingsArray.length === 0) {
      validation = <div></div>
    } else {
      validation = <ValidationComponent headingsArray={this.props.data.validation.headingsArray} errors={this.props.data.validation.errors} htmlVersion={this.props.data.validation.HtmlVersion}></ValidationComponent>
    }

    if (this.props.data.picturesInfo.numberOfPictures === 0) {
      picture = <div></div>
    } else {
      picture = <PictureComponent numberOfImages={this.props.data.picturesInfo.numberOfPictures} largestImage={this.props.data.picturesInfo.largestImage}></PictureComponent>
    }

    if (this.props.data.links.numberOfLinks === 0) {
      links = <div></div>
    } else {
      links = <LinksComponent numberOfLinks={this.props.data.links.numberOfLinks}
        internalLinks={this.props.data.links.internalLinks}
        externalLinks={this.props.data.links.externalLinks}
        internalLinksCount={this.props.data.links.internalLinks.length}
        externalLinksCount={this.props.data.links.externalLinks.length}
      >
      </LinksComponent>
    }

    if (this.props.loadTime !== 0) {
      loadTime = this.props.loadTime
    }

    return (
      <div className="App">
        <Container maxWidth="md" className="border">
          <h3>Website Title: {this.props.data.title}</h3>
          <h3>Loading Time: {loadTime} (Miliseconds)</h3>
          {validation}
          {picture}
          {links}
          {this.props.data.disableButton ? <h2>Loading results, please wait...</h2> : ''}
        </Container>
      </div>
    );
  }
}

export default ResultComponent;

