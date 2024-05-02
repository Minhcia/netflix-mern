const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// REGISTER

router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err)
    }
}) 


// LOGIN

router.post("/login", async (req,res)=>{
    try {
        const encrypted = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
        const decripted = CryptoJS.AES.decrypt(encrypted, process.env.PASS_SEC);
        const  Originalpassword = decripted.toString(CryptoJS.enc.Utf8);
        const user = await User.findOne({email: req.body.email})
        ! user && res.status(401).json("Wrong user");
       
        Originalpassword !== req.body.password && res.status(401).json("Wrong password");
       
        const accessToken = jwt.sign(
            {id: user._id,
            isAdmin: user.isAdmin},
            process.env.PASS_SEC,
            {expiresIn: "3d"},
        );
        
        const {password, ...info} = user._doc;
        res.status(200).json({...info, accessToken});
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;