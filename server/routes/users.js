const router = require("express").Router();
const User = require('../models/User');
const verifyToken   = require('../middleware/verifyToken');
var CryptoJS = require("crypto-js");



// Get all movies list only for admin
// /api/user
router.get("/",verifyToken, async (req, res) => {
    const query = req.query.new;

    if(req.user.isAdmin){ 
        try {
         const getusers = query ?  await User.find().sort({_id : -1}).limit(5) : await User.find();
         res.status(200).json(getusers)
        } catch (err) {
         res.status(500).json(err);
        }
     }else{
         res.status(403).json('You are not allowed to see all users..')
     }

  });



 // Get specific events
// /events/:id
router.get("/find/:id", async (req, res) => {
     try {
         const user = await User.findById(req.params.id);
         const {password, ...info} = user._doc
         res.status(200).json(info)
        } catch (err) {
         res.status(500).json(err);
        }
  });
  
 //UPDATE events
// /api/user/:id
  router.put("/:id",verifyToken, async (req, res) => {

    if(req.user.id === req.params.id || req.user.isAdmin){
         if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()

          }
        

        try {
         const userupdate = await User.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true});
         res.status(200).json(userupdate)
        } catch (err) {
         res.status(500).json(err);
        }
      }else{
        res.status(200).json('You can update only your account..')
      }
  });

  
  //DELETE Event
// /api/user/:id
  router.delete("/:id",verifyToken, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
          try {
            await User.findByIdAndDelete(req.params.id);
          res.status(200).json('User has been deleted..')
          } catch (err) {
          res.status(500).json(err);

       }
    } else{
      res.status(200).json('You can delete only your account..')
    }
  });


  //Get STATS
// /api/user/stats

router.get("/stats", async (req, res) => {
    const today = new Date();
    const lastyear = today.setFullYear(today.setFullYear() - 1);
  

     try {
        const data = await User.aggregate([

            {$project : {month : {$month : "$createdAt"}}},
            {$group : { _id :"$month", total : {$sum : 1}}}
            
        ]);
        res.status(200).json(data)
     } catch (err) {
        res.status(500).json(err)
     }

    
});


  

module.exports = router;
 