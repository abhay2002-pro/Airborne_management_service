const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepository =  new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error) {
        if(error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => { 
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = "23:59:00";

    if(query.trips){
        // trips = MUM-DEL
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.prices){
        // prices = 3000-6000
        [minPrice, maxPrice] = query.prices.split("-");
        customFilter.price = {
            [Op.between] : [minPrice, maxPrice]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between] : [query.tripDate ,query.tripDate + endingTripTime]
        }
    }
    if(query.sort) {
        // sort=departureTime_ASC,price_DESC
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split("_"))
        sortFilter = sortFilters
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (err) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Flight you requested is not present", error.statusCode);
        }
        throw new AppError("Cannot fetch data of the flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function updateSeats(data){
    try {
      const flight = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
      return flight;
    } catch(error) {
        throw new AppError("Cannot update seats of the flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}