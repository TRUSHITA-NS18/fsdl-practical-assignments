const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/find-advisors", async(req,res)=>{

const {keywords} = req.body;

const advisors = await User.find({
 role:"advisor",
 isProfileComplete:true
});

const filtered = advisors.filter(a=>{
 const text =
 `${a.expertise} ${a.bio}`.toLowerCase();

 return keywords.some(k=>
 text.includes(k.toLowerCase())
 );
});

res.json(filtered);
});

module.exports = router;