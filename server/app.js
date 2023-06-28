const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
//dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
process.env.NODE_ENV !== 'production' && app.use(morgan('combined'));

app.use('/users', require('./routes/users'));
app.use('/images', require('./routes/images'));


app.use('*', (req, res) => res.status(404).send({error: 'not found'}));

module.exports = app;