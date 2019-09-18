// Import External Dependancies
import {Renderer, View, Text, Window} from "@nodegui/react-nodegui"
import React, { useState, useEffect } from "react"

// Import System Details
import { systemDetails } from "./utilities/systemDetails"

// Import Components
import {StatsContainer} from "./components/StatsContainer"
import {InnerContainer} from "./components/InnerContainer"
import {StatsColumn} from "./components/StatsColumn"

const fixedSize = { width: 490, height: 460 }

const initialData = {
  staticDetails:{
    platform: 'Loading System Data...',
    operatingSystem: '',
    ip: '',
    osType: '',
    arch: ''
  },
  cpuDetails:{
    cpuUsed: {
      usage: '',
      label: 'Loading',
      color: ''
    },
    cpuFree: {
      usage: '',
      label: 'Loading',
      color: ''
    }
  },
  memoryDetails:{
    memUsed: {
      usage: '',
      label: 'Loading',
      color: ''
    },
    memFree: {
      usage: '',
      label: 'Loading',
      color: ''
    }
  },
  driveDetails: {
    spaceUsed: {
      usage: '',
      label: 'Loading',
      color: ''
    },
    spaceFree: {
      usage: '',
      label: 'Loading',
      color: ''
    }
  }
}

const App = () => {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const runCpuEffect = async () => {
      const sysData : any = await systemDetails()
      setData(sysData)
    }
    runCpuEffect()
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
    return Object.keys(driveDetails).map((key) => {
        const stat: any = driveDetails[key]
        return <StatsColumn label={stat.label} usage={stat.usage} color={stat.color}  />
    })
  }

  //Get Static Data
  const {platform, operatingSystem, ip, osType, arch} = data.staticDetails

  return (
    <Window minSize={fixedSize} maxSize={fixedSize} styleSheet={styleSheet}>
      <View id="container">
        <Text id="header">System Utility Library</Text>
        <Text id="subHeader">{platform}</Text>
        <StatsContainer>
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
        </StatsContainer>
        <StatsContainer>
          <InnerContainer title={"CPU Usage"}>
            {renderCpuDetails()}
          </InnerContainer>
          <InnerContainer title={"Memory Usage"}>
            {renderMemoryDetails()}
          </InnerContainer>
        </StatsContainer>
      </View>
    </Window>
  )
}

const styleSheet = `
  #container {
    flex: 1;
    flex-direction: column;
    min-height: '100%';
    height: '100%';
    align-items: 'left';
    justify-content: 'space-evenly';
    background-color: #272727;
  }

  #header {
    font-size: 22px;
    padding: 5px 10px 0px 10px;
  }

  #subHeader {
    font-size: 14px;
    padding: 0px 10px 10px 10px;
  }

  #infoText {
    padding: 5px 0 0 5px;
  }

  #informationContainer {
    height: 180;
    width: 230;
    background: #111111;
    border-radius: 5px;
  }

  #headText {
    margin: 5px 5px 5px 0;
    font-size: 18px;
  }
`;

Renderer.render(<App />);
