const express = require("express");

const { InfoController } = require("../../controllers");

const AirplaneRoutes = require("./airplane-routers");
const CityRoutes = require("./city-routers");
const AirportRoutes = require("./airport-routers");
const FlightRoutes = require("./flight-routers");
const router = express.Router();

router.use("/airplanes", AirplaneRoutes);
router.use("/cities", CityRoutes);
router.use("/airports", AirportRoutes);
router.use("/flights", FlightRoutes);

module.exports = router;
