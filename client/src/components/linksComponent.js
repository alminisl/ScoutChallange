import React, { Component } from 'react';
import { ListItem, ListItemText, Collapse, List, Button } from '@material-ui/core';

class LinksComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { openInternal: false, openExternal: false }
  }

  handleClickInternal = () => {
    this.setState({ openInternal: !this.state.openInternal })
  }

  
  handleClickExternal = () => {
    this.setState({ openExternal: !this.state.openExternal })
  }

  render() {
    return (
      <div className="App">
        <h2>Links </h2>
        <h3>Number of links: {this.props.numberOfLinks}</h3>
        <div>
    <Button onClick={this.handleClickInternal} variant="contained" color="primary">Internal Links: {this.props.internalLinksCount}</Button>
        <div>
          <List disablePadding className="scrollble">
            {this.props.internalLinks ? 
              this.props.internalLinks.map((link, i) => 
                <ListItem button key={i} onClick={this.handleClickInternal}>
                  <ListItemText primary={link} />
                </ListItem>
            ) 
              : <p>Waiting...</p>
            }
          </List>
        </div>
        </div>
        <div className="m-top-2">
        <Button onClick={this.handleClickExternal} variant="contained" color="primary">External Links: {this.props.externalLinksCount}</Button>
        <div in={this.state.openExternal} timeout="auto" >
          <List disablePadding className="scrollble">
            {this.props.externalLinks ? 
              this.props.externalLinks.map((link, i) => 
                <ListItem button key={i} onClick={this.handleClickExternal}>
                  <ListItemText primary={link} />
                </ListItem>
            ) 
              : <p>Waiting...</p>
            }
          </List>
        </div>
        </div>
      </div>
    );
  }
}

export default LinksComponent;

