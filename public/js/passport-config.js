// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcryptjs')


// const { User } = require('../../models');

// module.exports = passport => {
//   // setup local passport
//   passport.use(
//     new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
//       try {

//         const user = await User.findOne({ email })
//         if (!user) {
//           return done(null, false, { message: 'That email is not registered'}) 
//         }
//         const isMatch = await bcrypt.compare(password, user.password)

//         if (isMatch) {
//           return done(null, user)
//         } else {
//           return done(user.errors, null, { message: 'Email or password incorrect' })
//         }

//       } catch (e) {
//         throw e
//       }
//     })
//   )
//   // passport serializeUser & deserializeUser
//   passport.serializeUser((user, done) => {
//     done(null, user.id)
//   })
//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user)
//     })
//   })
// }

// //load bcrypt
// var bCrypt = require('bcrypt-nodejs');

// module.exports = function (passport, user) {
//     var User = user,
//         LocalStrategy = require('passport-local').Strategy;

//     passport.use('local-signup', new LocalStrategy({
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true // allows us to pass back the entire request to the callback
//         },

//         function (req, email, password, done) {
//             var generateHash = function (password) {
//                 return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
//             };

//             User.findOne({
//                 where: {
//                     email: email
//                 }
//             }).then(function (user) {

//                 if (user) {
//                     return done(null, false, {
//                         message: 'That email is already taken'
//                     });
//                 } else

//                 {

//                     var userPassword = generateHash(password),
//                         data = {
//                             email: email,
//                             password: userPassword,
//                             UserName: req.body.UserName
//                         };

//                     User.create(data).then(function (newUser, created) {
//                         if (!newUser) {
//                             return done(null, false);
//                         }

//                         if (newUser) {
//                             return done(null, newUser);
//                         }
//                     });
//                 }
//             });
//         }
//     ));
//     //serialize
//     passport.serializeUser(function (user, done) {
//         done(null, user.ID);
//     });

//     // deserialize user 
//     passport.deserializeUser(function (id, done) {

//         User.findById(id).then(function (user) {
//             if (user) {
//                 done(null, user.get());
//             } else {
//                 done(user.errors, null);
//             }
//         });

//     });
//     //LOCAL SIGNIN
//     passport.use('local-signin', new LocalStrategy({
//             // by default, local strategy uses username and password, we will override with email
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true // allows us to pass back the entire request to the callback
//         },

//         function (req, email, password, done) {
//             var User = user,
//                 isValidPassword = function (userpass, password) {
//                     return bCrypt.compareSync(password, userpass);
//                 }

//             User.findOne({
//                 where: {
//                     email: email
//                 }
//             }).then(function (user) {

//                 if (!user) {
//                     return done(null, false, {
//                         message: 'Email does not exist'
//                     });
//                 }

//                 if (!isValidPassword(user.password, password)) {
//                     return done(null, false, {
//                         message: 'Incorrect password.'
//                     });
//                 }

//                 var userinfo = user.get();
//                 return done(null, userinfo);

//             }).catch(function (err) {
//                 console.log("Error:", err);
//                 return done(null, false, {
//                     message: 'Something went wrong with your Signin'
//                 });
//             });
//         }
//     ));
// }