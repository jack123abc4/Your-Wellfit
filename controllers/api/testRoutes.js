// router.get('/login', async (req, res) => {
//     try {
//       res.render('login', { message: req.flash('error') })
  
//     } catch (e) {
//       res.status(500).send()
//     }
//   })
//   // login authentication
//   router.post('/login', async (req, res, next) => {
//     try {
//       passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         badRequestMessage: 'The email does not match any account', // change "missing credentials" message
//         failureFlash: true
//       })(req, res, next)
  
//     } catch (e) {
//       res.status(400).send()
//     }
//   })

//   'use strict';

//   const express = require('express');
//   const passport = require('passport');
//   const router = express.Router();
  
//   router.get('/', (req, res, next) => {
//       const { user } = req;
//       res.render('home', { user });
//   });
  
//   router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
  
//   router.get('/logout', (req, res, next) => {
//     req.logout();
//     res.redirect('/');
//   });
  
//   router.get('/return', 
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res, next) => {
//       res.redirect('/');
//   });
  
//   module.exports = router;