const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('express');
const ourParser = require('./routes/parser.js');
const fileUpload = require("express-fileupload");



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());
app.use('/api/parser', ourParser);

const PORT = process.env.port || 5000;



app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
})