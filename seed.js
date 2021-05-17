const tours = require('./dev-data/data/tours-simple.json')
const Tours = require('./models/tourModels')
module.exports = {
    seedDB: async function () {

        const result = await Tours.deleteMany({})
        console.log()
    }
}