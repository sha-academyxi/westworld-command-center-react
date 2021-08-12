import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = ({ hosts, selectedHostID, handleClickHost }) => {

  return(
    <Card.Group itemsPerRow={6}>
      {hosts.map(host => <Host
        key={host.id}
        host={host}
        selectedHostID={selectedHostID}
        handleClickHost={handleClickHost}
      />)}
    </Card.Group>
  )
}

export default HostList
