import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = ({ host, selectedHostID, handleClickHost }) => {

  return(
    <Card
      className={selectedHostID === host.id ? 'host selected' : 'host'}
      // {/* NOTE: The className "host selected" renders a different style than simply "host". */}
      onClick={() => handleClickHost(host.id)}
      image={host.imageUrl}
      raised
    />
  )
}

export default Host
