const express=require('express');
const router=express.Router();
const passport=require('passport');
const {isLoggedIn,isNotLoggedIn}=require('../lib/auth');


//---------------------------------------------------------------------singup
router.get('/links/signup',isNotLoggedIn,(req,res)=>{
    res.render('links/web/singup');
});

router.post('/links/signup',passport.authenticate('local.signup',{
    successRedirect: '/links/home',
    failureRedirect: '/links/signup',
    failureFlash:true
}));

//---------------------------------------------------------------------login
router.get('/links/login',isNotLoggedIn,(req,res)=>{
    res.render('links/web/login');
});

router.post('/links/login',passport.authenticate('local.login',{
    successRedirect: '/links/home',
    failureRedirect: '/links/login',
    failureFlash:true
}));

//---------------------------------------------------------------------logout
router.get('/links/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) {
          console.error('Error al desautenticar:', err);
          return res.status(500).json({ message: 'Error al desautenticar' });
        }
        res.redirect('/links/login');
    })
});


module.exports=router;