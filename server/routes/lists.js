const router = require("express").Router();

const List = require('../models/List');

const verifyToken = require('../middleware/verifyToken');

// Post Lists
// /api/lists

router.post("/",verifyToken, async (req, res) => {

  if(req.user.isAdmin){
     const newlist  = new List(req.body)
          try {
           const list = await newlist.save()
           res.status(201).json(list)
          } catch (err) {
           res.status(500).json(err);
          }
       
      }else{
        res.status(403).json('You are not allowed to post lists..')
      }
});

// Delete Lists
// /api/lists

router.delete("/:id",verifyToken, async (req, res) => {

    if(req.user.isAdmin){
            try {
             await List.findByIdAndDelete(req.params.id)
             res.status(201).json('List has been deleted')
            } catch (err) {
             res.status(500).json(err);
            }
         
        }else{
          res.status(403).json('You are not allowed to delete lists..')
        }
  });
  



// Get Lists
// /api/lists

router.get("/",verifyToken, async (req, res) => {
     
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = [];

     try {

        if(typeQuery){
            if(genreQuery){
               list = await List.aggregate([
                   {$sample : {size : 5}},
                   {$match : {type:typeQuery , genre : genreQuery}},
               ])
            }else{
                list = await List.aggregate([
                    {$sample : {size : 5}},
                    {$match : {type: typeQuery }},
                ])
              
            }
  
      }else{
            list = await List.aggregate([
                {$sample : {size : 10}},
            ])
  
      }
         
         res.status(200).json(list)
     } catch (err) {
        res.status(403).json(err)
     }
    

   
  });



module.exports = router;
