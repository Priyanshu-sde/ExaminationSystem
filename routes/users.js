import express from 'express';

const router = express.Router();

router.post('/signup', async (req,res) => {
    const {name,username,password} = req.body;
    await Users.create({
        name,
        email,
        password
    });
    res.json({message: "You are signed up"});
})

router.post('/signin', async (req,res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({email});
    if( user && user.password === password){
        const token = generateToken(user._id);
        res.json({
        message: 'You are signed in',token
        })
    }
    else{
        res.status(403).json({message:'incorrect credential'});
    }
});
 export default router;