const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userController = require("./controllers/user");
const exerciseController = require("./controllers/exercise");

const app = express();
const port = process.env.NODE_env || 3000;
mongoose
  .connect("mongodb://localhost/metadata")
  .then(() => console.log("connected to mangodb"))
  .catch((err) => console.error("failed to connect to mangodb", err));

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", async(req, res) => {
    try {
        const username = req.body.username;
     const result=await   userController
            .createUser(username)
            
                return res.json(result);
            
    }
    catch (err)  {
      console.log(err);
    };
});

app.get("/api/users", async (req, res) => {
    try {
     const result =  await userController
            .findAllUsers()
            
                return res.json(result);
            
    }
    catch (err)  {
      console.log(err);
    };
});

app.post("/api/users/:_id/exercises", async(req, res) => {
  
    try {
        const result = await exerciseController
            .createExercise(data)
    
        return res.json(result);
    }
    catch(err)  {
      console.log(err);
    };
});

app.get("/api/users/:_id/logs",async (req, res) => {
  const userId = req.params._id;
try {
  const result = await exerciseController
    .getAllExercises(userId, req.query)
    
      return res.json(result);
    }
    catch (err)  {
      console.log(err)
    }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
