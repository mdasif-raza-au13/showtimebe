import express from 'express'
import User from '../models/Users.js'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()


//for registering
router.post('/register',[body('name','Should not be empty').notEmpty(), 
            body('email','Should be a proper email address').notEmpty().isEmail().trim().normalizeEmail().toLowerCase(),
            body('phone','Should be a valid 10 digit number').notEmpty().isLength({min: 10, max:10}).isNumeric().trim(),
            body('gender','Select any one').notEmpty(),
            body('password','Should be of minimum 6 characters long').notEmpty().isLength({min: 6})]
            ,async (req,res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }
            try {
                const data = await User.findOne({email:req.body.email})
                if(data) return res.send({
                    message:"Email already exist"
                })
                else{
                    const hashpassword = await bcrypt.hash(req.body.password,10);
                    if(req.body.password === req.body.confirmPassword){
                        const data = new User({
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone,
                            gender: req.body.gender,
                            password: hashpassword,
                            
                        })
                        const newData = await data.save()
                        res.send(newData)            
                    }else{res.send("password are different")}
                }} 
            catch(error){
                res.send({message: error.message})
            }
});


// for login
router.post('/login',async (req,res) => {
    try {
        const email = req.body.email
        let data = await User.findOne({email:email})
        if(!data) return res.send("Enter a valid email address")
        else{
            const isPassValid = await bcrypt.compare(req.body.password,data.password); 
            if(!isPassValid) return res.send("Enter the correct password")
            jwt.sign({id:data._id},process.env.SECRET,{expiresIn:6000}, (err,token) => {
                if(err) throw err;
                // res.cookie("jwt",token, {
                //     expires: new Date(Date.now() + 180000)
                // });
                // res.redirect('/')
                res.status(200).send({"token":token})
            })
        }        
    } catch (error){
        res.status(400).send(error.message) 
    }
});


// for localhost only
// router.get('/info',(req,res) => {
//     const token = req.headers['x-access-token'];
//     if(!token) res.send({auth: false, token: 'No token provided'});
//     jwt.verify(token,process.env.SECRET,(err,user) => {
//         if(err) res.send('error while fetching');
//         User.findById(user.id,(err,result) => {
//             if(err) throw err;
//             res.send(result);
//         })
//     })
// })


// for edit
// router.post('/edit',auth,async (req,res) => {
//     // let checkdata = await UserAdmin.findOne(req.body.email)
//     // if(checkdata) return res.render("useradmin/edit",{
//     //     message:"Email already exist",
//     //     email: req.body.email
//     // })
//     let data = await User.find({_id: req.cookies.id})
//     data[0].name=req.body.name
//     data[0].email=req.body.email
//     await data[0].save();
//     return res.redirect('/user/profile')
// });


// router.get('/edit',auth,async (req,res) => {
//     console.log(req.cookies);
//     let data = await User.findById(req.cookies.id)
//     console.log(data)
//     res.render('useradmin/edit.ejs', {
//         userDetail : data
//         // message: ""
//     });
// });

// router.get('/profile',auth,async (req,res) => {
//     console.log(req.cookies);
//     let data = await User.findById(req.cookies.id)
//     console.log(data)
//     res.render('useradmin/profile.ejs', {
//         userDetail : data
//     });
// });


router.get('/details', async (req,res) => {
    let data = await User.find({});
    // console.log(data)
    res.send(data)
});


// router.get('/logout', auth, async (req,res) =>{
//     try {
//         res.clearCookie("jwt");
//         console.log('logout succesfully')
//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//     }
// });


export default router
