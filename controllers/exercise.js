const User = require("../models/user");
const Exercise = require("../models/exercise");
const getdatequery = require('../utils/dateQuery')

exports.createExercise = async (newExercise) => {
    let { userId, username, description, duration, date } = newExercise;
    
  
    User.findById(userId);
      const exercise = new Exercise({ userId, username, description, duration, date });
      const savedExercise = await exercise.save()
   const { s_username, s_description, s_duration, s_date, s_userId } = savedExercise
      return {
        username: s_username,
          description: s_description,
          duration: s_duration,
          date: s_date,
          _id: s_userId,
       
  }
  
};
exports.getAllExercises = async (userId, queryParams) => {
    const dateParams = getdatequery(queryParams)
    const buildQuery = Object.keys(dateParams).length > 0 ? { userId, date: dateParams } : { userId }
    let { limit } = queryParams
    let count, log, username;

    const exeecises = await Exercise.find({ buildQuery })
        .limit(limit)
    count = result.length
    log = exeecises.map(({ description, duration, date }) => {
        return { description, duration, date}

    })
    const user = await User.findById(userId)
    if (user) username = user.username
    let result = { count, log, username}
    return result

    



}
    
