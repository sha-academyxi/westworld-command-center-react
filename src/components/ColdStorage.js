import React from 'react';
import { Segment } from 'semantic-ui-react'
import HostList from './HostList';

const ColdStorage = ({ hosts, selectedHostID, handleClickHost }) => (
  <Segment.Group className="HQComps">
    <Segment compact>
      <h3 className="labels">ColdStorage</h3>
    </Segment>
    <Segment compact>
      <HostList
        hosts={hosts}
        selectedHostID={selectedHostID}
        handleClickHost={handleClickHost}
      />

    </Segment>
  </Segment.Group>
)

export default ColdStorage
