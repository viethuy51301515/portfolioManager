const express = require("express");
const router = express.Router();
const Experience = require("../../model/Experience");
const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    console.log(experiences);
    return res.json(experiences);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
router.post(
  "/",
  [
    body("company", "is not empty").not().isEmpty(),
    body("description", "is not empty").not().isEmpty(),
    body("position", "is not empty").not().isEmpty(),
    body("type", "is not empty").not().isEmpty(),
    body("year", "is not empty").not().isEmpty(),
  ],
  async (req, res) => {
    try {
        console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      const newExp = new Experience( {
        company: req.body.company,
        description: req.body.description,
        position: req.body.position,
        type: req.body.type,
        year: req.body.year,
      });

      const exp = newExp.save();
      res.json(exp);
    } catch (error) {
        res.status(500).send("server error")
    }
  }
);
router.put('/:id', async (req,res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if(experience){
      experience.company = req.body.company;
      experience.description = req.body.description;
      experience.position = req.body.position;
      experience.type = req.body.type;
      experience.year = req.body.year;
      await experience.save();


    }

    res.json(experience);
  } catch (error) {
    return error.status(500), send("server error");
  } 
});

router.delete('/:id', async (req,res) => {
  try {
    const experience = await Experience.findById(req.params.id);

  if(experience){
    await experience.remove();
    res.json({msg:"removed"});
  }
  } catch (error) {
    res.status(501).send("server error");
  }
  

})
module.exports = router;
