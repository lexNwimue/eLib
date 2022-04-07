


import LocalStrategy1 from 'passport-local';
const LocalStrategy = LocalStrategy1.Strategy;
import bcrypt from 'bcrypt';
import userModel from '../model/UserModel.mjs';

const pass = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

            //Match User
            userModel.User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        console.log(email + ' is not a registred email');
                        return done(null, false, { message: email + ' is not a registred email' });
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (isMatch) {
                            return done(null, user);
                        }
                        if (err) throw err;
                        else {
                            console.log('Incorrect password');
                            return done(null, false, { message: 'Incorrect Password' });
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    done(err);
                })
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userModel.User.findById(id, (err, user) => {
            if (err) { return done(err) }
            done(null, user);
        });
    });
}


export { pass };