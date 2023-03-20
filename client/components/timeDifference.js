export function timer(start, end) {
    var timeDifference = end-start;
    var differenceDate = new Date(timeDifference * 1000);
    var diffHours = differenceDate.getUTCHours();
    var diffMinutes = differenceDate.getUTCMinutes();
    var diffSeconds = differenceDate.getUTCSeconds();    
    var readableDifference = diffHours + ':' + diffMinutes + ':' + diffSeconds;  
    console.log("DifferenceDATE",differenceDate)
    console.log(timeDifference);
    return readableDifference;

}