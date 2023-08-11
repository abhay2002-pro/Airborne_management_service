const { Sequelize } = require("sequelize");

const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport } = require("../models");
const db = require("../models");
const {addRowLockOnFlights} = require("./queries");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: 'AirplaneDetails',
        },
        {
          model: Airport,
          required: true,
          on: {
            col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("DepartureAirport.code"))
          },
          as: 'DepartureAirport'
        },
        {
            model: Airport,
            required: true,
            on: {
              col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("ArrivalAirport.code"))
            },
            as: 'ArrivalAirport'
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec =  true){
    await db.sequelize.query(addRowLockOnFlights(flightId))
    const flight = await Flight.findByPk(flightId);
    if(!parseInt(dec)) {
      const response = await flight.decrement('totalSeats', {by: seats});
      return response;
    } else {
      const response = await flight.increment('totalSeats', {by: seats});
      return response;
    }
}
}

module.exports = FlightRepository;
