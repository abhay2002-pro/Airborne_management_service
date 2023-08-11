function addRowLockOnFlights(flightId){
    return db.sequelize.query(`SELECT * FROM Flights WHERE Flights.id = ${flightId} FOR UPDATE`);
}

module.exports = {
    addRowLockOnFlights
}