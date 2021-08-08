const router = require("express").Router();

const Movie = require('../models/Movies');

const verifyToken = require('../middleware/verifyToken');

// Post Movies
// /api/movies
router.post("/",verifyToken, async (req, res) => {

  if(req.user.isAdmin){
     const newmovie  = new Movie(req.body)
          try {
           const movie = await newmovie.save()
           res.status(201).json(movie)
          } catch (err) {
           res.status(500).json(err);
          }
       
      }else{
        res.status(403).json('You are not post movie..')
      }
});


 // Get specific movies
// /api/movies/:id
router.get("/find/:id", verifyToken, async (req, res) => {

  if(req.user.isAdmin){

    try {
      const movies = await Movie.findById( req.params.id)
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  }else{
     res.status(403).json('You are not allowed to see movies..')
  }
  }); 



   // Get all movies
// /api/movie/:id
router.get("/", verifyToken, async (req, res) => {
  if(req.user.isAdmin){
      try {
        const movies = await Movie.find()
        res.status(200).json(movies);
      } catch (err) {
        res.status(500).json(err);
      }

  }else{
         res.status(403).json('You are not allowed see movies..')
  }
}); 
  
  //UPDATE movie
  // api/movies/:id
  router.put("/:id",verifyToken, async (req, res) => {

    if(req.user.isAdmin){
            try {
             const updatemovie = await Movie.findByIdAndUpdate(req.params.id, {
               $set : req.body
             },
              {
                new : true
              })
             res.status(200).json(updatemovie)
            } catch (err) {
             res.status(500).json(err);
            }
         
        }else{
          res.status(403).json('You are not allowed update movie..')
        }
  });
  

  //DELETE Movie
  // /api/movies/:id

  router.delete("/:id",verifyToken, async (req, res) => {

    if(req.user.isAdmin){
            try {
             await Movie.findByIdAndDelete(req.params.id)
             res.status(200).json('Movie has been deleted..')
            } catch (err) {
             res.status(500).json(err);
            }
         
        }else{
          res.status(403).json('You are not allowed to delete movies..')
        }
  });
  

// Get Random
// /api/movies/random
router.get("/random", verifyToken, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
