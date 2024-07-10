const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose');

const port = process.env.NODE_env || 3000;
mongoose
  .connect("mongodb+srv://bolajiakanji21:Unde5085%402@bolaji.l6yuhxc.mongodb.net/fcc-exercise-tracker?retryWrites=true&w=majority&appName=Bolaji")
  .then(() => console.log("connected to mangodb"))
  .catch((err) => console.error("failed to connect to mangodb", err));

const { Schema } = mongoose;



const UserSchema = new Schema({
  username: String,
});
const User = mongoose.model("User", UserSchema);

const ExerciseSchema = new Schema({
  user_id: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
});

const Exercise = mongoose.model("Exercise", ExerciseSchema)

app.use(cors())
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users/', async (req, res) => {
  const userObj = new User({
    username: req.body.username
  })

  try {
    const user = await userObj.save();
    res.json(user);
  }
  catch (err) {
    console.log(err);
  }
});

app.post('/api/users/:_id/exercises', async (req, res) => {

  const id = req.params._id;
  const { description, duration, date } = req.body;

  const user = await User.findById(id);

  const exerciseObj = new Exercise({
    user_id: user._id,
    description,
    duration,
    date: date ? new Date(date).toDateString() : new Date().toDateString()
  });

  const exercise = await exerciseObj.save();

  res.json({
    _id: user._id,
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: new Date(exercise.date).toDateString()
  });
}

);

app.get('/api/users', async (req, res) => {
  const users = await User.find({}, '_id username');
  if (!users) {
    res.send("No users");
  }
  res.json(users);
});

app.get("/api/users/:_id/logs", async (req, res) => {
  const { from, to, limit } = req.query;
  const id = req.params._id;
  const user = await User.findById(id);

  let dateObj = {}

  if (from) {
    dateObj['$gte'] = new Date(from);
  }

  if (to) {
    dateObj['$lte'] = new Date(to);
  }
  let filter = {
    user_id: id,
  }

  if (from || to) {
    filter.date = dateObj;
  }

  const exercises = await Exercise.find(filter).limit(+limit ?? 500);

  const result = exercises.map(e => ({
    description: e.description,
    duration: e.duration,
    date: e.date.toDateString()
  }))

  res.json({
    username: user.username,
    count: exercises.length,
    _id: user._id,
    log: result
  })

})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})