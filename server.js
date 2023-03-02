const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
// DATABASE_URL='postgres://ggkcmcgpuyoumc:04030a1a8490aa9f03235740d1b95ce057cb10cdbdb15dd889162a8a198fce10@ec2-52-54-212-232.compute-1.amazonaws.com:5432/d44ph7k2q59adn'

const db=knex({
    client: 'pg',

    connection: {
      host : 'postgresql-sinuous-07294',
      user : 'larisaoltean',
      password:'',
      database : 'smart-app'
    }
    // connection: {
    //  connectionString: process.env.DATABASE_URL,
    //  ssl: true
    // }
  });
console.log(DATABASE_URL)
const app=express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res)=> { res.send('it is working') })
app.post('/signin', (req,res)=> {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res)=> {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)});
app.put('/image', (req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)});


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
  });
