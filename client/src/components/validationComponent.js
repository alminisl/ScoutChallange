import React, { Component } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';


class ValidationComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    let array = []
    this.props.headingsArray.map(heading => {
      Object.keys(heading).map(key => {
        return array.push(`${key}: ${heading[key]}`)
      })
    })

    const errorList = this.props.errors.map(error =>
      error.message
    )

    return (
      <div className="App">
        <h2>HTML Validation results: </h2>
        <p><strong>Html Version:</strong> {this.props.htmlVersion}</p>
        <p><strong>Headings:</strong> {array.map(heading => {
          return <li key={heading}>{heading}</li>
        })}</p>
        <p><strong>HTML errors: </strong>{this.props.errors.length}</p>

        <div timeout="auto" >
          <ul className="scrollble">
            {errorList.map((error, i) =>
              <ListItem button key={i} onClick={this.handleClick}>
                <ListItemText primary={error} />
              </ListItem>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default ValidationComponent;
