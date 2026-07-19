const express = require("express");
const router = express.Router();

router.post("/extract", async(req,res)=>{

const text = req.body.text || "";

const words = text
.toLowerCase()
.replace(/[^\w\s]/g,"")
.split(" ")
.filter(w=>w.length>3);

const unique = [...new Set(words)];

res.json({
keywords:unique.slice(0,8)
});

});

module.exports = router;