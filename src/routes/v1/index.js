const express = require("express");

const { InfoController } = require("../../controllers");

const AirplaneRoutes = require("./airplane-routers");
const CityRoutes = require("./city-routers");

const router = express.Router();

router.use("/airplanes", AirplaneRoutes);
router.use("/cities", CityRoutes);

router.get("/info", InfoController.info);

module.exports = router;
