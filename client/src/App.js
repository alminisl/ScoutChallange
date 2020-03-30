import React, { Component } from 'react';
import './App.css';
import { Button, TextField, Container } from '@material-ui/core';
import ResultComponent from './components/resultComponent'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      url: '', 
      title: '', 
      data: {}, 
      validation: {
          headingsArray: [],
          errors: [], 
          HtmlVersion: ''
      }, 
      picturesInfo: {
        numberOfPictures: 0,
        largestImage: {}
      }, 
      links: {numberOfLinks: 0}, 
      timings: {phases: {total: 0}},
      error: false,
      errorMessage: '',
      disableButton: false,
    }

    this.analyzeWebsite = this.analyzeWebsite.bind(this)
  }

  fetchStep = async (step) => {
    const fetchUrl = "http://localhost:9000/" + step
    const payload = step === 'init' ? {url: this.state.url} : this.state.data
    return await fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  resetState = () => {
    this.setState({ url: '', title: '', data: {}, validation: {headingsArray: [], errors: [], HtmlVersion: ''}, picturesInfo: {numberOfPictures: 0, largestImage: {}}, links: {numberOfLinks: 0}, timings: {phases: {total: 0}} })
  }

  async analyzeWebsite() {
    if(this.state.url.indexOf("https://") !== -1 && this.state.url.indexOf("http://") !== -1) {
      this.setState({error:true, helperText: "Please enter URL with http or https!"})
      this.resetState()
      return
    }

    this.resetState()
    const response = await this.fetchStep('init')
    if (response.status === 404) {
      this.setState({error:true, helperText: "Website not found, please check the URL!"})
      return
    }
    const data = await response.json()
  
    if (data) {
      this.setState({ title: data.title, data: data.data, timings: data.data.timings, disableButton: true, error: false})
      
      const validationResponse = await this.fetchStep('validation')
      if(validationResponse.status === 500) {
        this.setState({error:true, helperText: validationResponse.statusText + " " + validationResponse.status})
      }

      const res = await validationResponse.json()
      console.log('Validation Res: ', res)
      this.setState({ validation: res })
    }
    if (this.state.validation) {
      const pictureData = await  await this.fetchStep('pictures')
      if(pictureData.status === 500) {
        this.setState({error:true, helperText: pictureData.statusText + " " + pictureData.status})
      }
      const picturesInfo = await pictureData.json()
      this.setState({ picturesInfo: picturesInfo })
    } else {
      this.setState({error:true, helperText: "Issue with pictures info!"})
      this.resetState()
    }

    if (this.state.picturesInfo) {
      const linksData = await this.fetchStep('links')
      const rawLinks = await linksData.json()
      this.setState({ links: rawLinks, disableButton: false })
    } else {
      this.setState({error:true, helperText: "Issue with link on the website!"})
      this.resetState()
    }
  }

  handleChange = (event) => {
    this.setState({ url: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="md">
          <h1>Website Analysis tool</h1>
            <div>
              <TextField helperText={this.state.helperText} error={this.state.error} fullWidth id="filled-full-width" margin="normal" label="Please enter url ex. https://example.com" variant="outlined" onChange={this.handleChange} />
            </div>
            <div>
              <Button disabled={this.state.disableButton} variant="contained" onClick={this.analyzeWebsite} color="primary">Start Website analysis</Button>
            </div>
        </Container>
        <ResultComponent data={this.state} loadTime={this.state.timings.phases.total}></ResultComponent>
      </div>
    );
  }
}

export default App;
