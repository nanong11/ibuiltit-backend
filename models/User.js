const mongoose = require(`mongoose`)

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, `First name is required.`],
        minLength: 2,
    },
    lastName: {
        type: String,
        required: [true, `Last name is required.`],
        minLength: 2,
    },
    email: {
        type: String,
        required: [true, `Email is required.`],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, `Password is required.`]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    lastLoginDate: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

/* schema.statics.login = function login(id, callback) {
    return this.findByIdAndUpdate(id,{'$set' : { 'lastLoginDate' : Date.now()} }, { new : true }, callback);
};
schema.set('toJSON', {
    virtuals: true
});
 */
module.exports = mongoose.model(`User`, userSchema)