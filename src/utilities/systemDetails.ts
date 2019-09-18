// Import External Dependancies
const osu = require('node-os-utils')

// Destructure plugin modules
const {os, cpu, mem, drive} = osu
 
// Import Globals
import { globals } from "./globals"
 
// Use ASYNC function to handle promises
export const systemDetails = async () => {
    // Static Details
    const platform = cpu.model()
    const operatingSystem = await os.oos()
    const ip = os.ip()
    const osType = os.type()
    const arch = os.arch()

    // CPU Usage
    const cpuUsed= await cpu.usage()
    const cpuFree = await cpu.free()

    // Memory Usage
    const memUsed = await mem.used()
    const memFree = await mem.free()

    // Disk Space Usage
    const driveInfo = await drive.info()
    const memUsedPercentage = memUsed.usedMemMb / memUsed.totalMemMb * 100
    const memFreePercentage = memFree.freeMemMb / memFree.totalMemMb * 100

    const systemInformation = {
      staticDetails: {
        platform,
        operatingSystem,
        ip,
        osType,
        arch
      },
      cpuDetails: {
        cpuUsed: {
          usage: cpuUsed,
          label: globals.labels.used,
          color: globals.colors.red
        },
        cpuFree: {
          usage: cpuFree,
          label: globals.labels.free,
          color: globals.colors.green
        }
      },
      memoryDetails: {
        memUsed: {
          usage: memUsedPercentage,
          label: globals.labels.used,
          color: globals.colors.red
        },
        memFree: {
          usage: memFreePercentage,
          label: globals.labels.free,
          color: globals.colors.green
        }
      },
      driveDetails: {
        spaceUsed: {
          usage: driveInfo.usedPercentage,
          label: globals.labels.used,
          color: globals.colors.red
        },
        spaceFree: {
          usage: driveInfo.freePercentage,
          label: globals.labels.free,
          color: globals.colors.green
        }
      }
    }
    return systemInformation
}