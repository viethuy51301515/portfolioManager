const express = require("express");
const router = express.Router();
const Skill = require("../../model/Skill");
const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    return res.json(skills);
  } catch (error) {
    return error.status(500).send("server errors");
  }
});

router.post(
  "/",
  [
    body("name", "not empty").not().isEmpty(),
    body("value", "not empty").not().isEmpty(),
  ],
  (req, res) => {
    try {
      console.log("123");
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(401).json({
          errors: err.array(),
        });
      }

      const skill = new Skill({
        name: req.body.name,
        value: req.body.value,
      });

      const re = skill.save();
      res.json(re);
    } catch (error) {
      return error.status(500).send("server errors");
    }
  }
);
router.put('/:id', async (req,res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if(portfolio){
      portfolio.description = req.body.description;
      portfolio.img = req.body.img;
      portfolio.link = req.body.link;
      portfolio.title = req.body.title;
      portfolio.type = req.body.type;
      await portfolio.save();


    }

    res.json(portfolio);
  } catch (error) {
    return error.status(500), send("server error");
  } 
});

router.delete('/:id', async(req,res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

  if(portfolio){
    await portfolio.remove();
    res.json({msg:"removed"});
  }
  } catch (error) {
    res.status(501).send("server error");
  }
  

})
module.exports = router;
