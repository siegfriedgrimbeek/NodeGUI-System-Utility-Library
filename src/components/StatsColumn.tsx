// Import External Dependancies
import React from 'react'
import {View, Text} from "@nodegui/react-nodegui"

// Set Types
type StatsColumnProps = {
    label: string,
    usage: number,
    color: string
}

export const StatsColumn: React.FC<StatsColumnProps> = props => {
    // Destructure props
    const {usage, color, label} = props

    // Create Label with usage amount and percentage
    const percentageTextLabel = `${label} ${Math.round(usage * 100) / 100}%`

    // Create Dynamic Style Sheet
    const dynamicStyle = `
        height: ${usage};
        background-color: ${color};
    `
    
    return (
        <View id="statsContainer" styleSheet={statsContainer}>
            <View id="columnContainer" styleSheet={columnContainer}>   
                <View id="user-time" styleSheet={dynamicStyle}></View>
            </View>
            <Text id="statsLabel" styleSheet={statsLabel}>{percentageTextLabel}</Text>
        </View>
    )
}

const statsContainer = `
    #statsContainer {
        height: '140';
        text-align:center;
        justify-content: 'center';
        align-items: 'center';
        justify-content: 'space-between';
        width: 100%;
        flex: 1 0 100%;
        margin-horizontal: 5px;
    }
`

const columnContainer = `
    #columnContainer{
        height: 100%;
        flex: 1 0 100%;
        flex-direction: column-reverse;
        background-color: #747474;
        width: 100%;
    }
`

const statsLabel = `
    #statsLabel {
        height: 40;
        color: white;
        font-size: 14px;
        width: 100%;        
        qproperty-alignment: 'AlignCenter';
    }
`