const { parse, format } = require('date-fns');


// Function to convert date format using date-fns
function convertDateFormat(dateString, formatString) {

    const parsedDate = parse(dateString, 'ddMMyyyy', new Date());
    return format(parsedDate, formatString);
}


//Function to convert time format.
function convertTimeFormat(timeString, formatString) {
    
    const hours = parseInt(timeString.substring(0, 2));
    const minutes = parseInt(timeString.substring(2, 4));
    const seconds = parseInt(timeString.substring(4, 6));
    const parsedTime = new Date();
    parsedTime.setHours(hours, minutes, seconds);

    // Use the format function from date-fns to format the parsed time
    return format(parsedTime, formatString);
}

module.exports={
    convertDateFormat,
    convertTimeFormat
}