const express = require("express");

const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");
const router = express.Router();

// /api/v1/flights POST
router.post("/", FlightMiddlewares.validateCreateRequest, FlightController.createFlight);

//api/v1/flights?trips=DEL-MUM GET
router.get("/",FlightController.getAllFlights);
module.exports = router