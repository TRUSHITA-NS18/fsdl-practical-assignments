const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

/* SEND REQUEST */
router.post("/send", async (req,res)=>{
  const data = await Request.create(req.body);
  res.json(data);
});

/* ENTREPRENEUR REQUESTS */
router.get("/entrepreneur/:id", async(req,res)=>{
  const data = await Request.find({
    entrepreneurId:req.params.id
  }).populate("advisorId");

  res.json(data);
});

/* ADVISOR REQUESTS */
router.get("/advisor/:id", async(req,res)=>{
  const data = await Request.find({
    advisorId:req.params.id
  }).populate("entrepreneurId");

  res.json(data);
});

/* ACCEPT */
router.put("/accept/:id", async(req,res)=>{
  const data = await Request.findByIdAndUpdate(
    req.params.id,
    {status:"accepted"},
    {returnDocument:"after"}
  );

  res.json(data);
});

/* SAVE LINK */
router.put("/meeting/:id", async(req,res)=>{
  const data = await Request.findByIdAndUpdate(
    req.params.id,
    {
      meetLink:req.body.meetLink,
      status:"meet scheduled"
    },
    {returnDocument:"after"}
  );

  res.json(data);
});

module.exports = router;