// Import External Dependancies
import React from 'react'
import {View} from "@nodegui/react-nodegui"

export const StatsContainer = (props: { children: React.ReactNode; }) => {
  return (
      <View id="systemStats" styleSheet={styleSheet}>
          {props.children}
      </View>
  )
}

const styleSheet = `
  #systemStats {
    width: 470;
    height: 180;
    flex: 1;
    flex-direction: row;
    justify-content: 'space-between';
    margin-horizontal: 10px;
  }
`