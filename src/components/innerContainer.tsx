// Import External Dependancies
import React from 'react'
import {View, Text} from "@nodegui/react-nodegui"

// Set Types
type InnerContainerColumnProps = {
    title: string
}

export const InnerContainer: React.FC<InnerContainerColumnProps> = props => {
  const {title, children} = props

  return (
      <View id="innerContainer" styleSheet={styleSheet}>        
          <Text id="headText">{title}</Text>
          <View id="stats">
            {children}
          </View>
      </View>
  )
}

const styleSheet = `
  #innerContainer {
    height: 180;
    width: 230;
    background: #111111;
    border-radius: 5px;
  }

  #stats {
    flex-direction: row;
    align-items: 'flex-start';
    justify-content: 'flex-start';
  }
  
  #headText {
      margin: 5px 5px 5px 0;
      font-size: 18px;
  }
`