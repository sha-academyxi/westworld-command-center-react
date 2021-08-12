import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList';
import areaNameMap from '../services/helpers'


const Area = ({ area, hosts, selectedHostID, handleClickHost }) => (

  <div className='area' id={area.name}>
    <h3 className='labels'>{areaNameMap[area.name]}</h3>
      <HostList
        hosts={hosts}
        selectedHostID={selectedHostID}
        handleClickHost={handleClickHost}
        />
  </div>

)

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
