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

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,"client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
})