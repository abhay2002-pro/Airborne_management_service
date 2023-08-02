const { StatusCodes } = require('http-status-codes')

const { CityService } = require("../services")
const { SuccessResponse, ErrorResponse } = require("../utils/common")

/**
 * 
 * POST : /cities
 * req.body {name 'LONDON}
 */
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name,
        })
        SuccessResponse.data = city
        return res
                .status(StatusCodes.CREATED)
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
 * DELETE : /cities/:id
 * req.body {}
 */
async function destroyCity(req, res) {
    try {
        const reponse = await CityService.destroyCity(req.params.id)
        SuccessResponse.data = reponse
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
 * PATCH : /update/:id
 * req.body {name: LONDON}
 */
async function updateAirplane(req, res) {
    try {
        const reponse = await CityService.updateCity(req.params.id, {
            name: req.body.name
        })
        SuccessResponse.data = reponse
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse)
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}


module.exports = {
    createCity,
    destroyCity,
    updateAirplane
}