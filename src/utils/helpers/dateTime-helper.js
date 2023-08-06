function compareTime(timestring1,timestring2) {
    let dateTime1 = new Date(timestring1);
    let dateTime2 = new Date(timestring2);
    return dateTime1.getTime() > dateTime2.getTime();
}

module.exports = compareTime;