const { DATE_FORMAT, TIME_FORMAT } = require("../../constant/constant");
const { convertDateFormat, convertTimeFormat } = require("./converteDateTimeFormate");


const parsePVTPacket = (data)=>{

    // Split the packet data string into an array of values
    let packetData= data.split(',')

  // Create an object to store parsed information
  let result = {
    PacketType:packetData[0],
    CurrentDate:convertDateFormat(packetData[9], DATE_FORMAT),
    CurrentTime:convertTimeFormat(packetData[10], TIME_FORMAT),
    Lat :packetData[11],
    LatDirection:packetData[12],
    Lng :packetData[13],
    LngDirection:packetData[14],
    Speed :packetData[15],
    IgnitionStatus:packetData[22],
    MainInputVoltage:packetData[23],
  } 

// Return the parsed result object
return result;

}


// Export the parsePVTPacket function
module.exports = parsePVTPacket