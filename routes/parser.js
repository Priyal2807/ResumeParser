const router = require('express').Router();
const fs = require('fs');
const pdfParse = require('pdf-parse');

router.post('/', (req, res) => {
    try {
        getPdf(req.files.file.data, req.body.skill);
        res.send({ message: "sucess" });
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

const getPdf = async (file,skill) => {
    
    try {
        let pdfExtract = await pdfParse(file);
        console.log(pdfExtract);
        let extract = pdfExtract.text;
        let words = extract.split(/[,.\n\s+\t+]/)
        console.log(words);
        let dict = {};
        words.forEach((word, i) => {
            dict[word] = i;
        });
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = router;