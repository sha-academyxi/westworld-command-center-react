import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'
import HostInfo from './HostInfo'
import { Log } from '../services/Log';
import areaNameMap from '../services/helpers'

class Headquarters extends Component {
  constructor() {
    super()

    this.state = {
      activated: false, // activateAllOrDemissionAll
      logs: []
    }
  }

  handleToggleActive = (hostID) => {
    const foundHost = this.props.allHosts.find(host => host.id === hostID)
    fetch(`http://localhost:3001/hosts/${hostID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({active: !foundHost.active})
    })
      .then(() => {
        const logMessage = foundHost.active ? `Decommissioned ${foundHost.firstName}` : `Activated ${foundHost.firstName}`
        this.setState({
          logs: [Log.warn(logMessage), ...this.state.logs]
        })
        this.props.fetchHosts()
      })
  }

  handleChangeArea = (hostID, areaName) => {
    const foundArea = this.props.area.find(area => area.name === areaName)
    const areaPopulation = this.props.allHosts.reduce((acc, cur) => {
      if (cur.area === areaName) {
        return acc + 1
      }
      return acc
    }, 0)
    if (foundArea.limit === areaPopulation) {
      const foundHost = this.props.allHosts.find(host => host.id === hostID)
      this.setState({
        logs: [Log.error(`Too many hosts. Cannot add ${foundHost.firstName} to ${areaNameMap[areaName]}`), ...this.state.logs]
      })
      return
    }

    fetch(`http://localhost:3001/hosts/${hostID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({area: areaName})
    })
      .then(() => {
        const foundHost = this.props.allHosts.find(host => host.id === hostID)
        this.setState({
          logs: [Log.notify(`${foundHost.firstName} set in area ${areaNameMap[areaName]}`), ...this.state.logs]
        })
        this.props.fetchHosts()
      })
  }

  handleToggleActivateAll = () => {
    const fetches = this.props.allHosts
    .filter(host => host.active === this.state.activated)
    .map(host => {
      return fetch(`http://localhost:3001/hosts/${host.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({active: !this.state.activated})
      })
    })

    Promise.all(fetches)
      .then(() => {
        this.props.fetchHosts()

        const logMessage = this.state.activated ? 'Decommissiong all hosts.' : 'Activating all hosts!'
        this.setState({
          activated: !this.state.activated,
          logs: [Log.warn(logMessage), ...this.state.logs]
        })
      })
  }

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage
            hosts={this.props.allHosts.filter(host => !host.active)}
            selectedHostID={this.props.selectedHostID}
            handleClickHost={this.props.handleClickHost}
          />

        </Grid.Column>
        <Grid.Column width={5}>
        {
            this.props.selectedHostID === undefined
            ? <Details />
            : <HostInfo
                host={this.props.allHosts.find(host => host.id === this.props.selectedHostID)}
                areas={this.props.areas}
                handleChangeArea={this.handleChangeArea}
                handleToggleActive={this.handleToggleActive}
              />
          }
        </Grid.Column>
        <Grid.Column width={3}>

          <LogPanel
            handleToggleActivateAll={this.handleToggleActivateAll}
            activated={this.state.activated}
            logs={this.state.logs}
          />

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
