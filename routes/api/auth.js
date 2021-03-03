const express = require('express');
const {body,validationResult} = require('express-validator');
const User = require('../../model/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

router.get("/",auth,async   (req,res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json("server error");
    }

})

router.post('/',[
    body("email", "Email is required").isEmail().not().isEmpty(),
    body("password", "password is required").not().isEmpty(),
  ], (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; 

    try {
        const user = User.findOne({email});

        if(!user){
            return  res.status(400).json({errors:[{msg:'Invalid Credential'}]})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if( !isMatch){
            return res.status(400).json({errors:[{msg:"Invalid Credential"}]})
          }
  

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