const User = require("../models/user");

const createUser = async (username) => {
    const user = new User({
        username,
    });
  
    const savedUser = await user.save();
    return { _id: savedUser._id, username: savedUser.userName };
  
}

const findAllUsers = async () => {
  
    const users = await User.find({});
    return users.map((user) => ({ _id: user._id, username: user.username }));
  
};

module.exports = { createUser, findAllUsers };
