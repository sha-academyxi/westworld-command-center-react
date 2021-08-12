import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area';


const WestworldMap = ({ areas, allHosts, selectedHostID, handleClickHost }) => {

  return (
    <Segment id="map" >
      {areas.map(area => <Area
        key={area.id}
        area={area}
        hosts={allHosts.filter(host => host.active && host.area === area.name)}
        selectedHostID={selectedHostID}
        handleClickHost={handleClickHost}
      />)}
    </Segment>
  )
}

export default WestworldMap
