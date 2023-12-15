const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const mongoose = require('mongoose')
const User = mongoose.model('users')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '777'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payLoad, done) => {
            try{
                const user = await (await User.findById(payLoad.userId)).isSelected('login id')

                if (user){
                    done(null, user)
                } else {
                    done(null, false)
                }
            }
            catch(e){
                console.log(e)
            }
        })
    )
}