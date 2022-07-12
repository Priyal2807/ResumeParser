const router = require('express').Router();
const fs = require('fs');
const pdfParse = require('pdf-parse');

router.post('/', (req, res) => {
    try {
        getPdf(req.files.file.data, req.body.skill);
        res.send({ message: "success" });
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
            dict[word.toLowerCase()] = i;
        });
        skill = skill.toLowerCase();
        let skills = skill.split(/\s+/);
        let score, count = 0;
        skills.forEach(sk => {
            if (dict.hasOwnProperty(sk)) {
                count += 1;
            }
        });
        score = count / skills.length;
        console.log(score*100 + '%');
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = router;