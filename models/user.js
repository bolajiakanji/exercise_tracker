require('mongoose')

const userSchema = new mongoose.schema({
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)