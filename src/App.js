import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap';
import Headquarters from './components/Headquarters';


class App extends Component {
  constructor() {
    super()

    this.state = {
      hosts: [],
      areas: [],
      selectedHostID: undefined,
    }
  }

  componentDidMount() {
    this.fetchHosts()

    fetch(`http://localhost:3001/areas`)
      .then(resp => resp.json())
      .then(areas => {
        this.setState({
          areas,
        })
      })
  }

  fetchHosts = () => {
    fetch(`http://localhost:3001/hosts`)
    .then(resp => resp.json())
    .then(hosts => {
      this.setState({
        hosts,
      })
    })
  }

  handleClickHost = (hostID) => {
    this.setState({
      selectedHostID: hostID
    })
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap
          areas={this.state.areas}
          allHosts={this.state.hosts}
          selectedHostID={this.state.selectedHostID}
          handleClickHost={this.handleClickHost}
        />
        <Headquarters
          areas={this.state.areas}
          allHosts={this.state.hosts}
          selectedHostID={this.state.selectedHostID}
          handleClickHost={this.handleClickHost}
          fetchHosts={this.fetchHosts}
        />
      </Segment>
    )
  }
}

export default App;
