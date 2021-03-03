const express = require("express");
const router = express.Router();
const Achivement = require("../../model/Achivement");
const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const achivements = await Achivement.find();
    return res.json(achivements);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    body("date", "not empty").not().isEmpty(),
    body("des", "not empty").not().isEmpty(),
    body("img", "not empty").not().isEmpty(),
    body("link", "not empty").not().isEmpty(),
    body("name", "not empty").not().isEmpty(),
    body("title", "not empty").not().isEmpty(),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      const achivement = new Achivement({
        date: req.body.date,
        des: req.body.des,
        img: req.body.img,
        link: req.body.link,
        name: req.body.name,
        title: req.body.title,
      });
      achivement.save();
      return res.json(achivement);
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
);
router.put('/:id', async (req,res) => {
  try {
    const achivement = await Achivement.findById(req.params.id);
    if(achivement){
      achivement.date = req.body.date;
      achivement.des = req.body.des;
      achivement.img = req.body.img;
      achivement.link = req.body.link;
      achivement.name = req.body.name;
      achivement.title = req.body.title;
      await achivement.save();


    }

    res.json(portfolio);
  } catch (error) {
    return error.status(500), send("server error");
  } 
});

router.delete('/:id', async (req,res) => {
  try {
    const achivement = await Achivement.findById(req.params.id);

  if(achivement){
    await achivement.remove();
    res.json({msg:"removed"});
  }
  } catch (error) {
    res.status(501).send("server error");
  }
  

})
module.exports = router;
