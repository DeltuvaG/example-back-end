const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const PORT = process.env.PORT || 3001;

const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile = require('./controlers/profile');
const image = require('./controlers/image');

const db = knex({
	client: 'pg',
	connection: process.env.DATABASE_URL
});

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {res.send("it is working");})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} )

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )

app.get('/profile/:id', (req, res) => {profile.handeProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
})

