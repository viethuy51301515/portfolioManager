const express = require('express');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../model/User');
const router = express.Router();

router.post('/', [
    body("email", "Email is required").isEmail().not().isEmpty(),
    body("password", "password have to be longer than 7").isLength(7),
  ] ,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  

    const {email,password} = req.body;
    try {

      let user = await User.findOne({email});

      if(user){
        res.status(400).json({errors:[{msg:'User already existed'}]})
      }

      const salt = await bcrypt.getSalt(10);
      

      user = new User({
        email
      })

      user.password = await bcrypt.hash(password,salt);

      await user.save();

      const payload = {
        user:{
          id:user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtToken'),
        {expiresIn:36000},
        (err,token) => {
          if(err) throw err;
          res.json({token})
        }
      )
    } catch (error) {
      console.log(error);
      res.status(500).send('server error')
    }
})