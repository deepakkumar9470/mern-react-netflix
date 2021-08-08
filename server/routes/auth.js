const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");


//REGISTER
// /api/register 
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGIN
// /api/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong username or password!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong username or password!");

     const accessToken = jwt.sign(
          {id : user._id, isAdmin : user.isAdmin},process.env.SECRET_KEY, 
          {expiresIn : "1d"})
   
      const {password , ...info} = user._doc;
      return res.status(200).json({...info, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});


// LOGOUT
router.post('/logout', (req, res) =>{
   req.logout()
 
   req.flash('success_msg', 'You are logged out');
 
   res.redirect('/users/login');
 });






module.exports = router;
