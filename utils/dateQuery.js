const dateConversion = require('./dateConversion')
const getdatequery = (queryParams) => {
    let dateObj = {}
    const { from, to } = queryParams
    if (from) {
        dateObj = { ...dateObj, $gte: dateConversion(from) }
    }
    if (to) {
        dateObj = { ...dateObj, $lte: dateConversion(to) } 
    }
    return dateObj
}

module.exports = getdatequery