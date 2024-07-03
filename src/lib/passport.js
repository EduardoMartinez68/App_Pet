const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 

const database=require('../database');
const helpers=require('../lib/helpers.js');

const sendEmail = require('../lib/sendEmail.js'); //this is for send emails 


/*------------------login----------------*/
passport.use('local.login', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, async (req ,userName, password, done) => {
    const user=await search_user_for_email(userName);
    if(user.rows.length>0){
        //we will watch if the password is correct
        if (await helpers.matchPassword(password,user.rows[0].password)){
            done(null,user.rows[0],req.flash('success','Bienvenido '+user.rows[0].user_name+' ❤️'));
        }
        else{
            done(null,false,req.flash('message','tu contraseña es incorrecta 😳'));
        }
    }
    else{
        done(null,false,req.flash('message','Usuario Invalido 👁️'));
    }
}));

async function search_user_for_email(email){
    var queryText = 'SELECT * FROM "public".users WHERE email = $1';
    var values = [email] 
    return await database.query(queryText, values);
}

/*------------------singup----------------*/
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, userName, password, done) => {
    try {
        const {email,terms}=req.body;

        //we will see if the user accept the terms 
        if (terms !== 'on') {
            req.flash('message', 'Debes aceptar los términos y condiciones');
            return res.redirect('/links/singup');
        }
    
        //we will see if this email exist in the database
        if (await this_email_exists(email)) {
            return done(null, false, req.flash('message', 'Este email ya tiene una cuenta'));
        } else {
            //if this email not exist in the database, we will creating a new user 
            const newUser = await create_new_user(req);

            //we will watch if can save the user in the database 
            if (await save_new_user(newUser)) {
                req.flash('success', `Usuario registrado ❤️!`);
            } else {
                req.flash('message', 'Hubo un error y no se pudo guardar el usuario. Inténtelo de nuevo.');
            }
        }

        return done(null, newUser);
    } catch (error) {
        console.error(error);
        return done(null, false, req.flash('message', 'Hubo un error en el servidor. Inténtelo de nuevo más tarde.'));
    }
}));

async function create_new_user(req){
    var {username,email,password}=req.body; //get the data of the form 

    //delete the space in empty of the form for avoid a error in the login
    email = email.trim();
    const newUser={
        username,
        email,
        password: await helpers.encryptPassword(password)  //create a password encrypt
    }

    return newUser;
}

async function this_email_exists(email){
    var queryText = 'SELECT * FROM "public".users Where email = $1';
    var values = [email];
    var user=await database.query(queryText, values);
    return user.rows.length>0
}

async function save_new_user(user){
    try {
        var queryText = `
            INSERT INTO public.users (
                username, email, password, first_name
            ) VALUES ($1, $2, $3, $4)`;
        
        var values = [
            user.username, user.email, user.password, user.username 
        ];
        
        await database.query(queryText, values);
        return true;
    } catch (error) {
        console.error('Error adding a new user to the database:', error);
        return false;
    }
}
  







//this function not mov
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
    var queryText = 'SELECT * FROM "public".users Where id = $1';
    var values = [id];
    const obj = await database.query(queryText, values);

    done(null,obj.rows[0]);
});
