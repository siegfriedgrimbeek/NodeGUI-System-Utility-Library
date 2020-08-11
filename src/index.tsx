
// Import External Dependancies
import {Window, Renderer, View, Text} from "@nodegui/react-nodegui"
import React, { useState, useEffect } from "react"

// Import System Details
import { systemDetails } from "./helpers/systemDetails"
import { initialData } from "./helpers/initialData"

// Import Components
import {StatsRow} from "./components/StatsRow"
import {innerContainer} from "./components/InnerContainer"
import {StatsColumn} from "./components/StatsColumn"


// Application width and height
const fixedSize = { width: 490, height: 460 }

// Function React Component
const App = () => {
  // Array destructure data and setData function
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const getSystemData = async () => {
      const sysData : any = await systemDetails()
      setData(sysData)
    }
    getSystemData()
  })

  const renderCpuDetails = () => {
    const cpuDetails = data.cpuDetails
    return Object.keys(cpuDetails).map((key) => {
        const stat = cpuDetails[key]
        return <StatsColumn label={stat.label} usage={stat.usage} color={stat.color}  />
    })
  }

  const renderMemoryDetails = () => {
    const memDetails = data.memoryDetails
    return Object.keys(memDetails).map((key) => {
        const stat = memDetails[key]
        return <StatsColumn label={stat.label} usage={stat.usage} color={stat.color}  />
    })
  }

  const renderDriveDetails = () => {
    const driveDetails = data.driveDetails
    return Object.keys(driveDetails).map((key:any) => {
        const stat:any = driveDetails[key]
        return <StatsColumn label={stat.label} usage={stat.usage} color={stat.color}  />
    })
  }

  //Get Static Data
  const {platform, operatingSystem, ip, osType, arch} = data.staticDetails
  
  return (
    <Window minSize={fixedSize} maxSize={fixedSize} styleSheet={styleSheet}>
      <View id="container">
        <Text id="header">System Utility Monitor</Text>
        <Text id="subHeader">{platform}</Text>
        <StatsRow>
            <View id="informationContainer" styleSheet={styleSheet}>
              <Text id="headText">System Information</Text>
              <Text id="infoText">{operatingSystem}</Text>
              <Text id="infoText">{osType}</Text>
              <Text id="infoText">{ip}</Text>
              <Text id="infoText">{arch}</Text>
            </View>
          <InnerContainer title={"Disk Space"}>
            {renderDriveDetails()}
          </InnerContainer>
        </StatsRow>
        <StatsRow>
          <InnerContainer title={"CPU Usage"}>
            {renderCpuDetails()}
          </InnerContainer>
          <InnerContainer title={"Memory Usage"}>
            {renderMemoryDetails()}
          </InnerContainer>
        </StatsRow>
      </View>
    </Window>
  )
}

// Application Stylesheets
const styleSheet = `
  #container {
    flex: 1;
    flex-direction: column;
    min-height: '100%';
    height: '100%';
    justify-content: 'space-evenly';
    background-color: #272727;
  }

  #header {
    font-size: 22px;
    padding: 5px 10px 0px 10px;
    color: white;
  }

  #subHeader {
    font-size: 14px;
    padding: 0px 10px 10px 10px;
    color: white;
  }
  
  #headText {
    margin: 5px 5px 5px 0;
    font-size: 18px;
    color: white;
  }

  #infoText {
    padding: 5px 0 0 5px;
    color: white;
    font-size: 12px;
  }

  #informationContainer {
    height: 180;
    width: 230;
    background: #111111;
    border-radius: 5px;
  }
`

// Render the application
Renderer.render(<App />)
