const { StatusCodes } = require("http-status-codes");


const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository =  new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch(error) {
        if(error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => { 
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyCity(data){
    try {
        const response = await cityRepository.destroy(data);
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("City you requested to delete is not present", error.statusCode);
        }
        throw new AppError("Cannot delete the city", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
        const reponse = await cityRepository.update(id,data);
        return reponse;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("City you requested to update is not present", error.statusCode);
        }
        throw new AppError("Cannot update the city", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity
}