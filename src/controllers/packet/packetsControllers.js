const parsePVTPacket = require("../../helper/parsePacketsFuctions");

const postPvtPackets = async (body) => {
    try {
        
        //console the body Data
        console.log("body",body);

        let packetData;
        let extractedData = {};

        // Check if packetData exists in the body
        packetData = body?.postData;
        if (!packetData || packetData.length <= 0) {
            return "no-data";
        }

        // Extract the packet identifier from the packetData
        let packetIdentifier = packetData.split(',')[0];

           // Extract relevant data fields based on the packet type
           switch (packetIdentifier) {
            case '$LGN':
                console.log("packet type :","Login Packet")
                // Uncomment and implement if processing login packet data is needed
                // extractedData = await parseLoginPacket(packetData);
                break;
            case '$PVT':
                console.log("packet type :","PVT Packet")
                extractedData = await parsePVTPacket(packetData);
                break;
            case '$EPB':
                console.log("packet type :","Emergency Packet")
                 // Uncomment and implement if processing emergency packet data is needed
                // extractedData = await parseEmergencyPacket(packetData);
                break;
            case '$HEL':
                console.log("packet type :","Health Monitoring Parameter")
                // Uncomment and implement if processing health monitoring packet data is needed
                // extractedData = await parseHealthPacket(packetData);
                break;
            default:
                console.log("packet type :","Invalid-packet")
                return 'Invalid-packet';
        }

        // Return the extracted data
        return extractedData;
        
    } catch (error) {
        if (error?.response?.data?.status == "Failed") {
            if (error ) {
                throw new Error(JSON.stringify(error?.response?.data));
            }
        } else {
            if (error instanceof Error) {
                throw new Error(JSON.stringify(error.message));
            }
        }
    }
}


// Export the postPvtPackets function
module.exports={
    postPvtPackets
}