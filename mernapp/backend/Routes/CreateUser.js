const express = require('express')

const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = "Createanewstring"
// Without validator
// router.post("/createUser", async(req, res)=>{
//     try{
//         // await User.create({
//         //     name: "pradeep",
//         //     location: "manikpur",
//         //     password: 'random',
//         //     email: 'pradeep@gmail.com'
//         // })

//         // console.log(req.body)
//         await User.create({
//             name: req.body.name,
//             location: req.body.location,
//             password: req.body.password,
//             email: req.body.email
//         })
//         res.json({success: true})
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false})
//     }
// })


// With validator


router.post("/createUser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        const result = validationResult(req);
        console.log("Printing result here: ", result)
        if (!result.isEmpty()) {
            //   return res.send(`Hello, ${req.body}!`);
            return res.status(400).json({ errors: result.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                password: secPassword,
                email: req.body.email
            }).then(res.json({ success: true }))

        }
        catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

router.post("/loginUser",
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),

    async (req, res) => {
        const result = validationResult(req);
        console.log("Printing result here: ", result)
        if (!result.isEmpty()) {
            //   return res.send(`Hello, ${req.body}!`);
            return res.status(400).json({ errors: result.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password , userData.password) //Gives either true or false
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });

            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken });

        }
        catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })


module.exports = router