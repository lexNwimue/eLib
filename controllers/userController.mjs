



import userModel from '../model/UserModel.mjs';
import bcrypt from 'bcrypt';
import passport from 'passport';


// Handle Signup
const user_signup_get = (req, res) => {
    res.render('signup', { title: 'User Dashboard' });
}

const user_signup_post = (req, res) => {
    const errors = [];
    let password = req.body.password;
    const password2 = req.body.password2;
    const name = req.body.name;
    const email = req.body.email;
    if (password !== password2) {
        errors.push({ msg: 'Unmatching passwords' });
        console.log(email + ': Unmatching passwords');
        res.render('signup', { errors });
    }
    else if (password.length < 6) {
        errors.push({ msg: 'Password must be at least six characters' });
        res.render('signup', { errors });
    }
    else {
        userModel.User.findOne({ email: email })
            .then(result => {
                if (result) {
                    errors.push({ msg: 'Email already exists' });
                    console.log(email + ' already exists in the DB');
                    res.render('signup', { errors });
                } else {

                    // Encrypt password before saving to DB
                    bcrypt.hash(password, 10).then((hash) => {
                        console.log('Plain text password: ' + password);
                        password = hash;
                        console.log('Hashed password: ' + password);

                        const newUser = new userModel.User({
                            name: name,
                            email: email,
                            password: password
                        });

                        newUser.save()
                            .then(result => {
                                console.log(newUser.name + ' saved to DB');
                                req.flash('success_msg', 'You have successfully registered');
                                res.redirect(302, '/user/signin');
                            })
                            .catch(e => console.log(e))
                    }).catch(e => console.log(e))

                    console.log(password);

                }
            })
            .catch(e => console.log(e))
    }
}

// Handle Sign-in
const user_signin_get = (req, res) => {
    res.render('signin');
}
const user_signin_post = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard/user',
        failureRedirect: '/user/signin',
        failureFlash: true,
    })(req, res, next);
}

const user_signout_get = (req, res) => {
    req.logout();
    res.redirect(302, '/user/signin');
}


const user_listAll_get = (req, res) => {
    res.render('allUsers', { users });

}

export default {
    user_signup_post,
    user_signup_get,
    user_signin_get,
    user_signin_post,
    user_signout_get,
    user_listAll_get,
};