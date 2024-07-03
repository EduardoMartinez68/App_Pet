const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 

const database=require('../database');
const helpers=require('../lib/helpers.js');


const express=require('express');
const router=express.Router();
const {isLoggedIn,isNotLoggedIn}=require('../lib/auth');

const rolFree=0

const fs = require('fs');
const path = require('path');

//config the connection with digitalocean
const AWS= require('aws-sdk'); 
const {APP_NYCE,APP_ACCESS_KEY_ID,SECRET_ACCESS_KEY}=process.env; //Get our nyce3 for connection with digitalocean
const spacesEndpoint=new AWS.Endpoint(APP_NYCE)

const s3=new AWS.S3({
    endpoint:spacesEndpoint,
    accessKeyId: APP_ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
});

const bucketName = APP_NYCE;

async function upload_image_to_space(filePath, objectName){
    const fileContent = fs.readFileSync(filePath);
  
    const params = {
      Bucket: bucketName,
      Key: objectName,
      Body: fileContent,
      ACL: 'public-read' // O 'private' si deseas que no sea público
    };
  
    try {
      const data = await s3.upload(params).promise();
      console.log('Image upload with success digitalocean:', data.Location);
      fs.unlinkSync(filePath); // delete file temporary
      return data.Location;
    } catch (err) {
      console.error('Error to upload the image to digitalocean:', err);
      return '';
    }
};

async function delete_image_upload(pathImg){
    const params = {
        Bucket: bucketName,
        Key: pathImg
      };
    
      try {
        await s3.deleteObject(params).promise();
        console.log(`Image ${objectName} delete with success`);
        return true;
      } catch (err) {
        console.error('Error to delete the image:', err);
        return false;
    }
    /*
    var pathImage = path.join(__dirname, '../public/img/uploads', pathImg);
    fs.unlink(pathImage, (error) => {
        if (error) {
            console.error('Error to delate image:', error);
        } else {
            console.log('Image delate success');
        }
    });*/
}


/*
*--------------------------------------------------------------------------------user--------------------------------------------------------------------------------*
*/ 
async function save_new_user(user){
  try {
      var queryText = 'INSERT INTO "Fud".users (user_name, first_name,second_name,last_name, email, password, rol_user, id_packs_fud) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
      var values = [user.user_name,user.first_name,user.second_name,user.last_name,user.email,user.password,0,0] 
      await database.query(queryText, values);
      return true;
  } catch (error) {
      console.error('Error to add the a new user of the database:', error);
      return false;
  }
}





module.exports=router;