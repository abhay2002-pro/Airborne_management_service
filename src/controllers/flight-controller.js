const { StatusCodes } = require("http-status-codes");

const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 *
 * POST : /flight
 * req.body {flightNumber: 'UK808', airplaneId: 10, departureAirportId: 11, arrivalAirportId: 12, arrivalTime: 2023-05-17 04:33:12, departureTime: 2023-06-17 04:33:12, price: 8000, totalSeats: 120}
 */
async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * 
 * GET : /flights/:id
 * req.body {}
 */
async function getFlight(req, res) {
  try {
      const flight = await FlightService.getFlight(req.params.id)
      SuccessResponse.data = flight
      return res
              .status(StatusCodes.OK)
              .json(SuccessResponse)
  } catch(error) {
      ErrorResponse.error = error;
      return res
              .status(error.statusCode)
              .json(ErrorResponse)
  }
}

/**
 * 
 * PATCH : /flights/:id
 * req.body {seats, dec}
 */
async function updateSeats(req, res){
  try {
    const flight = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec
    });
    SuccessResponse.data = flight
      return res
              .status(StatusCodes.OK)
              .json(SuccessResponse)
  } catch(error) {
    ErrorResponse.error = error;
    return res
            .status(error.statusCode)
            .json(ErrorResponse)
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
};
