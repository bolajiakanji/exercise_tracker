const User = require("../models/user");
const Exercise = require("../models/exercise");
const getdatequery = require('../utils/dateQuery')
const Joi = require('joi')
const { z } = require('zod')

const mySchema = z.object({
  description: z.string(),
  duration: z.number(),
  date: z.string().optional(),

})




exports.createExercise = async (newExercises, userId) => {
  let { description, duration, date } = newExercises;
  let dat = date ? new Date(date) : new Date()
  console.log(dat)
  
  const newExercise = { description, duration: parseInt(duration), date: dat.toDateString() }
  console.log(newExercise.date)
  try {
   console.log( mySchema.safeParse(newExercise).success)
  } catch (err) {
    console.log(err)
  }
  console.log(newExercise)
  console.log(userId)
  console.log(date+ 'here')
  const resjoi = mySchema.safeParse(newExercise).success
  if (!resjoi) return 'invalid route'
  
  const user = await User.findById(userId);
  console.group(date + 'jdg')
  if (!user) return 'no such user'
  console.log(user)
    const exercise = new Exercise({ userId:user. _id,description: newExercise.description, duration: parseInt(newExercise.duration), date: newExercise.date });
    let s= await exercise.save()
     
    return {
      username: user.username,
      description: s.description,
      duration: parseInt(s.duration),
      date: s.date,
      _id: userId,
       
    }
  
  }
;
exports.getAllExercises = async (userId, queryParams) => {
    const dateParams = getdatequery(queryParams)
    const buildQuery = Object.keys(dateParams).length > 0 ? { userId, date: dateParams } : { userId }
    let { limit } = queryParams
    let count, log, username;

    const exercises = await Exercise.find({ buildQuery })
        .limit(parseInt(limit))
    count = exercises.length
    log = exercises.map(({ description, duration, date }) => {
        return { description, duration, date}

    })
    const userg = await User.findById(userId)
    if (userg) username = userg.username
        return  { count,username,log}


    



}
    
