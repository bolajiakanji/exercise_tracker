const {dateConversion} = require('./dateConversion')
const getdatequery = (queryParams) => {
    let dateObj = {}
    const { from, to } = queryParams
    if (from) {
        dateObj = { ...dateObj, $gte: from }
    }
    if (to) {
        dateObj = { ...dateObj, $lte: to } 
    }
    return dateObj
}

module.exports = getdatequery