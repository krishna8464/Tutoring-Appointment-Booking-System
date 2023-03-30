require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const { v4: uuidv4 } = require('uuid');

const { UserModel } = require('../Models/User.model')

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID ,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:9090/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        const email = profile._json.email
        const isAlreadyExist = await UserModel.findOne({ email })

        if (isAlreadyExist) {
            return cb(null, isAlreadyExist)
        }

        const name = profile._json.name
        const avatar = profile._json.picture
        const password = uuidv4()
        const mobile = Math.ceil(Math.random() * 10000000000)

        const user = new UserModel({email, password, mobile, name })
        await user.save()
        return cb(null,email);

    }
));

module.exports = { passport }