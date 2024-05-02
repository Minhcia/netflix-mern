const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const {verifyToken} = require("./verifyToken");


// UPDATE 

router.put("/:id", verifyToken, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
      }
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  });


  // DELETE

  router.delete("/:id", verifyToken, async(req,res)=>{
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
      }
  
      try {
        const deletedUser = await User.findByIdAndDelete(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json("Account has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can delete only your account");
    }
  })

//GET

router.get("/find/:id", verifyToken, async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    const {password, ...info} = user._doc;
    res.status(200).json(info)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL

router.get("/", verifyToken, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});



module.exports = router